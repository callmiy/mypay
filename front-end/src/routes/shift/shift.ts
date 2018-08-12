import * as Yup from "yup";

import { showModal } from "../../components/modals";
import { dismissModal } from "../../components/modals";
import { processNewMetaForm } from "../../components/new-meta-form/new-meta-form";
import { sendMsg } from "../../utils/meta-utils";
import { CreateMeta } from "../../graphql/gen.types";
import { CreateMeta_meta } from "../../graphql/gen.types";

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
  sendMsg({
    topic: "new-form",
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

const newShiftSubmitEl = document.getElementById("new-shift-form-submit");
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

if (
  newShiftSubmitEl &&
  metaSelectEl &&
  dayOfMonthEl &&
  monthOfYearEl &&
  yearEl &&
  startTimeHrEl &&
  startTimeMinEl &&
  endTimeHrEl &&
  endTimeMinEl
) {
  const getFormValues = () => {
    return {
      [metaSelectEl.name]: metaSelectEl.value,
      [dayOfMonthEl.name]: dayOfMonthEl.value,
      [monthOfYearEl.name]: monthOfYearEl.value,
      [yearEl.name]: yearEl.value,
      [startTimeHrEl.name]: startTimeHrEl.value,
      [startTimeMinEl.name]: startTimeMinEl.value,
      [endTimeHrEl.name]: endTimeHrEl.value,
      [endTimeMinEl.name]: endTimeMinEl.value
    };
  };

  const schema = Yup.object().shape({
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

  newShiftSubmitEl.addEventListener("click", () => {
    // tslint:disable-next-line:no-console
    console.log(
      `


  logging starts


  getFormValues`,
      getFormValues(),
      schema,
      `

  logging ends


  `
    );
  });
}
