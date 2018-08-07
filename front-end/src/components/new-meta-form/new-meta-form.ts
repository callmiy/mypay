import * as Yup from "yup";

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

export const processNewMetaForm = () => {
  const form = document.getElementById("new-meta-form") as HTMLFormElement;
  const formSubmit = document.getElementById("new-meta-form-submit");

  if (!(form && formSubmit)) {
    return;
  }

  formSubmit.addEventListener(
    "click",
    async () => {
      // tslint:disable-next-line:no-any
      const formElements = form.elements as any;

      const data = {} as NewMetaFormData;

      Object.keys(FormElementsName)
        // tslint:disable-next-line:no-any
        .map((key: any) => FormElementsName[key])
        .map(name => {
          data[name] = formElements[name].value;
        });

      schema.validate(data, { abortEarly: false }).catch(errors => {
        // tslint:disable-next-line:no-console
        console.log(
          `


        logging starts


        errors`,
          errors.inner,
          `

        logging ends


        `
        );
      });
    },
    false
  );
};
