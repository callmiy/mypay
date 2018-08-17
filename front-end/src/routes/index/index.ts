import { getDb } from "../../database";
import { docReady } from "../../app";
import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";
import * as shiftEarningSummaryTemplate from "../../templates/shiftEarningSummaryTemplate.handlebars";
import { GetAllShifts_shifts } from "../../graphql/gen.types";
import * as moment from "moment";

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

  constructor() {
    if (
      // we already server-rendered if 'earnings-summary__label' is on page
      !document.getElementById("earnings-summary__label") &&
      this.shiftsDetailsEl &&
      this.shiftEarningsSummaryEl
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
          typename__: { $eq: "Shift" }
        }
      })
      // tslint:disable-next-line:no-any
      .then(({ docs: shifts }: any) => {
        this.renderShiftsHTML(shifts);
      });
  };

  renderShiftsHTML = (shifts: GetAllShifts_shifts[]) => {
    this.shiftsDetailsEl.innerHTML = shiftDetailTemplate({ shifts });

    const currentMonthYear = moment(new Date()).format("MMM/YYYY");

    if (this.menuTitleEl) {
      this.menuTitleEl.textContent = currentMonthYear;
    }

    this.shiftEarningsSummaryEl.innerHTML = shiftEarningSummaryTemplate({
      totalEarnings: shifts.reduce((a, b) => a + +b.totalPay, 0),
      currentMonthYear
    });
  };
}

docReady(() => new IndexController());
