import { Socket } from "phoenix";
import { Channel } from "phoenix";
import { toRunableDocument } from "./graphql/helpers";
import INITIAL_DATA_GQL from "./graphql/initial-socket-data.query";
import { GetInitialSocketDataVariables } from "./graphql/gen.types";
import { SortingDirective } from "./graphql/gen.types";
import { GetInitialSocketData } from "./graphql/gen.types";
import { GetInitialSocketData_shifts } from "./graphql/gen.types";
import { GetInitialSocketData_newShiftUrl } from "./graphql/gen.types";
import { GetInitialSocketData_offlineToken } from "./graphql/gen.types";
import { getDb } from "./database";
import { NEW_SHIFT_URL_TYPENAME } from "./constants";
import { SHIFT_TYPENAME } from "./constants";
import { OFFLINE_TOKEN_TYPENAME } from "./constants";

const database = getDb();

// tslint:disable-next-line:no-any
type OnChannelMessage = (msg: any) => void;

export interface ChannelMessage {
  topic: string;
  // tslint:disable-next-line:no-any
  params?: any;

  ok: OnChannelMessage;
  // tslint:disable-next-line:no-any
  error?: (reason: any) => void;
}

export class AppSocket {
  socket: Socket;
  dataChannelName = "data:data";
  dataChannel: Channel;
  dataChannelJoined = false;

  constructor() {
    this.socket = new Socket("/socket", {});
    this.socket.connect();
    this.socket.onOpen(() => {
      window.appInterface.serverOnlineStatus = true;
    });
    this.socket.onError(() => (window.appInterface.serverOnlineStatus = false));
    this.joinDataChannel();
    this.getInitialData();
  }

  joinDataChannel = () => {
    this.dataChannel = this.socket.channel(this.dataChannelName, {});
    this.channelJoin(this.dataChannelName, this.dataChannel);
  };

  getInitialData = () => {
    const today = new Date();
    const variables: GetInitialSocketDataVariables = {
      shift: {
        where: {
          year: today.getFullYear(),
          month: today.getMonth() + 1
        },

        orderBy: {
          date: SortingDirective.DESC
        }
      }
    };

    const initialDataQuery = toRunableDocument<GetInitialSocketDataVariables>(
      INITIAL_DATA_GQL,
      variables
    );

    this.sendChannelMsg(this.dataChannelName, this.dataChannel, {
      topic: "all-shifts",

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
    { topic, ok, error, params }: ChannelMessage
  ) => {
    channel
      .push(topic, params || {})
      .receive("ok", ok)
      .receive("error", reasons => {
        if (error) {
          error(reasons);
        } else {
          // tslint:disable-next-line:no-console
          console.log(`Error on push to ${channelName}:${topic}`, reasons);
        }
      })
      .receive("timeout", () => {
        // tslint:disable-next-line:no-console
        console.log("Networking issue...");
      });
  };

  writeInitialDataToDb = (data: GetInitialSocketData) => {
    const allShifts = (data.shifts || []) as GetInitialSocketData_shifts[];

    database.db
      .find({
        selector: {
          schemaType: { $eq: SHIFT_TYPENAME }
        }
      })
      // tslint:disable-next-line:no-any
      .then((foundShifts: { docs: any }) => {
        if (
          foundShifts.docs &&
          foundShifts.docs.map &&
          foundShifts.docs.length
        ) {
          const ids = foundShifts.docs.map((s: GetInitialSocketData_shifts) => {
            return s.id;
          });

          const filteredAllShifts = allShifts.filter(s => !ids.includes(s.id));

          if (filteredAllShifts.length) {
            database.db.bulkDocs(filteredAllShifts);
          }
        } else {
          database.db.bulkDocs(allShifts);
        }

        return true;
      });

    database.db
      .find({
        selector: {
          schemaType: { $eq: NEW_SHIFT_URL_TYPENAME }
        }
      })
      // tslint:disable-next-line:no-any
      .then(({ docs }: { docs: any }) => {
        const newShiftUrl = data.newShiftUrl as GetInitialSocketData_newShiftUrl;

        if (!newShiftUrl) {
          return;
        }

        const newShiftUrls = docs as GetInitialSocketData_newShiftUrl[];

        // this is our first insert = happy
        if (!newShiftUrls.length) {
          database.db.put(newShiftUrl);
          return;
        }

        const newShiftUrlFromDoc = newShiftUrls[0];

        // we only care about the URL. If one exists with similar url, bail
        if (newShiftUrlFromDoc.url === newShiftUrl.url) {
          return;
        }

        // ok we have a new URL - update existing doc so we only have 1 copy
        database.db.get(newShiftUrlFromDoc._id).then(doc => {
          return database.db.put({
            ...newShiftUrl,
            _id: newShiftUrlFromDoc._id,
            _rev: doc._rev
          });
        });
      });

    database.db
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
          database.db.put(offlineToken);
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
        database.db.get(offlineTokenFromDoc._id).then(doc => {
          return database.db.put({
            ...offlineToken,
            _id: doc._id,
            _rev: doc._rev
          });
        });
      });
  };
}
export default AppSocket;
