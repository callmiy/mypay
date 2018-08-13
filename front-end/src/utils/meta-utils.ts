import { getSocket } from "../app";
import { channelJoin } from "../app";
import { ChannelMessage } from "../app";
import { sendChannelMsg as sendMsg } from "../app";

export enum Topic {
  NEW_FORM = "new-form",
  CREATE = "create"
}

const socket = getSocket();
const channelName = "meta:meta";
const channel = socket.channel(channelName, {});
channelJoin(channelName, channel);

channel.on(Topic.NEW_FORM, msg => {
  // tslint:disable-next-line:no-console
  console.log("Got message", msg);
});

export const sendChannelMsg = (msg: ChannelMessage) =>
  sendMsg(channelName, channel, msg);
