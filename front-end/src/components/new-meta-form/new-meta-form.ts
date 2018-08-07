import * as Yup from "yup";
import { ValidationError } from "yup";

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

interface FormDOM {
  el: HTMLInputElement;
  fieldEl: HTMLElement | null;
  errorEl: HTMLElement | null;
  focusListener: (evt: InputEvent) => void;
  inputListener: (evt: InputEvent) => void;
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

const setError = (
  { fieldEl, errorEl }: Pick<FormDOM, "fieldEl" | "errorEl">,
  message: string
) => {
  if (!(fieldEl && errorEl)) {
    return;
  }

  fieldEl.classList.add("error");
  errorEl.classList.add("error");
  errorEl.classList.remove("hidden");
  errorEl.textContent = message;
};

const clearErrors = (fieldEl: HTMLElement, errorEl: HTMLElement) => {
  fieldEl.classList.remove("error");
  errorEl.classList.remove("error");
  errorEl.classList.add("hidden");
};

export const processNewMetaForm = () => {
  const formSubmit = document.getElementById(
    "new-meta-form-submit"
  ) as HTMLButtonElement;

  const formReset = document.getElementById(
    "new-meta-form-reset"
  ) as HTMLButtonElement;

  if (!(formSubmit && formReset)) {
    return;
  }

  const formThings = {
    doms: {},
    errors: {}
  } as {
    doms: { [key: string]: FormDOM };
    errors: {
      [key: string]: ValidationError | undefined;
    };
  };

  const hasErrors = () => {
    return Object.values(formThings.errors).filter(e => e !== undefined).length;
  };

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
      clearErrors(fieldEl, errorEl);

      if (!hasErrors()) {
        formSubmit.disabled = false;
      }
    };

    const inputListener = (evt: InputEvent) => {
      const target = evt.target as HTMLInputElement;

      if (!target) {
        return;
      }

      Yup.reach(schema, target.name)
        .validate(target.value)
        .then(() => {
          clearErrors(fieldEl, errorEl);

          formThings.errors = {
            ...formThings.errors,
            [name]: undefined
          };

          if (!hasErrors()) {
            formSubmit.disabled = false;
          }
        })
        .catch(error => {
          setError({ fieldEl, errorEl }, error.message);
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

    el.addEventListener("focus", focusListener, false);
    el.addEventListener("input", inputListener, false);
    el.addEventListener("blur", inputListener, false);
  });

  const formSubmitListener = async () => {
    const data = {} as NewMetaFormData;

    Object.keys(formThings.doms).forEach(
      k => (data[k] = formThings.doms[k].el.value)
    );

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        formThings.errors = {};
      })
      .catch(errors => {
        formSubmit.disabled = true;
        errors.inner.map((err: ValidationError) => {
          setError(formThings.doms[err.path], err.message);

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

      clearErrors(fieldEl, errorEl);
    });

    formThings.errors = {};
    formSubmit.disabled = false;
  };

  formSubmit.addEventListener("click", formSubmitListener, false);

  formReset.addEventListener("click", formResetListener, false);

  return () => {
    formSubmit.removeEventListener("click", formSubmitListener, false);
    formReset.removeEventListener("click", formResetListener, false);

    Object.values(formThings.doms).forEach(v => {
      const { el, focusListener, inputListener } = v;
      el.removeEventListener("focus", focusListener, false);
      el.removeEventListener("input", inputListener, false);
      el.removeEventListener("blur", inputListener, false);
    });
  };
};
