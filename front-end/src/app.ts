import { AppSocket } from "./socket";
import AppInterface from "./app_interface";
import registerServiceWorker1 from "./service-worker/register-service-worker1";

declare global {
  interface Window {
    appInterface: AppInterface;
  }
}

const socket = new AppSocket();

export const getSocket = () => socket;

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
registerServiceWorker1();
