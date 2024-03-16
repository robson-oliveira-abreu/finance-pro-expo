import { ExpenseModel } from "../../../../../../commons/models/Expense.model";
import { filterMonthExpenses } from "../../../../../../commons/utils/filterExpensesByMonth";

export function groupExpenses(_expenses: ExpenseModel[]) {
  const grouped = {
    paid: 0,
    payable: 0,
    overdue: 0,
  };

  const filterByMonth = filterMonthExpenses(new Date());

  _expenses.forEach((expense) => {
    if (!filterByMonth(expense)) return;

    if (expense.paid) {
      grouped.paid += expense.amount;
    } else if (new Date(expense.due_date) > new Date()) {
      grouped.payable += expense.amount;
    } else {
      grouped.overdue += expense.amount;
    }
  });

  return grouped;
}
