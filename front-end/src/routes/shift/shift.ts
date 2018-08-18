import * as Yup from "yup";
import { Schema } from "yup";
import { ValidationError } from "yup";

import { showModal } from "../../components/modals";
import { dismissModal } from "../../components/modals";
import { NewMeta } from "../../components/new-meta-form/new-meta-form";
import { CreateMeta } from "../../graphql/gen.types";
import { CreateMeta_meta } from "../../graphql/gen.types";
import { GetNewMetaForm } from "../../graphql/gen.types";
import { GetNewMetaForm_newMetaForm } from "../../graphql/gen.types";
import { setFieldError } from "../../utils/form-things";
import { clearFieldErrors } from "../../utils/form-things";
import { formHasErrors } from "../../utils/form-things";
import { getFieldAndErrorEls } from "../../utils/form-things";
import { toRunableDocument } from "../../graphql/helpers";
import CREATE_SHIFT_GQL from "../../graphql/create-shift.mutation";
import { htmlfyGraphQlErrors } from "../../graphql/helpers";
import { setMainErrorClass } from "../../utils/form-things";
import { FormThingsError } from "../../utils/form-things";
import { docReady } from "../../app";
import { getSocket } from "../../app";
import NEW_META_FORM_GQL from "../../graphql/new-meta-form.query";

const socket = getSocket();

export interface JsonResponseNewMetaForm {
  html: string;
}
/**
 * Get the HTML string that will be used to create new meta and store.
 */
const getNewMetaForm = async () => {
  socket.queryGraphQl({
    params: toRunableDocument(NEW_META_FORM_GQL),
    ok: msg => {
      const response = msg as GetNewMetaForm;
      const newMetaForm = response.newMetaForm as GetNewMetaForm_newMetaForm;
      window.appInterface.newMetaFormData = newMetaForm;
    }
  });
};
getNewMetaForm();

class Shift {
  submitEl = document.getElementById(
    "new-shift-form-submit"
  ) as HTMLButtonElement;

  resetEl = document.getElementById(
    "new-shift-form-reset"
  ) as HTMLButtonElement;

  startTimeHrEl = document.getElementById(
    "start-time-hour"
  ) as HTMLInputElement;

  startTimeMinEl = document.getElementById(
    "start-time-min"
  ) as HTMLInputElement;

  metaSelectDefaultEl: HTMLInputElement;

  mainErrorContainer = document.getElementById(
    "new-shift-form__error-main"
  ) as HTMLDivElement;

  dayOfMonthEl = document.getElementById("day-of-month") as HTMLSelectElement;
  monthOfYearEl = document.getElementById("month-of-year") as HTMLSelectElement;
  yearEl = document.getElementById("year") as HTMLSelectElement;
  endTimeHrEl = document.getElementById("end-time-hour") as HTMLInputElement;
  endTimeMinEl = document.getElementById("end-time-min") as HTMLInputElement;
  fetchNewMetaEl = document.getElementById("get-new-meta-form-button");
  metaSelectEl = document.getElementById("select-meta") as HTMLSelectElement;

  formElements: { [k: string]: HTMLSelectElement | HTMLInputElement };
  formErrors = {} as FormThingsError;
  // tslint:disable-next-line:no-any
  schema: Schema<any>;

  constructor() {
    if (
      this.fetchNewMetaEl &&
      this.mainErrorContainer &&
      this.submitEl &&
      this.resetEl &&
      this.metaSelectEl &&
      this.dayOfMonthEl &&
      this.monthOfYearEl &&
      this.yearEl &&
      this.startTimeHrEl &&
      this.startTimeMinEl &&
      this.endTimeHrEl &&
      this.endTimeMinEl
    ) {
      this.metaSelectDefaultEl = document.getElementById(
        `${this.metaSelectEl.name}-default`
      ) as HTMLInputElement;

      this.fetchNewMetaEl.addEventListener(
        "click",
        this.fetchNewMetaElClickHandler
      );

      this.submitEl.addEventListener("click", this.submitElHandler);
      this.resetEl.addEventListener("click", this.resetElHandler);

      this.schema = Yup.object().shape({
        [this.metaSelectEl.name]: Yup.number()
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

      this.formElements = {
        [this.metaSelectEl.name]: this.metaSelectEl,
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
      this.endTimeHrEl.addEventListener(
        "keypress",
        this.keyboardListener("hr")
      );
      this.endTimeMinEl.addEventListener(
        "keypress",
        this.keyboardListener("min")
      );
    }
  }

  /**
   *
   * When a new meta is created on the server and returned to us, we turn the
   * meta into a select option and immediately select it.
   */
  makeMetaSelectOption = (meta: CreateMeta_meta) => {
    const opt = document.createElement("option") as HTMLOptionElement;
    opt.value = meta.id;
    opt.selected = true;
    const breaks = (+meta.breakTimeSecs / 60).toFixed(1);
    opt.textContent = ` ${breaks} min | € ${meta.payPerHr} night: ${
      meta.nightSupplPayPct
    } % sunday: ${meta.sundaySupplPayPct} % `;

    return opt;
  };

  fetchNewMetaElClickHandler = async () => {
    if (!window.appInterface.newMetaFormData) {
      await getNewMetaForm();
    }

    if (!window.appInterface.newMetaFormData) {
      return;
    }

    showModal({
      content: window.appInterface.newMetaFormData.html,

      onShow: () => {
        const newMeta = new NewMeta(this.onMetaCreated);
        return newMeta.cleanUp;
      }
    });
  };

  onMetaCreated = (data: CreateMeta) => {
    const meta = data.meta as CreateMeta_meta;

    const opt = this.makeMetaSelectOption(meta);
    this.metaSelectEl.selectedIndex = -1;
    this.metaSelectEl.appendChild(opt);

    // triggering input event let's us clear errors from the
    //  metaSelectEl UI and run validation on user form inputs. See
    // below where we added the input event listener to metaSelectEl

    this.metaSelectEl.dispatchEvent(new Event("input"));

    dismissModal();

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
      })
      .catch((error: ValidationError) => {
        setFieldError({ fieldEl, errorEl }, error.message);
        this.submitEl.disabled = true;
        this.formErrors[name] = error;
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

  submitElHandler = () => {
    this.submitEl.classList.add("loading");
    this.submitEl.disabled = true;
    this.resetEl.disabled = true;

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

        socket.queryGraphQl({
          params: toRunableDocument(CREATE_SHIFT_GQL, { shift }),
          ok: () => {
            window.location.href = "/";
          },

          error: reason => {
            this.submitEl.classList.remove("loading");

            this.mainErrorContainer.innerHTML = htmlfyGraphQlErrors(
              "shift",
              reason
            );

            setMainErrorClass(this.mainErrorContainer, "show");
          }
        });

        this.submitEl.classList.remove("loading");
        this.resetEl.disabled = false;
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

  resetElHandler = () => {
    // Get the hidden elements which represent the default values and reset
    // form elements that user will interact with to those hidden default values
    Object.values(this.formElements).forEach(el => {
      const defaultValEl = document.getElementById(
        `${el.name}-default`
      ) as HTMLInputElement;

      if (defaultValEl) {
        el.value = defaultValEl.value;
      }

      clearFieldErrors(getFieldAndErrorEls(el));
    });

    setMainErrorClass(this.mainErrorContainer, "hide");

    this.submitEl.disabled = false;
    this.submitEl.classList.remove("loading");
    this.formErrors = {};
    this.mainErrorContainer.innerHTML = "";
  };

  /**
   *
   * ISO dates and times require padding to length 2 e.g. 09:50:00, 2014-03-09
   */
  pad = (val: number) => (val + "").padStart(2, "0");
}

docReady(() => new Shift());
