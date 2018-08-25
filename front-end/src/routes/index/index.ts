import * as moment from "moment";
import { AppSocket } from "../../socket";

import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { SHIFT_TYPENAME } from "./../../constants";
import { InitialShiftFromDb } from "../../constants";
import { InitialUrlFromDb } from "../../constants";
import { Database } from "../../database";
import { docReady } from "../../utils/utils";
import { isServerRendered } from "../../utils/utils";
import { Emitter } from "../../emitter";
import { Topic } from "../../emitter";

import * as shiftDetailTemplate from "../../templates/shiftDetailTemplate.handlebars";

import * as shiftEarningSummaryTemplate from "../../templates/shiftEarningSummaryTemplate.handlebars";

import shiftDetailRowTemplate from "../../templates/partials/shiftDetailRowTemplate.handlebars";

interface Props {
  database: Database;
  isServerRendered: () => boolean;
  socket: AppSocket;
  emitter: Emitter;
}

export class IndexController {
  shiftsDetailsEl: HTMLDivElement;
  shiftEarningsSummaryEl: HTMLDivElement;
  menuTitleEl: HTMLDivElement;
  newShiftLinkEl: HTMLLinkElement;
  shiftsFromDb: InitialShiftFromDb[];

  constructor(private props: Props) {
    this.render();
    this.props.emitter.listen(Topic.SHIFT_SYNCED_SUCCESS, {
      next: this.shiftDataSyncedCb
    });
  }

  // tslint:disable-next-line:no-any
  shiftDataSyncedCb = async (msg: any) => {
    const shiftRowEl = document.getElementById(`shift-detail-row-${msg._id}`);

    if (!shiftRowEl) {
      return;
    }

    shiftRowEl.id = `shift-detail-row-${msg.id}`;
    shiftRowEl.innerHTML = shiftDetailRowTemplate({ shift: msg });
  };

  render = async () => {
    this.renderShiftsDetailsEl();
    this.renderShiftEarningsSummaryEl();
    this.renderNewShiftLinkEl();
    this.renderMenuTitleEl();
  };

  renderShiftEarningsSummaryEl = async () => {
    this.shiftEarningsSummaryEl = document.getElementById(
      "shift__earnings-summary"
    ) as HTMLDivElement;

    if (!this.shiftEarningsSummaryEl) {
      return;
    }

    if (this.props.isServerRendered()) {
      return;
    }

    const currentMonthYear = moment(new Date()).format("MMM/YYYY");
    const shifts = await this.getAndSetShiftsFromDb();

    this.shiftEarningsSummaryEl.innerHTML = shiftEarningSummaryTemplate({
      totalEarnings: shifts
        .reduce((a, b) => {
          let x = 0;

          if (b && b.totalPay) {
            x = +b.totalPay;

            if (isNaN(x)) {
              x = 0;
            }
          }

          return a + x;
        }, 0)
        .toFixed(2),
      currentMonthYear
    });
  };

  renderShiftsDetailsEl = async () => {
    this.shiftsDetailsEl = document.getElementById(
      "index-route-shifts-details"
    ) as HTMLDivElement;

    if (!this.shiftsDetailsEl) {
      return;
    }

    if (this.props.isServerRendered()) {
      return;
    }

    const shifts = await this.getAndSetShiftsFromDb();
    this.shiftsDetailsEl.innerHTML = shiftDetailTemplate({ shifts });
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

    this.menuTitleEl.textContent = moment(new Date()).format("MMM/YYYY");
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
    return this.shiftsFromDb
      ? this.shiftsFromDb
      : (this.shiftsFromDb = await this.props.database.db
          .find({
            selector: {
              schemaType: { $eq: SHIFT_TYPENAME }
            }
          })
          .then(({ docs }: { docs: InitialShiftFromDb[] }) =>
            docs.sort((a, b) => +b.id - +a.id)
          ));
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
