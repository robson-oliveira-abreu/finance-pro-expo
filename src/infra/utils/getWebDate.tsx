import { WebDate } from "@ui/screens/ExpenseModal/common/types";

export function getWebDate(date?: WebDate): Date | undefined {
  if (!date?.day || !date?.month || !date?.year) {
    return undefined;
  }

  const web_date = new Date();
  const day = Number(String(date.day).padStart(2, "0"));
  const month = Number(String(date.month - 1).padStart(2, "0"));
  const year = Number(String(date.year).padStart(4, "20"));

  web_date.setDate(day);
  web_date.setMonth(month);
  web_date.setFullYear(year);

  return web_date;
}
