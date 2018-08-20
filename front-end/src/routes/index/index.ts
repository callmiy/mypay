import * as moment from "moment";

import { getDb } from "../../database";
import { docReady } from "../../app";
import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";
import * as shiftEarningSummaryTemplate from "../../templates/shiftEarningSummaryTemplate.handlebars";
import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { SHIFT_TYPENAME } from "./../../constants";
import { GetInitialSocketData_newShiftUrl } from "../../graphql/gen.types";
import INITIAL_DATA_GQL from "../../graphql/initial-socket-data.query";
import { GetInitialSocketDataVariables } from "../../graphql/gen.types";
import { toRunableDocument } from "../../graphql/helpers";
import { getSocket } from "../../app";
import { GetInitialSocketData } from "../../graphql/gen.types";
import { writeInitialDataToDb } from "./utils";
import { getShiftsQueryVairable } from "./utils";

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
    this.renderShifts();
  }

  renderShifts = async () => {
    const data = await this.getInitialDataLocal();
    this.renderShiftsHTML(this.parseQuery(data));
    this.getInitialDataRemote();
  };

  renderShiftsHTML = (data: GetInitialSocketData) => {
    if (
      !(
        this.shiftsDetailsEl &&
        this.shiftEarningsSummaryEl &&
        this.newShiftLinkEl
      )
    ) {
      return;
    }

    // Means we are have server rendered, so we bail
    if (document.querySelector('[name="3snsaaPmwVPzy6mFtib"]')) {
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
    const database = getDb();

    const { docs } = (await database.db.find({
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

  getInitialDataRemote = () => {
    const variables = getShiftsQueryVairable();

    const initialDataQuery = toRunableDocument<GetInitialSocketDataVariables>(
      INITIAL_DATA_GQL,
      variables
    );
    const socket = getSocket();

    socket.queryGraphQl({
      params: initialDataQuery,

      ok: (data: GetInitialSocketData) => {
        this.renderShiftsHTML(data);
        writeInitialDataToDb(data);
      },

      error: async () => {
        const data = await this.getInitialDataLocal();
        this.renderShiftsHTML(this.parseQuery(data));
      }
    });
  };
}

docReady(() => new IndexController());
