import { Socket } from "phoenix";
import { Channel } from "phoenix";

import AppInterface from "./app_interface";
import registerServiceWorker from "./register-service-worker";

declare global {
  interface Window {
    appInterface: AppInterface;
  }
}

const socket = new Socket("/socket", {});
socket.connect();
socket.onOpen(() => (window.appInterface.serverOnlineStatus = true));
socket.onError(() => (window.appInterface.serverOnlineStatus = false));

export const getSocket = () => {
  return socket;
};

export const channelJoin = (topic: string, channel: Channel) => {
  channel
    .join()
    .receive("ok", messages => {
      // tslint:disable-next-line:no-console
      console.log(`Joining topic: ${topic}`, messages);
    })
    .receive("error", ({ reason }) => {
      // tslint:disable-next-line:no-console
      console.log("failed join", reason);
    })
    .receive("timeout", () => {
      window.appInterface.serverOnlineStatus = false;
    });
};

export interface ChannelMessage {
  topic: string;
  // tslint:disable-next-line:no-any
  params?: any;
  // tslint:disable-next-line:no-any
  ok: (msg: any) => void;
  // tslint:disable-next-line:no-any
  error?: (reason: any) => void;
}

export const sendChannelMsg = (
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

export const docReady = (fn: () => void) =>
  document.addEventListener("DOMContentLoaded", fn);

const processSidebar = () => {
  const sidebarAction = (sidebar: HTMLElement) => {
    const containerEl = document.getElementById("app-container");
    const sidebarTriggerEl = document.getElementById("sidebar-trigger");

    if (containerEl && sidebarTriggerEl) {
      containerEl.addEventListener("click", evt => {
        evt.stopPropagation();
        sidebar.classList.remove("visible");
      });

      sidebarTriggerEl.addEventListener("click", evt => {
        evt.preventDefault();
        evt.stopPropagation();
        sidebar.classList[
          sidebar.classList.contains("visible") ? "remove" : "add"
        ]("visible");
      });
    }
  };

  const sidebarEl = document.getElementById("app-sidebar");

  if (sidebarEl) {
    sidebarAction(sidebarEl);
  }
};

docReady(processSidebar);

registerServiceWorker();
