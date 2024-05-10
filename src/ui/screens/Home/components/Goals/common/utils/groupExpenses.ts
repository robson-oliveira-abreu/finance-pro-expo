import { ExpenseModel } from "../../../../../../../core/entities/Expense.entity";
import { filterMonthExpenses } from "../../../../../../../infra/utils/filterExpensesByMonth";

export function groupExpenses(_expenses: ExpenseModel[]) {
  const grouped = {
    paid: 0,
    payable: 0,
    overdue: 0,
    total: 0,
  };

  const filterByMonth = filterMonthExpenses(new Date());

  _expenses.forEach((expense) => {
    if (!filterByMonth(expense)) return;

    grouped.total += expense.amount;

    if (expense.paid) {
      return (grouped.paid += expense.amount);
    }

    if (new Date(expense.due_date) < new Date()) {
      grouped.overdue += expense.amount;
    }

    grouped.payable += expense.amount;
  });

  return grouped;
}
