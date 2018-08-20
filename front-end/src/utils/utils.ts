export const capitalize = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const docReady = (fn: () => void) =>
  document.addEventListener("DOMContentLoaded", fn);

export const isServerRendered = () =>
  !!document.querySelector('[name="3snsaaPmwVPzy6mFtib"]');
