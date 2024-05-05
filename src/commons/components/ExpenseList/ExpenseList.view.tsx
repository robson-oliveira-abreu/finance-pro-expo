import React from "react";
import { FlatList, View } from "react-native";
import { ExpenseModel } from "../../models/Expense.model";
import { Spacer } from "../Spacer/Spacer";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";
import { Text } from "../UIComponents";

export type ExpenseListProps = {
  data?: Array<ExpenseModel>;
  title?: string;
  HeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export function ExpenseList(props: ExpenseListProps) {
  const { data, HeaderComponent, title } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={[
          Boolean(data && data.length > 0) && styles.list,
        ]}
        ListHeaderComponent={
          <>
            {HeaderComponent}
            {Boolean(title) && (
              <Text variant="titleSmall" style={styles.title}>
                {title}
              </Text>
            )}
          </>
        }
        ItemSeparatorComponent={() => <Spacer y={12} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
