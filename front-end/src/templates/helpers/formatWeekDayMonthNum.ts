import * as moment from "moment";

export default (date: string) => {
  const parsedDate = moment(date, moment.HTML5_FMT.DATE);
  return parsedDate.format("ddd, D");
};
