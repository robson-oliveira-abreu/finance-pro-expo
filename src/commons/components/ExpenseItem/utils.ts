import { ExpenseModel } from "../../models/Expense.model";

export function getStatus(expense: ExpenseModel) {
  return expense.paid
    ? "paid"
    : expense.due_date > new Date()
    ? "unpaid"
    : "overdue";
}
