import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useCoursesFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  });
};
