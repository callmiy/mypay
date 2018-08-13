import * as Yup from "yup";
import { Schema } from "yup";

import { showModal } from "../../components/modals";
import { dismissModal } from "../../components/modals";
import { processNewMetaForm } from "../../components/new-meta-form/new-meta-form";
import { sendChannelMsg as sendMetaChannelMsg } from "../../utils/meta-utils";
import { Topic as MetaTopic } from "../../utils/meta-utils";
import { CreateMeta } from "../../graphql/gen.types";
import { CreateMeta_meta } from "../../graphql/gen.types";
import { makeFormThings } from "../../utils/form-things";
import { setFieldError } from "../../utils/form-things";
import { clearFieldErrors } from "../../utils/form-things";
import { formHasErrors } from "../../utils/form-things";
import { getFieldAndErrorEls } from "../../utils/form-things";
import { FormThings } from "../../utils/form-things";

interface JsonResponseTag {
  tag_name: string;
  attributes: { [key: string]: string };
}

export interface JsonResponseNewMetaForm {
  html: string;
  css: JsonResponseTag;
  js: JsonResponseTag;
}

const makeTag = ({ tag_name, attributes }: JsonResponseTag) => {
  const tagEl = document.createElement(tag_name);

  for (const [attr, value] of Object.entries(attributes)) {
    tagEl.setAttribute(attr, value);
  }

  return tagEl;
};

const attachTagsToDOM = (data: JsonResponseNewMetaForm) => {
  const css = makeTag(data.css);
  document.head.appendChild(css);

  const js = makeTag(data.js);
  document.body.appendChild(js);
};

const getNewMetaForm = async () => {
  sendMetaChannelMsg({
    topic: MetaTopic.NEW_FORM,
    ok: msg => {
      const response = msg as JsonResponseNewMetaForm;
      window.appInterface.newMetaFormData = response;
      attachTagsToDOM(response);
    }
  });
};
getNewMetaForm();

const makeMetaSelectOption = (meta: CreateMeta_meta) => {
  const opt = document.createElement("option") as HTMLOptionElement;
  opt.value = meta.id;
  opt.selected = true;
  const breaks = (+meta.breakTimeSecs / 60).toFixed(1);
  opt.textContent = ` ${breaks} min | € ${meta.payPerHr} night: ${
    meta.nightSupplPayPct
  } % sunday: ${meta.sundaySupplPayPct} % `;

  return opt;
};

const fetchNewMetaBtn = document.getElementById("get-new-meta-form-button");
const metaSelectEl = document.getElementById(
  "select-meta"
) as HTMLSelectElement;

if (fetchNewMetaBtn && metaSelectEl) {
  fetchNewMetaBtn.addEventListener(
    "click",
    async () => {
      if (!window.appInterface.newMetaFormData) {
        await getNewMetaForm();
      }

      if (!window.appInterface.newMetaFormData) {
        return;
      }

      showModal({
        content: window.appInterface.newMetaFormData.html,

        onShow: () => {
          const newMetaFormCleanUp = processNewMetaForm((data: CreateMeta) => {
            const meta = data.meta as CreateMeta_meta;

            const opt = makeMetaSelectOption(meta);
            metaSelectEl.selectedIndex = -1;
            metaSelectEl.appendChild(opt);

            dismissModal();
          });

          return newMetaFormCleanUp;
        }
      });
    },
    false
  );
}

const submitEl = document.getElementById(
  "new-shift-form-submit"
) as HTMLButtonElement;

const resetEl = document.getElementById(
  "new-shift-form-reset"
) as HTMLButtonElement;

const dayOfMonthEl = document.getElementById(
  "day-of-month"
) as HTMLSelectElement;
const monthOfYearEl = document.getElementById(
  "month-of-year"
) as HTMLSelectElement;

const yearEl = document.getElementById("year") as HTMLSelectElement;

const startTimeHrEl = document.getElementById(
  "start-time-hour"
) as HTMLInputElement;

const startTimeMinEl = document.getElementById(
  "start-time-min"
) as HTMLInputElement;

const endTimeHrEl = document.getElementById(
  "end-time-hour"
) as HTMLInputElement;

const endTimeMinEl = document.getElementById(
  "end-time-min"
) as HTMLInputElement;

const validateEl = (
  target: HTMLInputElement,
  formThings: FormThings,
  schema: Schema<{}>
) => {
  const { fieldEl, errorEl } = getFieldAndErrorEls(target);

  Yup.reach(schema, target.name)
    .validate(target.value)
    .then(() => {
      clearFieldErrors({ fieldEl, errorEl });

      formThings.errors = {
        ...formThings.errors,
        [name]: undefined
      };

      if (!formHasErrors(formThings.errors)) {
        submitEl.disabled = false;
      }
    })
    .catch(error => {
      setFieldError({ fieldEl, errorEl }, error.message);
      submitEl.disabled = true;

      formThings.errors = {
        ...formThings.errors,
        [name]: error
      };
    });
};

const inputListener = (formThings: FormThings, schema: Schema<{}>) => (
  evt: InputEvent
) => {
  const target = evt.target as HTMLInputElement;

  if (!(target && submitEl)) {
    return;
  }

  validateEl(target, formThings, schema);
};

const keyboardListener = (type: "hr" | "min") => (evt: KeyboardEvent) => {
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

if (
  submitEl &&
  resetEl &&
  metaSelectEl &&
  dayOfMonthEl &&
  monthOfYearEl &&
  yearEl &&
  startTimeHrEl &&
  startTimeMinEl &&
  endTimeHrEl &&
  endTimeMinEl
) {
  const formThings = makeFormThings();

  // tslint:disable-next-line:no-any
  const schema = Yup.object<{ [k: string]: any }>().shape({
    [metaSelectEl.name]: Yup.number()
      .typeError("Invalid meta ID")
      .required()
      .positive()
      .integer(),

    [dayOfMonthEl.name]: Yup.number()
      .typeError("Invalid day")
      .required()
      .positive()
      .integer()
      .min(1)
      .max(31),
    [monthOfYearEl.name]: Yup.number()
      .typeError("Invalid month")
      .required()
      .positive()
      .integer()
      .min(1)
      .max(12),
    [yearEl.name]: Yup.number()
      .typeError("Invalid year")
      .required()
      .positive()
      .integer()
      .min(2000)
      .max(9999),

    [startTimeHrEl.name]: Yup.number()
      .typeError("Invalid hour")
      .required()
      .positive()
      .integer()
      .min(0)
      .max(23),

    [startTimeMinEl.name]: Yup.number()
      .typeError("Invalid minute")
      .required()
      .positive()
      .integer()
      .min(0)
      .max(59),

    [endTimeHrEl.name]: Yup.number()
      .typeError("Invalid hour")
      .required()
      .positive()
      .integer()
      .min(0)
      .max(23),

    [endTimeMinEl.name]: Yup.number()
      .typeError("Invalid minute")
      .required()
      .positive()
      .integer()
      .min(0)
      .max(59)
  });

  const formElements = [
    metaSelectEl,
    dayOfMonthEl,
    monthOfYearEl,
    yearEl,
    startTimeHrEl,
    startTimeMinEl,
    endTimeHrEl,
    endTimeMinEl
  ];

  formElements.forEach(element =>
    element.addEventListener("input", inputListener(formThings, schema))
  );

  startTimeHrEl.addEventListener("keypress", keyboardListener("hr"));
  startTimeMinEl.addEventListener("keypress", keyboardListener("min"));
  endTimeHrEl.addEventListener("keypress", keyboardListener("hr"));
  endTimeMinEl.addEventListener("keypress", keyboardListener("min"));

  submitEl.addEventListener("click", () => {
    submitEl.classList.add("loading");
    submitEl.disabled = true;
    resetEl.disabled = true;

    const data = {} as { [k: string]: string };

    formElements.forEach(el => (data[el.name] = el.value));

    schema
      .validate(data, { abortEarly: false })
      .then(value => {
        value.date = `${value.dayOfMonth}-${value.monthOfYear}-${value.year}`;
        value.startTime = `${value.startTimeHr}:${value.startTimeMin}`;
        value.endTime = `${value.endTimeHr}:${value.endTimeMin}`;

        // tslint:disable-next-line:no-console
        console.log("value", value);

        submitEl.classList.remove("loading");
      })
      .catch(() => {
        submitEl.classList.remove("loading");
        resetEl.disabled = false;
      });
  });

  resetEl.addEventListener("click", () => {
    formElements.forEach(el => {
      const defaultValEl = document.getElementById(
        `${el.name}-default`
      ) as HTMLInputElement;

      if (defaultValEl) {
        el.value = defaultValEl.value;
      }

      clearFieldErrors(getFieldAndErrorEls(el));
      submitEl.disabled = false;
      submitEl.classList.remove("loading");
      formThings.errors = {};
    });
  });
}
