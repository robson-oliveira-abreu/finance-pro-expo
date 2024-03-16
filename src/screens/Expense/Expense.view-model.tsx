import { ExpenseModel } from "./Expense.model";
import { ExpenseView } from "./Expense.view";

export function ExpenseViewModel() {
  const { expense, goBack, payExpense, removeExpense } = ExpenseModel();

  return (
    <ExpenseView
      expense={expense}
      goBack={goBack}
      payExpense={payExpense}
      removeExpense={removeExpense}
    />
  );
}
