import React from "react";
import { FlatList } from "react-native";
import { ExpenseModel } from "../../models/Expense.model";
import { Spacer } from "../Spacer/Spacer";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";
import { Text } from "../UIComponents";

type ExpenseListProps = {
  data?: Array<ExpenseModel>;
  title?: string;
};

export function ExpenseList(props: ExpenseListProps) {
  const { data, title } = props;
  return (
    <>
      {Boolean(title) && (
        <Text variant="titleLarge" style={styles.title}>
          A pagar
        </Text>
      )}
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Spacer y={12} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
      />
    </>
  );
}
