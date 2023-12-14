import { WebDate } from "../screens/Expenses/components/AddExpenseModal/types";

export function getWebDate(date: WebDate): Date {
  if (!date?.day || !date?.month || !date?.year) {
    return undefined;
  }

  const web_date = new Date();

  web_date.setDate(date.day);
  web_date.setMonth(date.month - 1);
  web_date.setFullYear(date.year);

  return web_date;
}
