import { getSocket } from "../app";

const socket = getSocket();
const channel = socket.channel("meta:meta", {});

channel.on("new-form", msg => {
  // tslint:disable-next-line:no-console
  console.log("Got message", msg);
});

channel
  .join()
  .receive("ok", messages => {
    // tslint:disable-next-line:no-console
    console.log("Joining topic: meta:meta", messages);
  })
  .receive("error", ({ reason }) => {
    // tslint:disable-next-line:no-console
    console.log("failed join", reason);
  })
  .receive("timeout", () => {
    // tslint:disable-next-line:no-console
    console.log("Networking issue. Still waiting...");
  });

interface Message {
  topic: string;
  // tslint:disable-next-line:no-any
  params?: any;
  // tslint:disable-next-line:no-any
  ok: (msg: any) => void;
  // tslint:disable-next-line:no-any
  error?: (reason: any) => void;
}

export const sendMsg = ({ topic, ok, error, params }: Message) => {
  channel
    .push(topic, params || {})
    .receive("ok", ok)
    .receive("error", reasons => {
      if (error) {
        error(reasons);
      } else {
        // tslint:disable-next-line:no-console
        console.log(`Error on push to meta:meta:${topic}`, reasons);
      }
    })
    .receive("timeout", () => {
      // tslint:disable-next-line:no-console
      console.log("Networking issue...");
    });
};
