import { AppSocket } from "./socket";
import registerServiceWorker1 from "./service-worker/register-service-worker1";
import { Database } from "./database";
import { docReady } from "./utils/utils";
import { GetInitialSocketData } from "./graphql/gen.types";

declare global {
  interface Window {
    appInterface: {
      newMetaFormData?: {
        html: string;
      };
      serverOnlineStatus: boolean;

      db: Database;

      socket: AppSocket;

      initialData: GetInitialSocketData | null;
    };
  }
}

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

(function App() {
  const db = new Database();
  const socket = new AppSocket(db);

  window.appInterface.db = db;
  window.appInterface.socket = socket;
  docReady(processSidebar);
})();

registerServiceWorker1();
