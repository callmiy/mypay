import * as moment from "moment";

export const capitalize = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const docReady = (fn: () => void) =>
  document.addEventListener("DOMContentLoaded", fn);

export const isServerRendered = () =>
  !!document.querySelector('[name="3snsaaPmwVPzy6mFtib"]');

export const sortByDateTime = () => {
  return moment("1921-12-18T04:31:15.600000");
};
