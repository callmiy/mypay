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

export const clearFieldErrors = (
  fieldEl: HTMLElement,
  errorEl: HTMLElement
) => {
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

interface FormThings {
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
