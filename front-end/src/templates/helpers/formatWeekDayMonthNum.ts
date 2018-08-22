import * as moment from "moment";

/**
 * Format an ISO date as e.g Tues, 21 i.e day of the week short name,
 * day of the month
 */
export default (date: string) => {
  const parsedDate = moment(date, moment.HTML5_FMT.DATE);
  return parsedDate.format("ddd, D");
};
