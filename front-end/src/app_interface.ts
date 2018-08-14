import { JsonResponseNewMetaForm } from "./routes/shift/shift";

export default interface AppInterface {
  newMetaFormData?: JsonResponseNewMetaForm;
  serverOnlineStatus: boolean;
}
