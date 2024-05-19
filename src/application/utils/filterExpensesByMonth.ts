import { Expense } from "@domain/entities/Expense";

export function filterMonthExpenses(selectedMonth: Date) {
  return function (expense: Expense) {
    if (!expense?.due_date) return;

    const date = new Date(expense?.due_date);
    const equalYear = date?.getFullYear() === selectedMonth?.getFullYear();
    const equalMonth = date?.getMonth() === selectedMonth?.getMonth();

    return equalYear && equalMonth;
  };
}
