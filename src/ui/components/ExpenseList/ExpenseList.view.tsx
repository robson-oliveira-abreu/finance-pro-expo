import React from "react";
import { FlatList, View } from "react-native";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { ExpenseItem } from "@ui/components/ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";
import { Text } from "@ui/components/UIComponents";
import { Loading } from "@ui/components/UIComponents/Loading/Loading";
import { Expense } from "@core/entities/Expense";

export type ExpenseListProps = {
  data?: Array<Expense>;
  title?: string;
  HeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  loading?: boolean;
};

export function ExpenseList(props: ExpenseListProps) {
  const { data, HeaderComponent, title, loading } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={!loading ? data : []}
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
        keyExtractor={(item) => item?.id!}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={loading ? <Loading /> : <></>}
      />
    </View>
  );
}
