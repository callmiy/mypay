import * as moment from "moment";

import { getDb } from "../../database";
import { docReady } from "../../app";
import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";
import * as shiftEarningSummaryTemplate from "../../templates/shiftEarningSummaryTemplate.handlebars";
import { GetInitialSocketData_shifts } from "../../graphql/gen.types";
import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { SHIFT_TYPENAME } from "./../../constants";
import { GetInitialSocketData_newShiftUrl } from "../../graphql/gen.types";

interface DocQuery {
  shifts?: GetInitialSocketData_shifts[];
  url?: GetInitialSocketData_newShiftUrl;
}

const database = getDb();

class IndexController {
  shiftsDetailsEl = document.getElementById(
    "index-route-shifts-details"
  ) as HTMLDivElement;

  shiftEarningsSummaryEl = document.getElementById(
    "shift__earnings-summary"
  ) as HTMLDivElement;

  menuTitleEl = document.getElementById(
    "index-route-menu__title"
  ) as HTMLDivElement;

  newShiftLinkEl = document.getElementById(
    "new-shift-trigger"
  ) as HTMLLinkElement;

  constructor() {
    if (
      // we already server-rendered if 'earnings-summary__label' is on page
      !document.getElementById("earnings-summary__label") &&
      this.shiftsDetailsEl &&
      this.shiftEarningsSummaryEl &&
      this.newShiftLinkEl
    ) {
      this.renderShifts();
    }
  }

  renderShifts = () => {
    if (document.querySelector(".shift-detail-row")) {
      return;
    }

    database.db
      .find({
        selector: {
          $or: [
            {
              schemaType: { $eq: NEW_SHIFT_URL_TYPENAME }
            },

            {
              schemaType: { $eq: SHIFT_TYPENAME }
            }
          ]
        }
      })
      // tslint:disable-next-line:no-any
      .then(({ docs }: { docs: any[] }) => {
        const accumulator = {} as DocQuery;

        const doc = docs.reduce((acc, el) => {
          return el.schemaType === SHIFT_TYPENAME
            ? {
                ...acc,
                shifts: [...(acc.shifts || []), el]
              }
            : { ...acc, url: el };
        }, accumulator);

        this.renderShiftsHTML(doc);
      });
  };

  renderShiftsHTML = (data: DocQuery) => {
    const shifts = data.shifts || [];
    const url = (data.url || {}) as GetInitialSocketData_newShiftUrl;
    this.shiftsDetailsEl.innerHTML = shiftDetailTemplate({ shifts });

    const currentMonthYear = moment(new Date()).format("MMM/YYYY");

    if (this.menuTitleEl) {
      this.menuTitleEl.textContent = currentMonthYear;
    }

    this.shiftEarningsSummaryEl.innerHTML = shiftEarningSummaryTemplate({
      totalEarnings: shifts.reduce((a, b) => a + +b.totalPay, 0),
      currentMonthYear
    });

    this.newShiftLinkEl.href = url.url || "";
  };
}

docReady(() => new IndexController());
