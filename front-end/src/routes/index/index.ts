import * as moment from "moment";
import { AppSocket } from "../../socket";
import lodashGroupBy from "lodash-es/groupBy";

import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { SHIFT_TYPENAME } from "./../../constants";
import { InitialShiftFromDb } from "../../constants";
import { InitialUrlFromDb } from "../../constants";
import { Database } from "../../database";
import { docReady } from "../../utils/utils";
import { isServerRendered } from "../../utils/utils";
import { Emitter } from "../../emitter";
import { Topic } from "../../emitter";
import { getTodayAndLastSixMonths } from "../utils";

import shiftDetailRowTemplate from "../../templates/partials/shiftDetailRowTemplate.handlebars";

import shiftsForMonthTemplate from "../../templates/shiftsForMonthTemplate.handlebars";

interface ShiftFromDbMapped {
  shifts: InitialShiftFromDb[];
  summary: {
    totalEarnings: string;
    totalNormalHours: string;
  };
}

interface Props {
  database: Database;
  isServerRendered: () => boolean;
  socket: AppSocket;
  emitter: Emitter;
}

export class IndexController {
  shiftsEl: HTMLDivElement;
  shiftEarningsSummaryEl: HTMLDivElement;
  menuTitleEl: HTMLDivElement;
  newShiftLinkEl: HTMLLinkElement;
  shiftsFromDb: ShiftFromDbMapped[];
  todayAndLastSixMonths: {
    today: moment.Moment;
    monthEndToday: moment.Moment;
    startSixMonthsAgo: moment.Moment;
  };

  constructor(private props: Props) {
    this.todayAndLastSixMonths = getTodayAndLastSixMonths();
    this.render();
    this.props.emitter.listen(Topic.SHIFT_SYNCED_SUCCESS, {
      next: this.shiftDataSyncedCb
    });
  }

  shiftDataSyncedCb = (shifts: InitialShiftFromDb[]) => {
    if (!(shifts && shifts.forEach)) {
      return;
    }

    shifts.forEach(shift => {
      const shiftRowEl = document.getElementById(
        `shift-detail-row-${shift._id}`
      );

      if (!shiftRowEl) {
        return;
      }

      shiftRowEl.id = `shift-detail-row-${shift.id}`;
      shiftRowEl.setAttribute("data-value", JSON.stringify(shift));
      shiftRowEl.innerHTML = shiftDetailRowTemplate({ shift });
    });

    // const shiftsFromDOM = Array.from(
    //   document.querySelectorAll('[id^="shift-detail-row-"]')
    // ).map(s =>
    //   JSON.parse(s.getAttribute("data-value") || "{}")
    // ) as InitialShiftFromDb[];
  };

  render = async () => {
    this.renderShifts();
    this.renderNewShiftLinkEl();
    this.renderMenuTitleEl();
  };

  calculateTotalEarningsAndNormalHours = (shifts: InitialShiftFromDb[]) => {
    const acc = { totalEarnings: 0, totalNormalHours: 0 };

    const { totalEarnings, totalNormalHours } = shifts.reduce((acc1, b) => {
      let earnings = 0;
      let hours = 0;

      if (b && b.totalPay) {
        earnings = +b.totalPay;
        hours = +b.normalHours;

        if (isNaN(earnings)) {
          earnings = 0;
          hours = 0;
        }
      }

      return {
        totalEarnings: acc1.totalEarnings + earnings,
        totalNormalHours: acc1.totalNormalHours + hours
      };
    }, acc);

    return {
      totalEarnings: totalEarnings.toFixed(2),
      totalNormalHours: totalNormalHours.toFixed(2)
    };
  };

  renderShifts = async () => {
    this.shiftsEl = document.getElementById(
      "shifts-for-months"
    ) as HTMLDivElement;

    if (!this.shiftsEl) {
      return;
    }

    if (this.props.isServerRendered()) {
      return;
    }

    const shiftsData = await this.getAndSetShiftsFromDb();
    this.shiftsEl.innerHTML = shiftsForMonthTemplate({ shiftsData });
  };

  renderMenuTitleEl = () => {
    this.menuTitleEl = document.getElementById(
      "index-route-menu__title"
    ) as HTMLDivElement;

    if (!this.menuTitleEl) {
      return;
    }

    if (this.props.isServerRendered()) {
      return;
    }

    const { monthEndToday, startSixMonthsAgo } = this.todayAndLastSixMonths;

    this.menuTitleEl.textContent = `${startSixMonthsAgo.format(
      "MMM"
    )}-${monthEndToday.format("MMM/YYYY")}`;
  };

  renderNewShiftLinkEl = async () => {
    this.newShiftLinkEl = document.getElementById(
      "new-shift-trigger"
    ) as HTMLLinkElement;

    if (!this.newShiftLinkEl) {
      return;
    }

    if (this.props.isServerRendered()) {
      return;
    }

    const newShiftUrl = await this.props.database.db
      .find({
        selector: {
          $or: [
            {
              schemaType: { $eq: NEW_SHIFT_URL_TYPENAME }
            }
          ]
        }
      })
      .then(({ docs }: { docs: InitialUrlFromDb[] }) => docs[0]);

    this.newShiftLinkEl.href = newShiftUrl ? newShiftUrl.url : "";
  };

  getAndSetShiftsFromDb = async () => {
    const { monthEndToday, startSixMonthsAgo } = this.todayAndLastSixMonths;

    return this.shiftsFromDb
      ? this.shiftsFromDb
      : (this.shiftsFromDb = await this.props.database.db
          .find({
            selector: {
              schemaType: { $eq: SHIFT_TYPENAME },
              $and: [
                {
                  date: {
                    $gte: startSixMonthsAgo.format(moment.HTML5_FMT.DATE)
                  }
                },
                { date: { $lte: monthEndToday.format(moment.HTML5_FMT.DATE) } }
              ]
            }
          })
          .then(({ docs }: { docs: InitialShiftFromDb[] }) => {
            const docs1 = Object.entries(
              lodashGroupBy(docs, doc => doc.date.slice(0, 8) + "01")
            )
              .sort((a, b) => {
                const aa = a[0];
                const bb = b[0];

                return bb > aa ? 1 : -1;
              })
              .map(a => {
                const shifts = a[1];
                const summary = {
                  date: moment(a[0]).format("MMM/YYYY"),
                  ...this.calculateTotalEarningsAndNormalHours(shifts)
                };
                return { shifts, summary };
              });

            return docs1;
          }));
  };
}

export default IndexController;

docReady(
  () =>
    new IndexController({
      database: window.appInterface.db,
      socket: window.appInterface.socket,
      emitter: window.appInterface.emitter,
      isServerRendered
    })
);
