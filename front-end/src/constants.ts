import { GetInitialSocketData_shifts } from "./graphql/gen.types";
import { GetInitialSocketData_newShiftUrl } from "./graphql/gen.types";

export const CSRF_TOKEN_NAME = "_csrf_token";
export const SHIFT_TYPENAME = "Shift";
export const NEW_SHIFT_URL_TYPENAME = "NewShiftUrl";
export const OFFLINE_TOKEN_TYPENAME = "OfflineToken";
export const DATA_CHANNEL_TOPIC_GRAPHQL = "graphql";
export const META_TYPENAME = "Meta";
export const OFFLINE_INSERT_TYPENAME = "OfflineInsert";
export const DB_INDEX_SCHEMA_TYPE_NAME = "schemaType";
export const DB_INDEX_OFFLINE_INSERT_TYPENAME = "offlineInsertIndex";
export const OFFLINE_MSG = "You appear to be offline 😞😞";
export const OFFLINE_ID_KEY = "offline_id";
export const DATA_SYNC_IDS_KEY = "data_sync_clients";
export const INDEX_ROUTE_DATA_SYNC_ID = "index-route";
// export const SHIFT_ROUTE_DATA_SYNC_ID = 'shift-route'

export const DATA_SYNC_IDS = [INDEX_ROUTE_DATA_SYNC_ID];

export type InitialShiftFromDb = PouchDB.Core.ExistingDocument<
  GetInitialSocketData_shifts
>;

export type InitialUrlFromDb = PouchDB.Core.ExistingDocument<
  GetInitialSocketData_newShiftUrl
>;

// tslint:disable-next-line:no-any
export type OfflineDataFromDb = Array<PouchDB.Core.ExistingDocument<any>>;

export const getDataClientChannelName = (id: string) => `data:client:${id}`;
