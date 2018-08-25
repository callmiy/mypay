import { Socket } from "phoenix";
import { Channel } from "phoenix";

import { toRunableDocument } from "./graphql/helpers";
import INITIAL_DATA_GQL from "./graphql/initial-socket-data.query";
import { GetInitialSocketDataVariables } from "./graphql/gen.types";
import { GetInitialSocketData } from "./graphql/gen.types";
import { GetInitialSocketData_offlineToken } from "./graphql/gen.types";
import CREATE_SHIFT_GQL from "./graphql/create-shift.mutation";
import { OFFLINE_TOKEN_TYPENAME, OFFLINE_ID_KEY } from "./constants";
import { DATA_CHANNEL_TOPIC_GRAPHQL } from "./constants";
import { DB_INDEX_OFFLINE_INSERT_TYPENAME } from "./constants";
import { OFFLINE_INSERT_TYPENAME } from "./constants";
import { OfflineDataFromDb } from "./constants";
import { DATA_SYNC_IDS_KEY } from "./constants";
import { DATA_SYNC_IDS } from "./constants";
import { getShiftsQueryVairable } from "./routes/utils";
import { shiftFromOffline } from "./routes/utils";
import { Database } from "./database";
import { Emitter } from "./emitter";
import { Topic } from "./emitter";

import { writeInitialDataToDb as writeInitialIndexDataToDb } from "./routes/utils";

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
      window.appInterface.serverOnlineStatus = true;
    });
    this.socket.onError(() => (window.appInterface.serverOnlineStatus = false));
    this.joinDataChannel();
  }

  joinDataChannel = async () => {
    const params = await this.props.database.db
      .find({
        selector: {
          [DB_INDEX_OFFLINE_INSERT_TYPENAME]: OFFLINE_INSERT_TYPENAME
        }
      })
      .then(({ docs }: { docs: OfflineDataFromDb }) => {
        if (!docs.length) {
          return {};
        }

        return toRunableDocument(CREATE_SHIFT_GQL, {
          shift: shiftFromOffline(docs[0])
        });
      });

    this.dataChannel = this.socket.channel(this.dataChannelName, params);
    this.channelJoin(this.dataChannel);

    this.dataChannel.on("data-synced", this.dataSyncedCb);

    this.getInitialData();
  };

  // tslint:disable-next-line:no-any
  dataSyncedCb = async (msg: any) => {
    const fields = msg.offline_fields;

    if (msg.errors) {
      // const data = await this.props.database.db.find({
      //   selector: {
      //     _id: {
      //       $eq: fields[OFFLINE_ID_KEY]
      //     },
      //     [DB_INDEX_OFFLINE_INSERT_TYPENAME]: {
      //       $eq: OFFLINE_INSERT_TYPENAME
      //     }
      //   }
      // });
      // this.props.emitter.emit(Topic.SHIFT_SYNCED_ERROR, msg.errors);
    }

    if (msg.data) {
      const newData = {
        ...msg.data.shift,
        _id: fields[OFFLINE_ID_KEY],
        _rev: fields.rev
      };
      await this.props.database.db.put(newData);
      this.props.emitter.emit(Topic.SHIFT_SYNCED_SUCCESS, newData);
    }
  };

  getInitialData = async () => {
    const variables = getShiftsQueryVairable();

    const initialDataQuery = toRunableDocument<GetInitialSocketDataVariables>(
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
    channel
      .join()
      .receive("ok", messages => {
        if (params && params.ok) {
          params.ok(messages);
        }
      })
      .receive("error", ({ reason }) => {
        // tslint:disable-next-line:no-console
        console.log("failed join", reason);
      })
      .receive("timeout", () => {
        window.appInterface.serverOnlineStatus = false;
      });
  };

  sendChannelMsg = (
    channel: Channel,
    { topic, ok, error, params, onTimeout }: ChannelMessage,
    _channelName?: string
  ) => {
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
}
export default AppSocket;
