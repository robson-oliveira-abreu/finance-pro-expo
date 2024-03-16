import { ExpenseModel } from "../models/Expense.model";

export function filterMonthExpenses(selectedMonth: Date) {
  return function (expense: ExpenseModel) {
    if (!expense?.due_date) return;

    const date = new Date(expense?.due_date);
    const equalYear = date?.getFullYear() === selectedMonth?.getFullYear();
    const equalMonth = date?.getMonth() === selectedMonth?.getMonth();

    return equalYear && equalMonth;
  };
}
