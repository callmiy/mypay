import { JsonResponseNewMetaForm } from "./routes/shift/shift";

export default interface AppInterface {
  newMetaFormUrl?: string;
  newMetaFormCssLink?: string;
  bodyModalInsertEl?: HTMLElement;
  newMetaFormData?: JsonResponseNewMetaForm;
}
