import * as moment from "moment";

/**
 * Format an ISO time as e.g. 8:30 PM
 */
export default (time: string) => {
  const parsedTime = moment(time, moment.HTML5_FMT.TIME_SECONDS);
  return parsedTime.format("HH:mm A");
};
