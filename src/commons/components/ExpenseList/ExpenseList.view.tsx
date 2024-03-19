import React from "react";
import { FlatList } from "react-native";
import { ExpenseModel } from "../../models/Expense.model";
import { Spacer } from "../Spacer/Spacer";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";

export type ExpenseListProps = {
  data?: Array<ExpenseModel>;
  HeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export function ExpenseList(props: ExpenseListProps) {
  const { data, HeaderComponent } = props;
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.list}
      ListHeaderComponent={HeaderComponent}
      ItemSeparatorComponent={() => <Spacer y={12} />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      showsVerticalScrollIndicator={false}
    />
  );
}
