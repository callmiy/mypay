import * as moment from "moment";

import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";
import * as shiftEarningSummaryTemplate from "../../templates/shiftEarningSummaryTemplate.handlebars";
import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { SHIFT_TYPENAME } from "./../../constants";
import { GetInitialSocketData_newShiftUrl } from "../../graphql/gen.types";
import { GetInitialSocketData } from "../../graphql/gen.types";
import { Database } from "../../database";
import { docReady } from "../../utils/utils";
import { isServerRendered as serverRendered } from "../../utils/utils";

export class IndexController {
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

  constructor(
    private database: Database,
    private isServerRendered: () => boolean
  ) {
    this.renderShifts();
  }

  renderShifts = async () => {
    let data = window.appInterface.initialData;

    if (!data) {
      data = this.parseQuery(await this.getInitialDataLocal());
    }

    this.renderShiftsHTML(data);
  };

  renderShiftsHTML = (data: GetInitialSocketData | null) => {
    if (
      !(
        data &&
        this.shiftsDetailsEl &&
        this.shiftEarningsSummaryEl &&
        this.newShiftLinkEl
      )
    ) {
      return;
    }

    if (this.isServerRendered()) {
      return;
    }

    const shifts = data.shifts || [];
    const url = (data.newShiftUrl || {}) as GetInitialSocketData_newShiftUrl;
    this.shiftsDetailsEl.innerHTML = shiftDetailTemplate({ shifts });

    const currentMonthYear = moment(new Date()).format("MMM/YYYY");

    if (this.menuTitleEl) {
      this.menuTitleEl.textContent = currentMonthYear;
    }

    this.shiftEarningsSummaryEl.innerHTML = shiftEarningSummaryTemplate({
      totalEarnings: shifts
        .reduce((a, b) => a + +((b && b.totalPay) || 0), 0)
        .toFixed(2),
      currentMonthYear
    });

    this.newShiftLinkEl.href = url.url || "";
  };

  // tslint:disable-next-line:no-any
  parseQuery = (docs: any[]) => {
    const accumulator = {} as GetInitialSocketData;

    return docs.reduce((acc, el) => {
      switch (el.schemaType) {
        case SHIFT_TYPENAME:
          return {
            ...acc,
            shifts: [...(acc.shifts || []), el]
          };

        case NEW_SHIFT_URL_TYPENAME:
          return { ...acc, newShiftUrl: el };

        default:
          return acc;
      }
    }, accumulator);
  };

  getInitialDataLocal = async () => {
    const { docs } = (await this.database.db.find({
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
      // tslint:disable-next-line:no-any
    })) as { docs: any[] };

    return docs;
  };
}

export default IndexController;

docReady(() => new IndexController(window.appInterface.db, serverRendered));
