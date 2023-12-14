import React from "react";
import { View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { ExpenseModel } from "../../../../models/Expense.model";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { currency } from "../../../../commons/currency";
import { getLocaleDate } from "../../../../commons/date";

type ExpenseItemProps = {
  expense: ExpenseModel;
};

export function ExpenseItem(props: ExpenseItemProps) {
  const navigator = useNavigation();

  const openExpense = () =>
    navigator.navigate("Expense", { expense: props.expense });

  return (
    <TouchableRipple
      rippleColor="rgba(200,0,0,0.2)"
      onPress={openExpense}
      style={{ borderRadius: 12 }}
    >
      <Surface style={styles.container}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {props.expense.description}
          </Text>
          <Text
            style={[
              props.expense.paid ? styles.amount_paid : styles.amount_unpaid,
              styles.amount,
            ]}
          >
            {currency(props.expense?.amount)}
          </Text>
        </View>

        {props.expense?.observation && <Text>{props.expense.observation}</Text>}

        <View style={{ flexDirection: "row" }}>
          <Text>
            {props.expense.installment}/{props.expense.installments}
          </Text>

          <Spacer flex={1} />

          <Text>
            {props.expense?.due_date && getLocaleDate(props.expense.due_date)}
          </Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
}
