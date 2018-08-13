import { getSocket } from "../app";
import { channelJoin } from "../app";
import { ChannelMessage } from "../app";
import { sendChannelMsg as sendMsg } from "../app";

export enum Topic {
  NEW_FORM = "new-form",
  CREATE = "create"
}

const socket = getSocket();
const channelTopic = "meta:meta";
const channel = socket.channel(channelTopic, {});
channelJoin(channelTopic, channel);

channel.on(Topic.NEW_FORM, msg => {
  // tslint:disable-next-line:no-console
  console.log("Got message", msg);
});

export const sendChannelMsg = (msg: ChannelMessage) => sendMsg(channel, msg);
