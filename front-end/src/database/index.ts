import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";
import PouchdbDebug from "pouchdb-debug";

const POUCH_DB_OLD_VERSION = 1;
const POUCH_DB_CURRENT_VERSION = 2;

export class Database {
  db: PouchDB.Database;
  private name: string;

  constructor() {
    this.destroyOldDb();
    this.name = this.getDbName(POUCH_DB_CURRENT_VERSION);
    this.db = new PouchDB(this.name);
    PouchDB.plugin(PouchDBFind);
    PouchDB.plugin(PouchdbDebug);

    this.db.createIndex({
      index: { fields: ["schemaType"] }
    });

    this.onStart();
  }

  genId = () => new Date().toJSON().slice(0, -1) + "000Z";

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

export default Database;
