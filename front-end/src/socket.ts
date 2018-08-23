import { Socket } from "phoenix";
import { Channel } from "phoenix";

import { toRunableDocument } from "./graphql/helpers";
import INITIAL_DATA_GQL from "./graphql/initial-socket-data.query";
import { GetInitialSocketDataVariables } from "./graphql/gen.types";
import { GetInitialSocketData } from "./graphql/gen.types";
import { GetInitialSocketData_offlineToken } from "./graphql/gen.types";
import { OFFLINE_TOKEN_TYPENAME } from "./constants";
import { DATA_CHANNEL_TOPIC_GRAPHQL } from "./constants";
import { getShiftsQueryVairable } from "./routes/utils";
import { writeInitialDataToDb as writeInitialIndexDataToDb } from "./routes/utils";
import { Database } from "./database";

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

export interface ChannelMessage extends ChannelMessageNoTopic {
  topic: string;
}

export class AppSocket {
  socket: Socket;
  dataChannelName = "data:data";
  dataChannel: Channel;
  dataChannelJoined = false;

  constructor(private database: Database) {
    this.socket = new Socket("/socket", {});
    this.socket.connect();
    this.socket.onOpen(() => {
      window.appInterface.serverOnlineStatus = true;
    });
    this.socket.onError(() => (window.appInterface.serverOnlineStatus = false));
    this.joinDataChannel();
  }

  joinDataChannel = () => {
    this.dataChannel = this.socket.channel(this.dataChannelName, {});
    this.channelJoin(this.dataChannelName, this.dataChannel);
    this.getInitialData();
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
    channelName: string,
    channel: Channel,
    params?: { ok: OnChannelMessage }
  ) => {
    channel
      .join()
      .receive("ok", messages => {
        // tslint:disable-next-line:no-console
        console.log(
          `\n\n\n\nJoining channel: ${channelName} at ${new Date().getTime()}`,
          messages
        );

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
    channelName: string,
    channel: Channel,
    { topic, ok, error, params, onTimeout }: ChannelMessage
  ) => {
    channel
      .push(topic, params || {})
      .receive("ok", ok)
      .receive("error", reasons => {
        if (error) {
          error(reasons);
        }
        // tslint:disable-next-line:no-console
        console.log(`Error on push to ${channelName}:${topic}`, reasons);
      })
      .receive("timeout", reasons => {
        if (onTimeout) {
          onTimeout(reasons);
        }

        // tslint:disable-next-line:no-console
        console.log("Networking issue...", reasons);
      });
  };

  writeInitialDataToDb = (data: GetInitialSocketData) => {
    window.appInterface.initialData = data;
    writeInitialIndexDataToDb(this.database, data);

    this.database.db
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
          this.database.db.put(offlineToken);
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
        this.database.db.get(offlineTokenFromDoc._id).then(doc => {
          return this.database.db.put({
            ...offlineToken,
            _id: doc._id,
            _rev: doc._rev
          });
        });
      });
  };

  queryGraphQl = (params: ChannelMessageNoTopic) =>
    this.sendChannelMsg(this.dataChannelName, this.dataChannel, {
      topic: DATA_CHANNEL_TOPIC_GRAPHQL,

      ...params
    });
}
export default AppSocket;
