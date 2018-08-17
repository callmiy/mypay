import { getDb } from "../../database";
import { docReady } from "../../app";

const database = getDb();

class IndexController {
  constructor() {
    this.renderShifts();
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
      .then(shifts => {
        // tslint:disable-next-line:no-console
        console.log("\n\n\n\ndb info on shifts:\n", shifts, "\n\n\n\n");
      });
  };
}

docReady(() => new IndexController());
