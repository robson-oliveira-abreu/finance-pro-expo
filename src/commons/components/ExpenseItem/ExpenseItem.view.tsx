import React from "react";
import { View } from "react-native";
import { Badge, Surface, TouchableRipple } from "react-native-paper";
import { ExpenseModel } from "../../models/Expense.model";
import { Spacer } from "../Spacer/Spacer";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { currency } from "../../utils/currency";
import { getLocaleDate } from "../../utils/date";
import { Text } from "../UIComponents";
import { getStatus } from "./utils";
import { badgeStatus } from "./constants";

type ExpenseItemProps = {
  expense: ExpenseModel;
};

export function ExpenseItem(props: ExpenseItemProps) {
  const { expense } = props;
  const navigator = useNavigation();

  const openExpense = () => navigator.navigate("Expense", { expense: expense });

  const status = getStatus(expense);

  return (
    <TouchableRipple
      rippleColor="rgba(200,0,0,0.2)"
      onPress={openExpense}
      style={{ borderRadius: 12 }}
    >
      <Surface style={styles.container}>
        <View>
          <Text variant="titleMedium" style={styles.title}>
            {expense.description}
          </Text>

          {expense?.observation && <Text>{expense.observation}</Text>}

          <Text>
            {expense.installment}/{expense.installments}
          </Text>
          <Text>{expense?.due_date && getLocaleDate(expense.due_date)}</Text>
        </View>

        <View>
          <Badge style={badgeStatus[status].style}>
            {badgeStatus[status].text}
          </Badge>

          <Spacer flex={1} />

          <Text
            style={[
              expense.paid ? styles.amount_paid : styles.amount_unpaid,
              styles.amount,
            ]}
            variant="titleMedium"
          >
            {currency(expense?.amount)}
          </Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
}
