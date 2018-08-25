import * as Yup from "yup";
import { Schema } from "yup";
import { ValidationError } from "yup";

import { showModal } from "../../components/modals";
import { dismissModal } from "../../components/modals";
import { NewMeta } from "../../components/new-meta-form/new-meta-form";
import { CreateMeta_meta } from "../../graphql/gen.types";
import { GetInitialSocketData_metas } from "../../graphql/gen.types";
import { CreateShift } from "../../graphql/gen.types";
import { setFieldError } from "../../utils/form-things";
import { clearFieldErrors } from "../../utils/form-things";
import { formHasErrors } from "../../utils/form-things";
import { getFieldAndErrorEls } from "../../utils/form-things";
import { toRunnableDocument } from "../../graphql/helpers";
import CREATE_SHIFT_GQL from "../../graphql/create-shift.mutation";
import { htmlfyGraphQlErrors } from "../../graphql/helpers";
import { setMainErrorClass } from "../../utils/form-things";
import { FormThingsError } from "../../utils/form-things";
import { AppSocket } from "../../socket";
import { docReady } from "../../utils/utils";
import { isServerRendered } from "../../utils/utils";
import { Database } from "../../database";
import { prepForOfflineSave } from "../../database";
import { META_TYPENAME, SHIFT_TYPENAME } from "../../constants";
import { OFFLINE_MSG } from "../../constants";

import * as newShiftDateTemplate from "../../templates/newShiftDateTemplate.handlebars";

import * as newShiftMetasSelectTemplate from "../../templates/newShiftMetasSelectTemplate.handlebars";

import * as newShiftConfirmTemplate from "../../templates/newShiftConfirmTemplate.handlebars";

import * as newShiftConfirmSubmitButtonsTemplate from "../../templates/newShiftConfirmSubmitButtonsTemplate.handlebars";

import * as newMetaFormTemplate from "../../templates/newMetaFormTemplate.handlebars";

interface DaysOfMonth {
  [key: number]: {
    display: number;
    selected: string;
  };
}

interface MetaForTemplate extends GetInitialSocketData_metas {
  selected: string;
}

interface MonthDaysYearMonth {
  days: DaysOfMonth;
  months: DaysOfMonth;
  years: DaysOfMonth;
}

interface Props {
  getMonthDaysYearMonth: () => MonthDaysYearMonth;
  socket: AppSocket;
  isServerRendered: () => boolean;
  database: Database;
}

const getMonthDaysYearMonth = (): MonthDaysYearMonth => {
  const date = new Date();

  const days = Array.from(Array(31), (_value, index) => ({
    display: index + 1,
    selected: index + 1 === date.getDate() ? "selected" : ""
  })).reduce((acc, val, index) => ({ ...acc, [index + 1]: val }), {});

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ].reduce(
    (acc, val, index) => ({
      ...acc,
      [index + 1]: {
        display: val,
        selected: index === date.getMonth() ? "selected" : ""
      }
    }),
    {}
  );

  const year = date.getFullYear();

  const years = [-4, -3, -2, -1, 0].reduce(
    (acc, val) => ({
      ...acc,
      [year + val]: { selected: year + val === year ? "selected" : "" }
    }),
    {}
  );

  return { days, months, years };
};

export class ShiftController {
  submitEl: HTMLButtonElement;
  resetEl: HTMLButtonElement;
  selectMetaEl: HTMLSelectElement;
  metaSelectDefaultEl: HTMLInputElement;
  dayOfMonthEl: HTMLSelectElement;
  monthOfYearEl: HTMLSelectElement;
  yearEl: HTMLSelectElement;
  showNewMetaFormEl: HTMLDivElement;
  dateSegmentEl: HTMLDivElement;
  startTimeHrEl: HTMLInputElement;
  startTimeMinEl: HTMLInputElement;
  endTimeHrEl: HTMLInputElement;
  endTimeMinEl: HTMLInputElement;
  mainErrorContainer: HTMLDivElement;
  submitConfirmedEl: HTMLButtonElement;
  editConfirmedEl: HTMLButtonElement;
  selectedMeta: GetInitialSocketData_metas | undefined;

  // tslint:disable-next-line:no-any
  newShiftToSave: any;

  formElements: { [k: string]: HTMLSelectElement | HTMLInputElement };
  formErrors = {} as FormThingsError;
  // tslint:disable-next-line:no-any
  schema: Schema<any>;
  newMetaForm: NewMeta;

  constructor(private props: Props) {
    this.newMetaForm = new NewMeta({
      socket: this.props.socket,
      onMetaCreated: this.onMetaCreated,
      database: this.props.database
    });
    this.render();
  }

  render = () => {
    this.renderDateSegmentEl();
    this.renderSelectMetaEl();
    this.renderMainErrorContainer();
    this.renderShowNewMetaFormEl();
    this.renderSubmitEl();
    this.renderResetEl();
    this.renderFormElements();
    this.setUpSchema();
  };

  renderMainErrorContainer = () => {
    this.mainErrorContainer = document.getElementById(
      "new-shift-form__error-main"
    ) as HTMLDivElement;
  };

  renderFormElements = () => {
    this.startTimeHrEl = document.getElementById(
      "start-time-hour"
    ) as HTMLInputElement;

    this.startTimeMinEl = document.getElementById(
      "start-time-min"
    ) as HTMLInputElement;

    this.endTimeHrEl = document.getElementById(
      "end-time-hour"
    ) as HTMLInputElement;

    this.endTimeMinEl = document.getElementById(
      "end-time-min"
    ) as HTMLInputElement;

    this.dayOfMonthEl = document.getElementById(
      "day-of-month"
    ) as HTMLSelectElement;

    this.monthOfYearEl = document.getElementById(
      "month-of-year"
    ) as HTMLSelectElement;

    this.yearEl = document.getElementById("year") as HTMLSelectElement;

    this.formElements = {
      [this.selectMetaEl.name]: this.selectMetaEl,
      [this.dayOfMonthEl.name]: this.dayOfMonthEl,
      [this.monthOfYearEl.name]: this.monthOfYearEl,
      [this.yearEl.name]: this.yearEl,
      [this.startTimeHrEl.name]: this.startTimeHrEl,
      [this.startTimeMinEl.name]: this.startTimeMinEl,
      [this.endTimeHrEl.name]: this.endTimeHrEl,
      [this.endTimeMinEl.name]: this.endTimeMinEl
    };

    Object.values(this.formElements).forEach(element =>
      element.addEventListener("input", this.validateEl)
    );

    this.startTimeHrEl.addEventListener(
      "keypress",
      this.keyboardListener("hr")
    );

    this.startTimeMinEl.addEventListener(
      "keypress",
      this.keyboardListener("min")
    );

    this.endTimeHrEl.addEventListener("keypress", this.keyboardListener("hr"));

    this.endTimeMinEl.addEventListener(
      "keypress",
      this.keyboardListener("min")
    );
  };

  setUpSchema = () => {
    this.schema = Yup.object().shape({
      [this.selectMetaEl.name]: Yup.number()
        .typeError("Invalid meta ID")
        .required()
        .positive()
        .integer()
        .min(1),

      [this.dayOfMonthEl.name]: Yup.number()
        .typeError("Invalid day")
        .required()
        .positive()
        .integer()
        .min(1)
        .max(31),
      [this.monthOfYearEl.name]: Yup.number()
        .typeError("Invalid month")
        .required()
        .positive()
        .integer()
        .min(1)
        .max(12),
      [this.yearEl.name]: Yup.number()
        .typeError("Invalid year")
        .required()
        .positive()
        .integer()
        .min(2000)
        .max(9999),

      [this.startTimeHrEl.name]: Yup.number()
        .typeError("Invalid hour")
        .required()
        .positive()
        .integer()
        .min(0)
        .max(23),

      [this.startTimeMinEl.name]: Yup.number()
        .typeError("Invalid minute")
        .required()
        .positive()
        .integer()
        .min(0)
        .max(59),

      [this.endTimeHrEl.name]: Yup.number()
        .typeError("Invalid hour")
        .required()
        .positive()
        .integer()
        .min(0)
        .max(23),

      [this.endTimeMinEl.name]: Yup.number()
        .typeError("Invalid minute")
        .required()
        .positive()
        .integer()
        .min(0)
        .max(59)
    });
  };

  renderResetEl = () => {
    this.resetEl = document.getElementById(
      "new-shift-form-reset"
    ) as HTMLButtonElement;

    if (!this.resetEl) {
      return;
    }

    this.resetEl.addEventListener("click", this.resetElHandler);
  };

  renderSubmitEl = () => {
    this.submitEl = document.getElementById(
      "new-shift-form-submit"
    ) as HTMLButtonElement;

    if (!this.submitEl) {
      return;
    }

    this.submitEl.addEventListener("click", this.submitElHandler);
  };

  renderShowNewMetaFormEl = () => {
    this.showNewMetaFormEl = document.getElementById(
      "show-new-meta-form-button"
    ) as HTMLDivElement;

    if (!this.showNewMetaFormEl) {
      return;
    }

    this.showNewMetaFormEl.addEventListener(
      "click",
      this.fetchNewMetaElClickHandler
    );
  };

  renderSelectMetaEl = async (reRender = false) => {
    this.selectMetaEl = document.getElementById(
      "select-meta"
    ) as HTMLSelectElement;

    if (!this.selectMetaEl) {
      return;
    }

    if (this.props.isServerRendered() && !reRender) {
      return;
    }

    this.selectMetaEl.innerHTML = newShiftMetasSelectTemplate({
      metas: await this.getMetasFromDb()
    });
  };

  renderDateSegmentEl = (reRender = false) => {
    this.dateSegmentEl = document.getElementById(
      "new-shift-form-date-segment-template"
    ) as HTMLDivElement;

    if (!this.dateSegmentEl) {
      return;
    }

    if (this.props.isServerRendered() && !reRender) {
      return;
    }

    const {
      days: daysOfMonth,
      months: monthOfYear,
      years
    } = this.props.getMonthDaysYearMonth();

    this.dateSegmentEl.innerHTML = newShiftDateTemplate({
      daysOfMonth,
      monthOfYear,
      years
    });
  };

  getMetasFromDb = () =>
    this.props.database.db
      .find({
        selector: {
          schemaType: META_TYPENAME
        }
      })
      .then(
        ({
          docs
        }: {
          docs: Array<PouchDB.Core.ExistingDocument<MetaForTemplate>>;
        }) =>
          docs.sort((a, b) => +b.id - +a.id).map((m, index) => {
            return {
              ...m,
              breakTimeSecs: +(+m.breakTimeSecs / 60).toFixed(1),
              selected: index === 0 ? "selected" : ""
            };
          })
      );

  /**
   *
   * When a new meta is created on the server and returned to us, we turn the
   * meta into a select option and immediately select it.
   */
  makeMetaSelectOption = (meta: CreateMeta_meta) => {
    const opt = document.createElement("option") as HTMLOptionElement;
    opt.value = meta.id;
    opt.selected = true;

    const meta_ = {
      ...meta,
      selected: "selected",
      breakTimeSecs: (+meta.breakTimeSecs / 60).toFixed(1)
    };

    opt.setAttribute("data-value", JSON.stringify(meta_));

    opt.textContent = ` ${meta_.breakTimeSecs} min | € ${
      meta.payPerHr
    } night: ${meta.nightSupplPayPct} % sunday: ${meta.sundaySupplPayPct} % `;

    return opt;
  };

  fetchNewMetaElClickHandler = async () => {
    showModal({
      content: newMetaFormTemplate(),

      onShow: () => {
        this.newMetaForm.setUpDOM();
        return this.newMetaForm.cleanUp;
      }
    });
  };

  onMetaCreated = (meta: CreateMeta_meta) => {
    const opt = this.makeMetaSelectOption(meta);
    this.selectMetaEl.selectedIndex = -1;
    this.selectMetaEl.appendChild(opt);

    // triggering input event let's us clear errors from the
    //  selectMetaEl UI and run validation on user form inputs. See
    // below where we added the input event listener to selectMetaEl

    this.selectMetaEl.dispatchEvent(new Event("input"));

    dismissModal(this.newMetaForm.cleanUp);

    // We keep the newly created meta as the default so that if user
    // wishes to reset the form, she always gets the latest meta as the
    // default
    if (this.metaSelectDefaultEl) {
      this.metaSelectDefaultEl.value = meta.id;
    }
  };

  /**
   *
   * We validate each form control when user inputs data
   */
  validateEl = (evt: InputEvent) => {
    const target = evt.target as HTMLInputElement;

    if (!target) {
      return;
    }

    const { fieldEl, errorEl } = getFieldAndErrorEls(target);
    const name = target.name;

    Yup.reach(this.schema, name)
      .validate(target.value)
      .then(() => {
        clearFieldErrors({ fieldEl, errorEl });
        delete this.formErrors[name];

        if (!formHasErrors(this.formErrors)) {
          this.submitEl.disabled = false;
        }

        if (name === this.selectMetaEl.name) {
          this.setAndGetSelectedMeta(target.value);
        }
      })
      .catch((error: ValidationError) => {
        setFieldError({ fieldEl, errorEl }, error.message);
        this.submitEl.disabled = true;
        this.formErrors[name] = error;

        if (name === this.selectMetaEl.name) {
          this.selectedMeta = undefined;
        }
      });
  };

  /**
   *
   * "hr" or "min" means the form control will take an hour or minute time.
   */
  keyboardListener = (type: "hr" | "min") => (evt: KeyboardEvent) => {
    const max = type === "hr" ? 23 : 59;
    const key = evt.key;

    if (key === ".") {
      return evt.preventDefault();
    }

    const target = evt.target as HTMLInputElement;

    if (!target) {
      return;
    }

    const value = Number(target.value + key);

    if (value > max) {
      evt.preventDefault();
    }
  };

  submitElHandler = (evt: Event) => {
    evt.preventDefault();

    const data = {} as { [k: string]: string };

    Object.values(this.formElements).forEach(el => (data[el.name] = el.value));

    this.schema
      .validate(data, { abortEarly: false })
      .then(shift => {
        shift.date = `${this.pad(shift.year)}-${this.pad(
          shift.monthOfYear
        )}-${this.pad(shift.dayOfMonth)}`;

        shift.startTime = `${this.pad(shift.startTimeHr)}:${this.pad(
          shift.startTimeMin
        )}:00`;

        shift.endTime = `${this.pad(shift.endTimeHr)}:${this.pad(
          shift.endTimeMin
        )}:00`;

        [
          "dayOfMonth",
          "monthOfYear",
          "year",
          "startTimeHr",
          "startTimeMin",
          "endTimeHr",
          "endTimeMin"
        ].forEach(k => delete shift[k]);

        this.newShiftToSave = shift;

        const selectedMeta = this.setAndGetSelectedMeta(
          shift[this.selectMetaEl.name]
        );

        const html = newShiftConfirmTemplate({
          meta: selectedMeta,
          shift,
          buttons: newShiftConfirmSubmitButtonsTemplate(),
          saving: true
        });

        showModal({
          content: html,
          onShow: () => {
            this.renderSubmitConfirmedEl();
            this.renderEditConfirmedEl();

            return this.tearDownConfirmedEls;
          }
        });
      })
      .catch(errors => {
        this.submitEl.classList.remove("loading");
        this.resetEl.disabled = false;

        errors.inner.map((err: ValidationError) => {
          setFieldError(
            getFieldAndErrorEls(this.formElements[err.path]),
            err.message
          );

          this.formErrors[err.path] = err;
        });
      });
  };

  setAndGetSelectedMeta = (id: number | string) => {
    const selectedOptionEl = this.selectMetaEl.querySelector(
      `option[value="${id}"]`
    ) as HTMLOptionElement;

    if (!selectedOptionEl) {
      return {};
    }

    return (this.selectedMeta = JSON.parse(
      selectedOptionEl.getAttribute("data-value") || "{}"
    ));
  };

  resetElHandler = () => {
    Object.values(this.formElements).forEach(el => {
      clearFieldErrors(getFieldAndErrorEls(el));
    });

    this.renderSelectMetaEl(true);
    this.renderDateSegmentEl(true);
    setMainErrorClass(this.mainErrorContainer, "hide");
    this.submitEl.disabled = false;
    this.submitEl.classList.remove("loading");
    this.formErrors = {};
    this.mainErrorContainer.innerHTML = "";
  };

  renderEditConfirmedEl = () => {
    this.editConfirmedEl = document.getElementById(
      "new-shift-confirm__edit"
    ) as HTMLButtonElement;

    if (!this.editConfirmedEl) {
      return;
    }

    this.editConfirmedEl.addEventListener(
      "click",
      this.editConfirmedElHandler,
      {
        once: true
      }
    );
  };

  editConfirmedElHandler = () => {
    dismissModal();
    this.tearDownConfirmedEls();
  };

  renderSubmitConfirmedEl = () => {
    this.submitConfirmedEl = document.getElementById(
      "new-shift-confirm__submit"
    ) as HTMLButtonElement;

    if (!this.submitConfirmedEl) {
      return;
    }

    this.submitConfirmedEl.addEventListener(
      "click",
      this.submitConfirmedElHandler,
      {
        once: true
      }
    );
  };

  tearDownConfirmedEls = () => {
    this.resetEl.disabled = false;

    if (this.submitConfirmedEl) {
      this.submitConfirmedEl.removeEventListener(
        "click",
        this.submitConfirmedElHandler
      );
    }

    if (this.editConfirmedEl) {
      this.editConfirmedEl.removeEventListener(
        "click",
        this.editConfirmedElHandler
      );
    }
  };

  submitConfirmedElHandler = (evt: Event) => {
    evt.preventDefault();

    this.submitEl.classList.add("loading");
    this.submitEl.disabled = true;
    this.resetEl.disabled = true;

    if (window.appInterface.socketConnected) {
      this.saveOnline();
    } else {
      this.saveOffline();
    }

    dismissModal();
    this.tearDownConfirmedEls();
  };

  saveOffline = async () => {
    const offlineShift = {
      ...this.newShiftToSave,
      hoursGross: "N/A",
      normalHours: "N/A",
      normalPay: "N/A",
      nightHours: "N/A",
      nightSupplPay: "N/A",
      sundayHours: "N/A",
      sundaySupplPay: "N/A",
      totalPay: "N/A",
      meta: this.selectedMeta,
      ...prepForOfflineSave(SHIFT_TYPENAME)
    };

    // We delete the id because we can _id to be the id for offline purpose
    delete offlineShift.id;

    await this.props.database.db.put(offlineShift);

    const html = newShiftConfirmTemplate({
      meta: this.selectedMeta,
      shift: offlineShift,
      topMessage: `<div class="top-error">${OFFLINE_MSG}</div>`
    });

    showModal({
      content: html,
      onShow: () => {
        this.cleanUpAfterSave();
        return () => (window.location.href = "/");
      }
    });
  };

  saveOnline = () => {
    this.props.socket.queryGraphQl({
      params: toRunnableDocument(CREATE_SHIFT_GQL, {
        shift: this.newShiftToSave
      }),

      ok: ({ shift: createdShift }: CreateShift) => {
        if (createdShift) {
          this.props.database.db.put(createdShift);

          const html = newShiftConfirmTemplate({
            meta: this.selectedMeta,
            shift: createdShift
          });

          showModal({
            content: html,
            onShow: () => {
              this.cleanUpAfterSave();
              return () => (window.location.href = "/");
            }
          });
        }
      },

      error: reason => {
        this.submitEl.classList.remove("loading");

        this.mainErrorContainer.innerHTML = htmlfyGraphQlErrors(
          "shift",
          reason
        );

        setMainErrorClass(this.mainErrorContainer, "show");
      },

      onTimeout: this.saveOffline
    });
  };

  cleanUpAfterSave = () => {
    this.selectedMeta = undefined;
    this.newShiftToSave = undefined;
    this.submitEl.classList.remove("loading");
    this.submitEl.disabled = false;
    this.resetEl.disabled = false;
  };

  /**
   *
   * ISO dates and times require padding to length 2 e.g. 09:50:00, 2014-03-09
   */
  pad = (val: number) => (val + "").padStart(2, "0");
}

export default ShiftController;

docReady(
  () =>
    new ShiftController({
      socket: window.appInterface.socket,
      database: window.appInterface.db,
      getMonthDaysYearMonth,
      isServerRendered
    })
);
