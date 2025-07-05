import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { Reservationstatus } from "../types";

export const reservationsFilterSearchParams = {
  CourseId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(Reservationstatus)),
};
export const loadreservationsSearchParams = createLoader(
  reservationsFilterSearchParams
);
