import { GetInitialSocketData_shifts } from "./graphql/gen.types";
import { GetInitialSocketData_newShiftUrl } from "./graphql/gen.types";

export const CSRF_TOKEN_NAME = "_csrf_token";
export const SHIFT_TYPENAME = "Shift";
export const NEW_SHIFT_URL_TYPENAME = "NewShiftUrl";
export const OFFLINE_TOKEN_TYPENAME = "OfflineToken";
export const DATA_CHANNEL_TOPIC_GRAPHQL = "graphql";
export const META_TYPENAME = "Meta";

export type InitialShiftFromDb = PouchDB.Core.ExistingDocument<
  GetInitialSocketData_shifts
>;

export type InitialUrlFromDb = PouchDB.Core.ExistingDocument<
  GetInitialSocketData_newShiftUrl
>;
