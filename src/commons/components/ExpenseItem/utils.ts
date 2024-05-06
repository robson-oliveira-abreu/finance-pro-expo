import { ExpenseModel } from "../../entities/Expense.entity";

export function getStatus(expense: ExpenseModel) {
  return expense.paid
    ? "paid"
    : expense.due_date > new Date()
    ? "unpaid"
    : "overdue";
}
