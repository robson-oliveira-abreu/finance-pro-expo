import { addMonths, subMonths } from "date-fns";

export function getMonths(): Date[] {
  const currentDate = new Date();
  const months: Date[] = new Array(12).fill(addMonths(currentDate, 9));
  return months.map(subMonths);
}
