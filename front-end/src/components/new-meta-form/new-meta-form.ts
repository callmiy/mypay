import { CSRF_TOKEN_NAME } from "../../constants";

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

const prefixName = (name: string) => {
  return `meta[${name}]`;
};

export const processNewMetaForm = () => {
  const form = document.getElementById("new-meta-form") as HTMLFormElement;
  const formSubmit = document.getElementById("new-meta-form-submit");

  if (!(form && formSubmit)) {
    return;
  }

  formSubmit.addEventListener(
    "mousemove",
    async () => {
      // tslint:disable-next-line:no-any
      const formElements = form.elements as any;

      const data = {
        [CSRF_TOKEN_NAME]: formElements[CSRF_TOKEN_NAME].value,
        meta: {}
      } as NewMetaFormData;

      Object.keys(FormElementsName)
        // tslint:disable-next-line:no-any
        .map((key: any) => FormElementsName[key])
        .map(name => {
          data.meta[name] = formElements[prefixName(name)].value;
        });

      // tslint:disable-next-line:no-console
      console.log(
        `


        logging starts


        data`,
        data,
        `

        logging ends


        `
      );
    },
    false
  );
};
