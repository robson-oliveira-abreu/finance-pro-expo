import { useNavigation, useRoute } from "@react-navigation/native";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { ExpenseModel } from "../../models/Expense.model";
import { ExpenseScreenService } from "./Expense.service";

export function useExpenseController() {
  const expenses = useExpenses();
  const navigator = useNavigation();
  const { params } = useRoute();
  const { expense } = params as { expense?: ExpenseModel };

  const payExpense = () => ExpenseScreenService.payExpense(expense, expenses);

  const removeExpense = () =>
    ExpenseScreenService.removeExpense(expense, expenses, navigator);

  return {
    payExpense,
    removeExpense,
    expense,
    navigator,
  };
}
