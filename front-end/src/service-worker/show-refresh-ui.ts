import * as template from "./show-refresh-ui.handlebars";

export default (worker: ServiceWorker) => {
  const ui = document.getElementById("insert-new-app-available-ui");

  if (ui) {
    ui.innerHTML = template();
  }

  const container = document.getElementById("new-app-available-container");

  if (container) {
    container.addEventListener(
      "click",
      () => {
        worker.postMessage({ action: "skipWaiting" });
        window.location.reload(true);
      },
      {
        once: true
      }
    );
  }
};
