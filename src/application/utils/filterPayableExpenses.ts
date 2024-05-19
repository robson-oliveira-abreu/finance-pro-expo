import { differenceInDays } from "date-fns";
import { Expense } from "@domain/entities/Expense";

export function filterPayableExpenses(expenses: Expense[]) {
  const currentDate = new Date();
  currentDate.setDate(1);

  return expenses?.filter(({ paid, due_date }) => {
    return !paid && differenceLessThanTrirtyDays(due_date, currentDate);
  });
}

function differenceLessThanTrirtyDays(dateLeft: Date, dateRight: Date) {
  return differenceInDays(new Date(dateLeft), new Date(dateRight)) < 30;
}
