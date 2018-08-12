import { ValidationError } from "yup";

export interface FormDOM {
  el: HTMLInputElement;
  fieldEl: HTMLElement | null;
  errorEl: HTMLElement | null;
  focusListener: (evt: InputEvent) => void;
  inputListener: (evt: InputEvent) => void;
}

export const setFieldError = (
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

export const clearFieldErrors = ({
  fieldEl,
  errorEl
}: Pick<FormDOM, "fieldEl" | "errorEl">) => {
  if (!(fieldEl && errorEl)) {
    return;
  }

  fieldEl.classList.remove("error");
  errorEl.classList.remove("error");
  errorEl.classList.add("hidden");
};

export const setMainErrorClass = (
  mainErrorContainer: HTMLElement,
  status: "show" | "hide"
) => {
  mainErrorContainer.classList[status === "show" ? "remove" : "add"]("hidden");
};

interface FormThingsError {
  [key: string]: ValidationError | undefined;
}

export interface FormThings {
  doms: { [key: string]: FormDOM };
  errors: FormThingsError;
}

export const makeFormThings = () =>
  ({
    doms: {},
    errors: {}
  } as FormThings);

export const formHasErrors = (errors: FormThingsError) => {
  return Object.values(errors).filter(e => e !== undefined).length;
};

export const getFieldAndErrorEls = (el: HTMLElement) => {
  const fieldEl = el.closest(".form__field") as HTMLElement;

  const elParent = el.parentElement as HTMLElement;

  let errorEl = elParent.querySelector(".form__error") as HTMLElement;

  if (!errorEl) {
    errorEl = (fieldEl
      ? fieldEl.querySelector(".form__error")
      : null) as HTMLElement;
  }

  return { fieldEl, errorEl };
};
