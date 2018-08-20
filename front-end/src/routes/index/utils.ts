import { SortingDirective } from "../../graphql/gen.types";
import { GetInitialSocketData_shifts } from "../../graphql/gen.types";
import { GetInitialSocketDataVariables } from "../../graphql/gen.types";
import { GetInitialSocketData } from "../../graphql/gen.types";
import { GetInitialSocketData_newShiftUrl } from "../../graphql/gen.types";
import { SHIFT_TYPENAME } from "./../../constants";
import { NEW_SHIFT_URL_TYPENAME } from "./../../constants";
import { Database } from "../../database";

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
    }
  };
};

export const writeInitialDataToDb = (
  database: Database,
  data: GetInitialSocketData
) => {
  const allShifts = (data.shifts || []) as GetInitialSocketData_shifts[];
  const newShiftUrl = data.newShiftUrl as GetInitialSocketData_newShiftUrl;

  if (allShifts.length) {
    database.db
      .find({
        selector: {
          schemaType: { $eq: SHIFT_TYPENAME }
        }
      })
      // tslint:disable-next-line:no-any
      .then((foundShifts: { docs: any }) => {
        if (
          foundShifts.docs &&
          foundShifts.docs.map &&
          foundShifts.docs.length
        ) {
          const ids = foundShifts.docs.map((s: GetInitialSocketData_shifts) => {
            return s.id;
          });

          const filteredAllShifts = allShifts.filter(s => !ids.includes(s.id));

          if (filteredAllShifts.length) {
            database.db.bulkDocs(filteredAllShifts);
          }
        } else {
          database.db.bulkDocs(allShifts);
        }

        return true;
      });
  }

  if (newShiftUrl) {
    database.db
      .find({
        selector: {
          schemaType: { $eq: NEW_SHIFT_URL_TYPENAME }
        }
      })
      // tslint:disable-next-line:no-any
      .then(({ docs }: { docs: any }) => {
        const newShiftUrls = docs as GetInitialSocketData_newShiftUrl[];

        // this is our first insert = happy
        if (!newShiftUrls.length) {
          database.db.put(newShiftUrl);
          return;
        }

        const newShiftUrlFromDoc = newShiftUrls[0];

        // we only care about the URL. If one exists with similar url, bail
        if (newShiftUrlFromDoc.url === newShiftUrl.url) {
          return;
        }

        // ok we have a new URL - update existing doc so we only have 1 copy
        database.db.get(newShiftUrlFromDoc._id).then(doc => {
          return database.db.put({
            ...newShiftUrl,
            _id: newShiftUrlFromDoc._id,
            _rev: doc._rev
          });
        });
      });
  }
};
