import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { getLocaleDate } from "@application/utils/date";
import { Text } from "@ui/components/UIComponents";
import { getStatus } from "./utils";
import { badgeStatus } from "./constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@infra/routes/Stack.routes";
import { useCurrency } from "@application/Hooks/useCurrency/useCurrency.hook";
import { Expense } from "@domain/entities/Expense";
import { useTheme } from "@application/Hooks/useTheme";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const status = getStatus(expense);
  const currency = useCurrency();
  const { isDark } = useTheme();

  const openExpense = (expense: Expense) => {
    navigation.navigate("Expense", { expense });
  };

  console.log({ expense });

  return (
    <TouchableOpacity onPress={() => openExpense(expense)}>
      <View
        className={`flex m-0 p-0 flex-row justify-between px-4 py-2 rounded-xl  ${isDark(
          "bg-dark-backgroundSecondary",
          "bg-backgroundSecondary"
        )}`}
      >
        <View>
          <Text variant="titleMedium">{expense.description}</Text>

          {Boolean(expense?.observation) && <Text>{expense.observation}</Text>}

          <Text variant="bodySmall">
            {expense.installment}/{expense.installments}
          </Text>
          <Text variant="bodySmall">
            {expense?.due_date && getLocaleDate(expense.due_date)}
          </Text>
        </View>

        <View>
          <View
            className={`justify-center items-center px-1 rounded-lg ${badgeStatus[status].bgColor}`}
          >
            <Text color={"#FFFFFF"} variant="bodySmall">
              {badgeStatus[status].text}
            </Text>
          </View>

          <Spacer flex={1} />

          <Text
            className={`font-bold text-right ${
              expense.paid ? "text-success" : "text-danger"
            }`}
            variant="titleMedium"
          >
            {currency.parse(expense?.amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
