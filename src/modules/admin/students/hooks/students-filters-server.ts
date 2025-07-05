import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const studentsFilters = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
};
export const loadStudentsSearchParams = createLoader(studentsFilters);
