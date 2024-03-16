import { ExpenseModel } from "./Expense.model";
import { ExpenseView } from "./Expense.view";

export function ExpenseViewModel() {
  const { expense, payExpense, removeExpense } = ExpenseModel();

  return (
    <ExpenseView
      expense={expense}
      payExpense={payExpense}
      removeExpense={removeExpense}
    />
  );
}
