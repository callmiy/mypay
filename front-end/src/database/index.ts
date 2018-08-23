import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";
import PouchdbDebug from "pouchdb-debug";

import { GetInitialSocketData_shifts } from "../graphql/gen.types";
import { GetInitialSocketData_newShiftUrl } from "../graphql/gen.types";
import { GetInitialSocketData_offlineToken } from "../graphql/gen.types";
import { GetInitialSocketData_metas } from "../graphql/gen.types";
import { DB_INDEX_SCHEMA_TYPE_NAME } from "../constants";
import { DB_INDEX_OFFLINE_INSERT_TYPENAME } from "../constants";
import { OFFLINE_INSERT_TYPENAME } from "../constants";

type DatabaseContent =
  | GetInitialSocketData_shifts
  | GetInitialSocketData_newShiftUrl
  | GetInitialSocketData_offlineToken
  | GetInitialSocketData_metas;

const POUCH_DB_OLD_VERSION = 1;
const POUCH_DB_CURRENT_VERSION = 2;

export class Database {
  db: PouchDB.Database<DatabaseContent>;
  private name: string;

  constructor() {
    this.destroyOldDb();
    this.name = this.getDbName(POUCH_DB_CURRENT_VERSION);
    this.db = new PouchDB(this.name);
    PouchDB.plugin(PouchDBFind);
    PouchDB.plugin(PouchdbDebug);

    this.db.createIndex({
      index: {
        fields: [DB_INDEX_SCHEMA_TYPE_NAME, DB_INDEX_OFFLINE_INSERT_TYPENAME]
      }
    });

    this.onStart();
  }

  destroyOldDb = async () => {
    const dbName = this.getDbName(POUCH_DB_OLD_VERSION);

    try {
      await new PouchDB(dbName).destroy();
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log("Error destroying PouchDb instance: ", dbName);
    }
  };

  async onStart() {
    const info = await this.db.info();
    // tslint:disable-next-line:no-console
    console.log(
      `Pouchdb info for "${this.name}":\n`,
      JSON.stringify(info, null, 2)
    );
  }

  getDbName = (version: number) => "WORKER-WAGES-maneptha-" + version;
}

const genId = () =>
  new Date().toJSON().slice(0, -1) +
  (Math.floor(Math.random() * 1000000) + "").slice(0, 3) +
  "Z";

export const prepForOfflineSave = (
  // tslint:disable-next-line:no-any
  data: any,
  typeName: string
) => {
  const _id = genId();

  return {
    ...data,
    [DB_INDEX_SCHEMA_TYPE_NAME]: typeName,
    [DB_INDEX_OFFLINE_INSERT_TYPENAME]: OFFLINE_INSERT_TYPENAME,
    _id
  };
};

export default Database;
