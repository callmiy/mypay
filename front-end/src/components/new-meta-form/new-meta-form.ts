import * as Yup from "yup";
import { ValidationError } from "yup";

import { sendMsg } from "../../utils/meta-utils";
import CREATE_META from "../../graphql/create-meta.mutation";
import { toRunableDocument } from "../../graphql/helpers";
import { stringifyGraphQlErrors } from "../../graphql/helpers";
import { CreateMeta } from "../../graphql/gen.types";
import { makeFormThings } from "../../utils/form-things";
import { setFieldError } from "../../utils/form-things";
import { clearFieldErrors } from "../../utils/form-things";
import { setMainErrorClass } from "../../utils/form-things";
import { formHasErrors } from "../../utils/form-things";

enum FormElementsName {
  BREAK_TIME_SECS = "break_time_secs",
  PAY_PER_HOUR = "pay_per_hr",
  NIGHT_SUPPL_PAY = "night_suppl_pay_pct",
  SUNDAY_SUPPL_PAY = "sunday_suppl_pay_pct"
}

interface NewMetaFormData {
  // tslint:disable-next-line:no-any
  [key: string]: any;
}

const genericError = "Invalid Number";

const schema = Yup.object().shape({
  [FormElementsName.BREAK_TIME_SECS]: Yup.number()
    .typeError(genericError)
    .required()
    .positive()
    .integer(),

  [FormElementsName.PAY_PER_HOUR]: Yup.number()
    .typeError(genericError)
    .required()
    .positive(),

  [FormElementsName.NIGHT_SUPPL_PAY]: Yup.number()
    .typeError(genericError)
    .required()
    .positive(),

  [FormElementsName.SUNDAY_SUPPL_PAY]: Yup.number()
    .typeError(genericError)
    .required()
    .positive()
});

export const processNewMetaForm = (
  onMetaCreated: (meta: CreateMeta) => void
) => {
  const formSubmit = document.getElementById(
    "new-meta-form-submit"
  ) as HTMLButtonElement;

  const formReset = document.getElementById(
    "new-meta-form-reset"
  ) as HTMLButtonElement;

  const mainErrorContainer = document.getElementById(
    "new-meta-form__error-main"
  );

  if (!(formSubmit && formReset && mainErrorContainer)) {
    return;
  }

  const formThings = makeFormThings();

  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    ".new-meta-form__control"
  );

  Array.prototype.forEach.call(inputs, (el: HTMLInputElement) => {
    const name = el.name;
    const fieldEl = el.closest(".new-meta-form__field") as HTMLElement;
    const errorEl = (fieldEl
      ? fieldEl.querySelector(".new-meta-form__error")
      : null) as HTMLElement;

    const focusListener = () => {
      clearFieldErrors(fieldEl, errorEl);
      setMainErrorClass(mainErrorContainer, "hide");

      if (!formHasErrors(formThings.errors)) {
        formSubmit.disabled = false;
      }
    };

    const inputListener = (evt: InputEvent) => {
      const target = evt.target as HTMLInputElement;
      setMainErrorClass(mainErrorContainer, "hide");

      if (!target) {
        return;
      }

      Yup.reach(schema, target.name)
        .validate(target.value)
        .then(() => {
          clearFieldErrors(fieldEl, errorEl);

          formThings.errors = {
            ...formThings.errors,
            [name]: undefined
          };

          if (!formHasErrors(formThings.errors)) {
            formSubmit.disabled = false;
          }
        })
        .catch(error => {
          setFieldError({ fieldEl, errorEl }, error.message);
          formSubmit.disabled = true;

          formThings.errors = {
            ...formThings.errors,
            [name]: error
          };
        });
    };

    formThings.doms[name] = {
      el,
      fieldEl,
      errorEl,
      focusListener,
      inputListener
    };

    el.addEventListener("focus", focusListener);
    el.addEventListener("input", inputListener);
    el.addEventListener("blur", inputListener);
  });

  const formSubmitListener = async () => {
    const data = {} as NewMetaFormData;

    Object.keys(formThings.doms).forEach(
      k => (data[k] = formThings.doms[k].el.value)
    );

    schema
      .validate(data, { abortEarly: false })
      .then((meta: { [k: string]: number }) => {
        sendMsg({
          topic: "create",

          params: toRunableDocument(CREATE_META, {
            // The user input is in minutes, so we convert break_time_secs to
            // seconds by multiplying minutes by 60
            meta: { ...meta, break_time_secs: meta.break_time_secs * 60 }
          }),

          ok: onMetaCreated,

          error: reason => {
            formSubmit.classList.remove("loading");
            mainErrorContainer.textContent = stringifyGraphQlErrors(
              "meta",
              reason
            );

            setMainErrorClass(mainErrorContainer, "show");

            formReset.disabled = false;
          }
        });

        formSubmit.classList.add("loading");
        formSubmit.disabled = true;
        formReset.disabled = true;
        formThings.errors = {};
      })
      .catch(errors => {
        formSubmit.disabled = true;
        errors.inner.map((err: ValidationError) => {
          setFieldError(formThings.doms[err.path], err.message);

          formThings.errors = {
            ...formThings.errors,
            [err.path]: err
          };
        });
      });
  };

  const formResetListener = async () => {
    Object.keys(formThings.doms).forEach(k => {
      const { el, fieldEl, errorEl } = formThings.doms[k];
      el.value = "";

      if (!(fieldEl && errorEl)) {
        return;
      }

      clearFieldErrors(fieldEl, errorEl);
      setMainErrorClass(mainErrorContainer, "hide");
    });

    formSubmit.classList.remove("loading");
    formSubmit.disabled = false;
    formThings.errors = {};
  };

  formSubmit.addEventListener("click", formSubmitListener);

  formReset.addEventListener("click", formResetListener);

  return () => {
    formSubmit.removeEventListener("click", formSubmitListener);
    formReset.removeEventListener("click", formResetListener);

    Object.values(formThings.doms).forEach(v => {
      const { el, focusListener, inputListener } = v;
      el.removeEventListener("focus", focusListener);
      el.removeEventListener("input", inputListener);
      el.removeEventListener("blur", inputListener);
    });
  };
};
