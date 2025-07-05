import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

import { Reservationstatus } from "../types";

export const useReservationsFilters = () => {
  return useQueryStates({
    CourseId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(Reservationstatus)),
  });
};
