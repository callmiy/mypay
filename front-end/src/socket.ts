import { Socket } from "phoenix";
import { Channel } from "phoenix";
import { toRunableDocument } from "./graphql/helpers";
import SHIFTS_GQL from "./graphql/shifts.query";
import { GetAllShiftsVariables } from "./graphql/gen.types";
import { SortingDirective } from "./graphql/gen.types";
import { GetAllShifts } from "./graphql/gen.types";
import { GetAllShifts_shifts } from "./graphql/gen.types";
import { getDb } from "./database";

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
    this.getAllShiftsForMonth();
  }

  joinDataChannel = () => {
    this.dataChannel = this.socket.channel(this.dataChannelName, {});
    this.channelJoin(this.dataChannelName, this.dataChannel);
  };

  getAllShiftsForMonth = () => {
    const today = new Date();
    const variables: GetAllShiftsVariables = {
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

    const shiftQuery = toRunableDocument<GetAllShiftsVariables>(
      SHIFTS_GQL,
      variables
    );

    this.sendChannelMsg(this.dataChannelName, this.dataChannel, {
      topic: "all-shifts",

      ok: ({ shifts }: GetAllShifts) => {
        const allShifts = (shifts || []) as GetAllShifts_shifts[];

        database.db
          .find({
            selector: {
              typename__: { $eq: "Shift" }
            }
          })
          // tslint:disable-next-line:no-any
          .then((foundShifts: { docs: any }) => {
            if (
              foundShifts.docs &&
              foundShifts.docs.map &&
              foundShifts.docs.length
            ) {
              const ids = foundShifts.docs.map((s: GetAllShifts_shifts) => {
                return s.id;
              });

              const filteredAllShifts = allShifts.filter(
                s => !ids.includes(s.id)
              );

              if (filteredAllShifts.length) {
                database.db.bulkDocs(filteredAllShifts);
              }
            } else {
              database.db.bulkDocs(allShifts);
            }
          });
      },
      params: shiftQuery
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
}
export default AppSocket;
