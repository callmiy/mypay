import * as moment from "moment";

import { getDb } from "../../database";
import { docReady } from "../../app";
import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";
import * as shiftEarningSummaryTemplate from "../../templates/shiftEarningSummaryTemplate.handlebars";
import { GetInitialSocketData_shifts } from "../../graphql/gen.types";
import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { SHIFT_TYPENAME } from "./../../constants";
import { OFFLINE_TOKEN_TYPENAME } from "../../constants";
import { GetInitialSocketData_newShiftUrl } from "../../graphql/gen.types";
import { GetInitialSocketData_offlineToken } from "../../graphql/gen.types";

interface DocQuery {
  shifts?: GetInitialSocketData_shifts[];
  url?: GetInitialSocketData_newShiftUrl;
  token?: GetInitialSocketData_offlineToken;
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
            },

            {
              schemaType: { $eq: OFFLINE_TOKEN_TYPENAME }
            }
          ]
        }
      })
      // tslint:disable-next-line:no-any
      .then(({ docs }: { docs: any[] }) => {
        this.renderShiftsHTML(this.parseQuery(docs));
      });
  };

  renderShiftsHTML = (data: DocQuery) => {
    // Means we are have server rendered, so we bail
    if (data.token && !this.shouldRender(data.token)) {
      return;
    }

    const shifts = data.shifts || [];
    const url = (data.url || {}) as GetInitialSocketData_newShiftUrl;
    this.shiftsDetailsEl.innerHTML = shiftDetailTemplate({ shifts });

    const currentMonthYear = moment(new Date()).format("MMM/YYYY");

    if (this.menuTitleEl) {
      this.menuTitleEl.textContent = currentMonthYear;
    }

    this.shiftEarningsSummaryEl.innerHTML = shiftEarningSummaryTemplate({
      totalEarnings: shifts.reduce((a, b) => a + +b.totalPay, 0).toFixed(2),
      currentMonthYear
    });

    this.newShiftLinkEl.href = url.url || "";
  };

  // tslint:disable-next-line:no-any
  parseQuery = (docs: any[]) => {
    const accumulator = {} as DocQuery;

    return docs.reduce((acc, el) => {
      switch (el.schemaType) {
        case SHIFT_TYPENAME:
          return {
            ...acc,
            shifts: [...(acc.shifts || []), el]
          };

        case NEW_SHIFT_URL_TYPENAME:
          return { ...acc, url: el };

        case OFFLINE_TOKEN_TYPENAME:
          return { ...acc, token: el };

        default:
          return acc;
      }
    }, accumulator);
  };

  shouldRender = (token: GetInitialSocketData_offlineToken) => {
    const tokenEl = document.getElementById(token.id) as HTMLInputElement;

    if (tokenEl && tokenEl.value === token.value) {
      return false;
    }

    return true;
  };
}

docReady(() => new IndexController());
