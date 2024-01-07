import { useNavigation, useRoute } from "@react-navigation/native";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { ExpenseModel } from "../../commons/models/Expense.model";
import { ExpenseScreenService } from "./Expense.service";
import { useState } from "react";

export function useExpenseController() {
  const expenses = useExpenses();
  const navigator = useNavigation();
  const route = useRoute();
  const params = route.params as { expense?: ExpenseModel };
  const [expense, setExpense] = useState<ExpenseModel | undefined>(
    params.expense
  );
  const expenseScreenService = new ExpenseScreenService();

  const payExpense = async () => {
    if (!expense || !expenses) return;

    const paidExpense: ExpenseModel = await expenseScreenService.payExpense(
      expense,
      expenses
    );
    setExpense(paidExpense);
  };

  const removeExpense = () => {
    if (expense && expenses)
      expenseScreenService.removeExpense(expense, expenses, navigator);
  };
  const goBack = () => navigator.goBack();

  return {
    payExpense,
    removeExpense,
    goBack,
    expense,
  };
}
