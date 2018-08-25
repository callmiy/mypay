import { Socket } from "phoenix";
import { Channel } from "phoenix";
import loGroupBy from "lodash-es/groupBy";

import { toRunnableDocument } from "./graphql/helpers";
import INITIAL_DATA_GQL from "./graphql/initial-socket-data.query";
import { GetInitialSocketDataVariables } from "./graphql/gen.types";
import { GetInitialSocketData } from "./graphql/gen.types";
import CREATE_SHIFT_GQL from "./graphql/create-shift.mutation";
import CREATE_META_GQL from "./graphql/create-meta.mutation";
import { GetInitialSocketData_offlineToken } from "./graphql/gen.types";
import { CreateShiftInput } from "./graphql/gen.types";
import { CreateMetaInput } from "./graphql/gen.types";
import { OFFLINE_TOKEN_TYPENAME, OFFLINE_ID_KEY } from "./constants";
import { DATA_CHANNEL_TOPIC_GRAPHQL } from "./constants";
import { DB_INDEX_OFFLINE_INSERT_TYPENAME } from "./constants";
import { OFFLINE_INSERT_TYPENAME } from "./constants";
import { OfflineDataFromDb } from "./constants";
import { DATA_SYNC_IDS_KEY } from "./constants";
import { DATA_SYNC_IDS } from "./constants";
import { DB_INDEX_SCHEMA_TYPE_NAME } from "./constants";
import { SHIFT_TYPENAME } from "./constants";
import { META_TYPENAME } from "./constants";
import { getShiftsQueryVairable } from "./routes/utils";
import { Database } from "./database";
import { Emitter } from "./emitter";
import { Topic } from "./emitter";

import { writeInitialDataToDb as writeInitialIndexDataToDb } from "./routes/utils";

const createMetaVariables: Array<keyof CreateMetaInput> = [
  "breakTimeSecs",
  "nightSupplPayPct",
  "payPerHr",
  "sundaySupplPayPct"
];

// tslint:disable-next-line:no-any
type OnChannelMessage = (msg: any) => void;

interface ChannelMessageNoTopic {
  // tslint:disable-next-line:no-any
  params?: any;
  ok: OnChannelMessage;
  // tslint:disable-next-line:no-any
  error?: (reason?: any) => void;

  // tslint:disable-next-line:no-any
  onTimeout?: (reason: any) => void;
}

interface Props {
  database: Database;

  emitter: Emitter;
}

export interface ChannelMessage extends ChannelMessageNoTopic {
  topic: string;
}

export class AppSocket {
  socket: Socket;
  dataChannelName = "data:data";
  dataChannel: Channel;
  dataChannelJoined = false;

  constructor(private props: Props) {
    this.socket = new Socket("/socket", {
      params: { [DATA_SYNC_IDS_KEY]: DATA_SYNC_IDS }
    });

    this.socket.connect();

    this.socket.onOpen(() => {
      window.appInterface.socketConnected = true;
      this.props.emitter.emit(Topic.SOCKET_CONNECTED, true);
      this.joinDataChannel();
    });

    this.socket.onError(() => {
      window.appInterface.socketConnected = false;
      this.props.emitter.emit(Topic.SOCKET_CONNECTED, false);
    });
  }

  joinDataChannel = async () => {
    const params = await this.processOfflineDataFromDb();

    this.dataChannel = this.socket.channel(this.dataChannelName, params);
    this.channelJoin(this.dataChannel);
    this.dataChannel.on("data-synced", this.dataSyncedCb);
    this.getInitialData();
  };

  processOfflineDataFromDb = async () => {
    const docss = await this.props.database.db
      .find({
        selector: {
          [DB_INDEX_OFFLINE_INSERT_TYPENAME]: OFFLINE_INSERT_TYPENAME
        }
      })
      .then(({ docs }: { docs: OfflineDataFromDb }) => {
        return docs;
      });

    if (!docss.length) {
      return {};
    }

    const grouped = loGroupBy(docss, DB_INDEX_SCHEMA_TYPE_NAME);
    let metas = grouped[META_TYPENAME] || [];

    // tslint:disable-next-line:no-any
    const shifts = (grouped[SHIFT_TYPENAME] || []).map((s: any) => {
      const shiftMetaId = s.meta._id;

      metas.find((m, mIndex) => {
        // this means the meta was created offline. We will create the shift
        // and meta together
        if (m._id === shiftMetaId) {
          // We remove this meta from among metas to be created because it will
          // be created together with its shift
          metas.splice(mIndex, 1);
          delete s.metaId;
          s.meta = m;
          return true;
        }

        // This means the meta was not created offline so we delete it
        delete s.meta;
        return false;
      });

      const doc = toRunnableDocument(
        CREATE_SHIFT_GQL,
        this.getCreateShiftVariables(s)
      );

      return {
        ...doc,
        variables: { shift: doc.variables },
        offline_attrs: { rev: s._rev, [OFFLINE_ID_KEY]: s._id }
      };
    });

    metas = metas.map(m => {
      const doc = toRunnableDocument(
        CREATE_META_GQL,
        this.getCreateMetaVariables(m)
      );

      return {
        ...doc,
        variables: { meta: doc.variables },
        offline_attrs: { rev: m._rev, [OFFLINE_ID_KEY]: m._id }
      };
    });

    const payload = [...shifts, ...metas];
    return payload.length ? { payload } : {};
  };

  // tslint:disable-next-line:no-any
  dataSyncedCb = async (syncedData: any) => {
    // tslint:disable-next-line:no-any
    const toEmit = { metas: [], shifts: [] } as any;
    // tslint:disable-next-line:no-any
    const toSave = [] as any;

    // tslint:disable-next-line:no-any
    syncedData.synced.forEach((dataVal: any) => {
      const data = dataVal.data;
      const fields = dataVal.offline_fields;

      if (data) {
        let newData = data.meta || data.shift;
        newData = {
          ...newData,
          _id: fields[OFFLINE_ID_KEY],
          _rev: fields.rev
        };

        toSave.push(newData);

        if (data.meta) {
          toEmit.metas.push(newData);
        } else if (data.shift) {
          toEmit.shifts.push(newData);
        }
      }
    });

    if (toSave.length) {
      await this.props.database.db.bulkDocs(toSave);
    }

    if (toEmit.shifts) {
      this.props.emitter.emit(Topic.SHIFT_SYNCED_SUCCESS, toEmit.shifts);
    }
  };

  getInitialData = async () => {
    const variables = getShiftsQueryVairable();

    const initialDataQuery = toRunnableDocument<GetInitialSocketDataVariables>(
      INITIAL_DATA_GQL,
      variables
    );

    this.queryGraphQl({
      ok: this.writeInitialDataToDb,
      params: initialDataQuery
    });
  };

  channelJoin = (
    channel: Channel,
    params?: { ok: OnChannelMessage },
    _channelName?: string
  ) => {
    if (!channel) {
      return;
    }

    channel
      .join()
      .receive("ok", messages => {
        if (params && params.ok) {
          params.ok(messages);
        }
      })
      .receive("error", _reason => {
        // tslint:disable-next-line:no-console
        // console.log("failed to join", reason);
      })
      .receive("timeout", () => {
        // window.appInterface.serverOnlineStatus = false;
      });
  };

  sendChannelMsg = (
    channel: Channel,
    { topic, ok, error, params, onTimeout }: ChannelMessage,
    _channelName?: string
  ) => {
    if (!channel) {
      return;
    }

    channel
      .push(topic, params || {})
      .receive("ok", ok)
      .receive("error", reasons => {
        if (error) {
          error(reasons);
        }
      })
      .receive("timeout", reasons => {
        if (onTimeout) {
          onTimeout(reasons);
        }
      });
  };

  writeInitialDataToDb = (data: GetInitialSocketData) => {
    window.appInterface.initialData = data;
    writeInitialIndexDataToDb(this.props.database, data);

    this.props.database.db
      .find({
        selector: {
          schemaType: { $eq: OFFLINE_TOKEN_TYPENAME }
        }
      }) // tslint:disable-next-line:no-any
      .then(({ docs }: { docs: any }) => {
        const offlineToken = data.offlineToken as GetInitialSocketData_offlineToken;

        if (!offlineToken) {
          return;
        }

        const offlineTokens = docs as GetInitialSocketData_offlineToken[];

        // this is our first insert = happy
        if (!offlineTokens.length) {
          this.props.database.db.put(offlineToken);
          return;
        }

        const offlineTokenFromDoc = offlineTokens[0];

        // we only care about the id and value fields.
        // If we got one with these values, we bail
        if (
          offlineTokenFromDoc.id === offlineToken.id &&
          offlineTokenFromDoc.value === offlineToken.value
        ) {
          return;
        }

        // ok we have a new token - update existing doc so we
        // only have 1 copy
        this.props.database.db.get(offlineTokenFromDoc._id).then(doc => {
          return this.props.database.db.put({
            ...offlineToken,
            _id: doc._id,
            _rev: doc._rev
          });
        });
      });
  };

  queryGraphQl = (params: ChannelMessageNoTopic) =>
    this.sendChannelMsg(this.dataChannel, {
      topic: DATA_CHANNEL_TOPIC_GRAPHQL,

      ...params
    });

  getCreateShiftVariables = (shift: CreateShiftInput) => {
    const variables = ["startTime", "endTime", "date", "metaId"].reduce(
      (acc, k: keyof CreateShiftInput) => ({ ...acc, [k]: shift[k] }),
      {}
      // tslint:disable-next-line:no-any
    ) as any;

    if (shift.meta) {
      delete variables.metaId;
      variables.meta = this.getCreateMetaVariables(shift.meta);
    }

    return variables;
  };

  getCreateMetaVariables = (meta: CreateMetaInput) => {
    return createMetaVariables.reduce(
      (acc, k) => ({ ...acc, [k]: meta[k] }),
      {}
    );
  };
}
export default AppSocket;
