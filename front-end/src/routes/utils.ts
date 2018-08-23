import isEqual from "lodash/isEqual";

import { SortingDirective } from "../graphql/gen.types";
import { GetInitialSocketData_shifts } from "../graphql/gen.types";
import { GetInitialSocketDataVariables } from "../graphql/gen.types";
import { GetInitialSocketData } from "../graphql/gen.types";
import { GetInitialSocketData_newShiftUrl } from "../graphql/gen.types";
import { GetInitialSocketData_metas } from "../graphql/gen.types";
import { SHIFT_TYPENAME } from "../constants";
import { NEW_SHIFT_URL_TYPENAME } from "../constants";
import { DB_INDEX_OFFLINE_INSERT_TYPENAME } from "../constants";
import { DB_INDEX_SCHEMA_TYPE_NAME } from "../constants";
import { META_TYPENAME } from "../constants";
import { OFFLINE_ID_KEY } from "../constants";
import { Database } from "../database";

export const getShiftsQueryVairable = (): GetInitialSocketDataVariables => {
  const today = new Date();
  return {
    shift: {
      where: {
        year: today.getFullYear(),
        month: today.getMonth() + 1
      },

      orderBy: {
        date: SortingDirective.DESC
      }
    },

    getMetasInput: {
      orderBy: {
        id: SortingDirective.DESC
      }
    }
  };
};

export const writeInitialShiftsDataToDb = (
  database: Database,
  allShifts: GetInitialSocketData_shifts[]
) => {
  if (!(allShifts && allShifts.length)) {
    return;
  }

  const allNetworkShiftsMap = allShifts.reduce(
    (acc, s) => ({ ...acc, [s.id]: s }),
    {}
  ) as { [k: string]: GetInitialSocketData_shifts };

  const allShiftsIdsInDb = [] as string[];

  database.db
    .find({
      selector: {
        schemaType: { $eq: SHIFT_TYPENAME }
      }
    })
    .then(
      ({
        docs
      }: {
        docs: Array<PouchDB.Core.ExistingDocument<GetInitialSocketData_shifts>>;
      }) => {
        const shiftsFromDbToUpdate = docs
          .map(d => {
            allShiftsIdsInDb.push(d.id);
            const shiftFromNetworkAlreadyInDb = allNetworkShiftsMap[d.id];

            return shiftFromNetworkAlreadyInDb &&
              !isEqual(
                { ...shiftFromNetworkAlreadyInDb, _id: null, _rev: null },
                { ...d, _id: null, _rev: null }
              )
              ? { ...shiftFromNetworkAlreadyInDb, _id: d._id, _rev: d._rev }
              : null;
          })
          .filter(db => !!db);

        const shiftsToInsertAndUpdate = [
          ...allShifts.filter(s => !allShiftsIdsInDb.includes(s.id)),
          ...shiftsFromDbToUpdate
        ] as GetInitialSocketData_shifts[];

        if (shiftsToInsertAndUpdate.length) {
          database.db.bulkDocs(shiftsToInsertAndUpdate);
        }
      }
    );
};

const writeInitialUrlDataToDb = (
  database: Database,
  newShiftUrl: GetInitialSocketData_newShiftUrl
) => {
  if (!newShiftUrl) {
    return;
  }

  database.db
    .find({
      selector: {
        schemaType: { $eq: NEW_SHIFT_URL_TYPENAME }
      }
    })

    .then(
      ({
        docs
      }: {
        docs: Array<
          PouchDB.Core.ExistingDocument<GetInitialSocketData_newShiftUrl>
        >;
      }) => {
        // this is our first insert = happy
        if (!docs.length) {
          database.db.put(newShiftUrl);
          return;
        }

        const { url, _id } = docs[0];

        // we only care about the URL. If one exists with similar url, bail
        if (url === newShiftUrl.url) {
          return;
        }

        // ok we have a new URL - update existing doc so we only have 1 copy???
        // Actually pouchdb creates a revision tree just like GIT
        database.db.get(_id).then(doc => {
          return database.db.put({
            ...newShiftUrl,
            _id: doc._id,
            _rev: doc._rev
          });
        });
      }
    );
};

export const writeInitialMetasDataToDb = (
  database: Database,
  metas: GetInitialSocketData_metas[]
) => {
  if (!(metas && metas.length)) {
    return;
  }

  const metasFromNetworkMap = metas.reduce(
    (acc, m) => ({ ...acc, [m.id]: m }),
    {}
  ) as { [key: string]: GetInitialSocketData_metas };

  const metasIdsFromDb = [] as string[];

  return database.db
    .find({
      selector: {
        schemaType: META_TYPENAME
      }
    })
    .then(
      ({
        docs
      }: {
        docs: Array<PouchDB.Core.ExistingDocument<GetInitialSocketData_metas>>;
      }) => {
        const metasToUpdate = docs
          .map(db => {
            metasIdsFromDb.push(db.id);
            const metaFromNetwork = metasFromNetworkMap[db.id];

            if (metaFromNetwork) {
              const shouldUpdate = !isEqual(
                { ...db, _id: null, _rev: null },
                { ...metaFromNetwork, _id: null, _rev: null }
              );

              return shouldUpdate
                ? { ...metaFromNetwork, _id: db._id, _rev: db._rev }
                : null;
            }

            return null;
          })
          .filter(db => !!db);

        const metasToSave = [
          ...metasToUpdate,
          ...metas.filter(m => !metasIdsFromDb.includes(m.id))
        ] as GetInitialSocketData_metas[];

        if (metasToSave.length) {
          database.db.bulkDocs(metasToSave);
        }
      }
    );
};

export const writeInitialDataToDb = (
  database: Database,
  data: GetInitialSocketData
) => {
  const allShifts = (data.shifts || []) as GetInitialSocketData_shifts[];
  const newShiftUrl = data.newShiftUrl as GetInitialSocketData_newShiftUrl;
  const metas = data.metas as GetInitialSocketData_metas[];

  writeInitialShiftsDataToDb(database, allShifts);
  writeInitialUrlDataToDb(database, newShiftUrl);
  writeInitialMetasDataToDb(database, metas);
};

export const camelize = (val: string) => {
  const splitted = val.split("_").filter(s => !!s);

  if (!splitted.length || splitted.length === 1) {
    return val;
  }

  return (
    splitted[0] +
    splitted
      .slice(1)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
  );
};

// tslint:disable-next-line:no-any
export const shiftFromOffline = (shift: any) => {
  shift.rev = shift._rev;
  shift[OFFLINE_ID_KEY] = shift._id;

  [
    "hoursGross",
    "normalHours",
    "normalPay",
    "nightHours",
    "nightSupplPay",
    "sundayHours",
    "sundaySupplPay",
    "totalPay",
    "meta",
    "_id",
    "_rev",
    DB_INDEX_OFFLINE_INSERT_TYPENAME,
    DB_INDEX_SCHEMA_TYPE_NAME
  ].forEach(s => delete shift[s]);

  return shift;
};
