import { Expense } from "@core/entities/Expense";

export function getStatus(expense: Expense) {
  return expense.paid
    ? "paid"
    : expense.due_date > new Date()
    ? "unpaid"
    : "overdue";
}
