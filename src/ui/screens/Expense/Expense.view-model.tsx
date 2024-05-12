import { useCurrency } from "@infra/Hooks/useCurrency/useCurrency.hook";
import { ExpenseView } from "./Expense.view";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useExpenses } from "@infra/Hooks/useExpenses/useExpenses.hook";
import { useState } from "react";
import { RootStackParamList } from "@ui/routes/Stack.routes";

export function ExpenseViewModel() {
  const currency = useCurrency();
  const expenseList = useExpenses();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();

  const [openEditExpense, setOpenEditExpense] = useState(false);

  const expenseId = route?.params?.expense?.id;

  const expense = expenseId
    ? expenseList.expenses.find((item) => item.id === expenseId)
    : null;

  const payExpense = async () => {
    if (!expenseId || !expense) return;

    await expenseList.update(expenseId, expense.pay());
  };

  const removeExpense = async () => {
    if (!expense) {
      return;
    }

    await expenseList.delete(expense.id);

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
