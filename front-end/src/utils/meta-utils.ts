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

export const getChannel = () => {
  return channel;
};
