import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

class Database {
  db = new PouchDB("WORKER-WAGES-maneptha");

  constructor() {
    this.db.createIndex({
      index: { fields: ["typename__"] }
    });
  }

  genId = () => new Date().toJSON().slice(0, -1) + "000Z";
}

const db = new Database();

export const getDb = () => db;
