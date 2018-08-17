import { getSocket } from "../app";
import { ChannelMessage } from "../socket";

export enum Topic {
  NEW_FORM = "new-form",
  CREATE = "create"
}

const socket = getSocket();
const channelName = "meta:meta";
const channel = socket.socket.channel(channelName, {});
socket.channelJoin(channelName, channel);

channel.on(Topic.NEW_FORM, msg => {
  // tslint:disable-next-line:no-console
  console.log("Got message", msg);
});

export const sendChannelMsg = (msg: ChannelMessage) =>
  socket.sendChannelMsg(channelName, channel, msg);
