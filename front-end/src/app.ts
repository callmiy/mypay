import AppInterface from "./app_interface";
import { Socket } from "phoenix";

declare global {
  interface Window {
    appInterface: AppInterface;
  }
}

const socket = new Socket("/socket", {});
socket.connect();

export const getSocket = () => {
  return socket;
};

// tslint:disable-next-line:only-arrow-functions
(function() {
  const sidebarAction = (sidebar: HTMLElement) => {
    const containerEl = document.getElementById("app-container");
    const sidebarTriggerEl = document.getElementById("sidebar-trigger");

    if (containerEl && sidebarTriggerEl) {
      containerEl.addEventListener(
        "click",
        evt => {
          evt.stopPropagation();
          sidebar.classList.remove("visible");
        },
        false
      );

      containerEl.addEventListener(
        "touchstart",
        evt => {
          evt.stopPropagation();
          sidebar.classList.remove("visible");
        },
        false
      );

      sidebarTriggerEl.addEventListener(
        "click",
        evt => {
          evt.preventDefault();
          evt.stopPropagation();
          sidebar.classList[
            sidebar.classList.contains("visible") ? "remove" : "add"
          ]("visible");
        },
        false
      );
    }
  };

  const sidebarEl = document.getElementById("app-sidebar");

  if (sidebarEl) {
    sidebarAction(sidebarEl);
  }
})();
