import showRefreshUI from "./show-refresh-ui";

const updateReady = (worker: ServiceWorker | null) => {
  if (!worker) {
    return;
  }

  showRefreshUI(worker);
};

export const registerServiceWorker = async () => {
  // || process.env.NODE_ENV !== "development"
  if (!navigator.serviceWorker) {
    return;
  }

  navigator.serviceWorker
    .register("/offline/service-worker1.js", {
      scope: "/"
    })
    .then(reg => {
      // Page is not been controlled by service worker = user is getting
      // contents from network, which is a good thing
      if (!navigator.serviceWorker.controller) {
        return;
      }

      // Service worker has been registered and is now waiting - tell user
      if (reg.waiting) {
        return updateReady(reg.waiting);
      }

      // Service worker is still installing, so we track it's progress and
      // when the installation succeeds, it means we have a service worker ready
      // to take over so we tell user
      if (reg.installing) {
        const worker = reg.installing;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed") {
            return updateReady(worker);
          }
        });
      }

      // okay page is been controlled by service worker
      // no service worker is waiting
      // no service worker is installing
      // this means a service worker will soon arrive. So we track it's motion
      reg.addEventListener("updatefound", () => {
        const worker1 = reg.installing;
        if (!worker1) {
          return;
        }
        worker1.addEventListener("statechange", () => {
          if (worker1.state === "installed") {
            return updateReady(worker1);
          }
        });
      });
    });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // window.location.reload()
    // tslint:disable-next-line:no-console
    // console.log("\n\n\n\ncontroller changed. Page is now refreshed", "\n\n\n")
  });
};

export default registerServiceWorker;
