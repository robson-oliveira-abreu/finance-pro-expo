import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { styles } from "./styles";
import { getLocaleDate } from "@infra/utils/date";
import { Text } from "@ui/components/UIComponents";
import { getStatus } from "./utils";
import { badgeStatus } from "./constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@ui/routes/Stack.routes";
import { useCurrency } from "@infra/Hooks/useCurrency/useCurrency.hook";
import { Expense } from "@core/entities/Expense";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const status = getStatus(expense);
  const currency = useCurrency();

  const openExpense = (expense: Expense) => {
    navigation.navigate("Expense", { expense });
  };

  return (
    <TouchableOpacity
      onPress={() => openExpense(expense)}
      style={{ borderRadius: 12, marginHorizontal: 20 }}
    >
      <View style={styles.container}>
        <View>
          <Text variant="titleMedium" style={styles.title}>
            {expense.description}
          </Text>

          {Boolean(expense?.observation) && <Text>{expense.observation}</Text>}

          <Text variant="bodySmall">
            {expense.installment}/{expense.installments}
          </Text>
          <Text variant="bodySmall">
            {expense?.due_date && getLocaleDate(expense.due_date)}
          </Text>
        </View>

        <View>
          <View style={badgeStatus[status].style}>
            <Text color={"#FFFFFF"} variant="bodySmall">
              {badgeStatus[status].text}
            </Text>
          </View>

          <Spacer flex={1} />

          <Text
            style={[
              expense.paid ? styles.amount_paid : styles.amount_unpaid,
              styles.amount,
            ]}
            variant="titleMedium"
          >
            {currency.parse(expense?.amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
