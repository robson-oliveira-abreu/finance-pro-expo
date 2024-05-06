import { useCurrency } from "../../commons/Hooks/useCurrency.hook";
import { ExpenseView } from "./Expense.view";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { ExpenseModel as Expense } from "../../commons/entities/Expense.entity";
import { useState } from "react";
import { RootStackParamList } from "../../infra/routes/Stack.routes";

export function ExpenseViewModel() {
  const currency = useCurrency();
  const expenses = useExpenses();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const [expense, setExpense] = useState(route.params?.expense);
  const [openEditExpense, setOpenEditExpense] = useState(false);

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

  const handleOpenEditExpense = () => {
    setOpenEditExpense((state) => !state);
  };

  const goBack = () => {
    navigator.goBack();
  };

  return (
    <ExpenseView
      expense={expense}
      payExpense={payExpense}
      removeExpense={removeExpense}
      handleOpenEditExpense={handleOpenEditExpense}
      openEditExpense={openEditExpense}
      currency={currency}
    />
  );
}
