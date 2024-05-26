import { ExpenseController } from "@application/controllers/ExpenseController";
import { ExpenseView } from "./Expense.view";

function Expense() {
  const expenseController = ExpenseController();

  return <ExpenseView {...expenseController} />;
}

export { Expense };
