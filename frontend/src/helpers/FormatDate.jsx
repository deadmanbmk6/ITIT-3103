import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

export function formatDate(data) {
  const [year, month, day] = data.substr(0, 10).split("-");
  return format(new Date(year, month - 1, day), "LLL, do yyyy");
}

export const formatDateForTheForm = (date) => {
  const [year, month, day] = date.substr(0, 10).split("-");
  return format(new Date(year, month - 1, day), "yyyy-MM-dd");
};
