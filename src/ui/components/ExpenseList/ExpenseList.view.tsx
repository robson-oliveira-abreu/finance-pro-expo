import React from "react";
import { FlatList, View } from "react-native";
import { ExpenseItem } from "@ui/components/ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";
import { Text } from "@ui/components/UIComponents";
import { Loading } from "@ui/components/UIComponents/Loading/Loading";
import { Expense } from "@domain/entities/Expense";
import { useTheme } from "@/application/Hooks/useTheme";

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
  const { isDark } = useTheme();

  return (
    <View className={`flex-1 ${isDark("bg-dark-background", "bg-background")}`}>
      <FlatList
        data={!loading ? data : []}
        contentContainerStyle={[
          Boolean(data && data.length > 0) && styles.list,
        ]}
        ListHeaderComponent={
          <>
            {HeaderComponent}
            {Boolean(title) && (
              <Text
                variant="titleSmall"
                className="w-full text-left px-6 pt-1 pb-2"
              >
                {title}
              </Text>
            )}
          </>
        }
        ItemSeparatorComponent={() => <View className="h-3" />}
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
