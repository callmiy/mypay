import { getDb } from "../../database";
import { docReady } from "../../app";
import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";

const database = getDb();

class IndexController {
  constructor() {
    this.renderShifts();
  }

  renderShifts = () => {
    if (document.querySelector(".shift-detail-row")) {
      return;
    }

    const shiftsDetailsEl = document.getElementById(
      "index-route-shifts-details"
    );

    if (!shiftsDetailsEl) {
      return;
    }

    database.db
      .find({
        selector: {
          typename__: { $eq: "Shift" }
        }
      })
      .then(({ docs: shifts }) => {
        shiftsDetailsEl.innerHTML = shiftDetailTemplate({ shifts });
      });
  };
}

docReady(() => new IndexController());
