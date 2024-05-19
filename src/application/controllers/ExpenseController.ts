import { useCurrency } from "src/application/Hooks/useCurrency/useCurrency.hook";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useExpenses } from "src/application/Hooks/useExpenses/useExpenses.hook";
import { useState } from "react";
import { RootStackParamList } from "@infra/routes/Stack.routes";

export function ExpenseController() {
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

    await expenseList.update(expense.pay());
  };

  const removeExpense = async () => {
    if (!expense?.id) {
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

  return {
    expense,
    payExpense,
    removeExpense,
    handleOpenEditExpense,
    openEditExpense,
    currency,
  };
}
