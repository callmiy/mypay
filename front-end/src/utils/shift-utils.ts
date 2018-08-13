import { getSocket } from "../app";
import { channelJoin } from "../app";
import { ChannelMessage } from "../app";
import { sendChannelMsg as sendMsg } from "../app";

export enum Topic {
  CREATE = "create"
}

const socket = getSocket();
const channelName = "shift:shift";
const channel = socket.channel(channelName, {});
channelJoin(channelName, channel);

export const sendChannelMsg = (msg: ChannelMessage) =>
  sendMsg(channelName, channel, msg);
