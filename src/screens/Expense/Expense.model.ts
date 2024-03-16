import { useNavigation, useRoute } from "@react-navigation/native";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { ExpenseModel as Expense } from "../../commons/models/Expense.model";
import { useState } from "react";
import { ExpenseModel as TExpenseModel } from "./common/types";

export function ExpenseModel(): TExpenseModel {
  const expenses = useExpenses();
  const navigator = useNavigation();
  const route = useRoute();
  const params = route.params as { expense?: Expense }; // TODO tipar
  const [expense, setExpense] = useState<Expense | undefined>(params.expense);

  const payExpense = async () => {
    if (!expense || !expenses) return;

    const paidExpense: Expense = { ...expense, paid: true };

    await expenses.setExpense(paidExpense);

    setExpense(paidExpense);
  };

  const removeExpense = () => {
    if (!expense) {
      return;
    }

    expenses?.removeExpense(expense.id);
    goBack();
  };

  const goBack = () => {
    navigator.goBack();
  };

  return {
    payExpense,
    removeExpense,
    goBack,
    expense,
  };
}
