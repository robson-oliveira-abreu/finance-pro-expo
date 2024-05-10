import { differenceInDays } from "date-fns";
import { ExpenseModel } from "../../core/entities/Expense.entity";

export function filterPayableExpenses(expenses: ExpenseModel[]) {
  const currentDate = new Date();
  currentDate.setDate(1);

  return expenses.filter(({ paid, due_date }) => {
    return !paid && differenceLessThanTrirtyDays(due_date, currentDate);
  });
}

function differenceLessThanTrirtyDays(dateLeft: Date, dateRight: Date) {
  return differenceInDays(new Date(dateLeft), new Date(dateRight)) < 30;
}
