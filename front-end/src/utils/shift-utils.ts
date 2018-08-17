import { getSocket } from "../app";
import { ChannelMessage } from "../socket";

export enum Topic {
  CREATE = "create"
}

const socket = getSocket();
const channelName = "shift:shift";
const channel = socket.socket.channel(channelName, {});
socket.channelJoin(channelName, channel);

export const sendChannelMsg = (msg: ChannelMessage) =>
  socket.sendChannelMsg(channelName, channel, msg);
