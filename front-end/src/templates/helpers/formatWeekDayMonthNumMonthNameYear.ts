import * as moment from "moment";

/**
 * Format an ISO date as e.g Tues, 21 Aug, 2018 i.e day of the week short name,
 * day of the month Month short name, 4 digit year
 */
export default (date: string) => {
  const parsedDate = moment(date, moment.HTML5_FMT.DATE);
  return parsedDate.format("ddd, D MMM, YYYY");
};
