export const registerServiceWorker = async () => {
  if (!navigator.serviceWorker || process.env.NODE_ENV !== "development") {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker1.js"
    );

    // tslint:disable-next-line:no-console
    console.log("registration", registration);
  } catch {
    // tslint:disable-next-line:no-console
    console.log("registration failed");
  }
};

export default registerServiceWorker;
