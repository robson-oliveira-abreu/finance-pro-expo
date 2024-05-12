import React from "react";
import { styles } from "./common/styles";
import { THomeModel } from "./common/types";
import { Header } from "./components/Header";
import { ExpenseList } from "@ui/components/ExpenseList/ExpenseList.view";
import { View } from "react-native";

export function HomeView(props: THomeModel) {
  return (
    <View style={styles.container}>
      <ExpenseList
        title="Despesas proximas"
        HeaderComponent={
          <Header
            onPressAccount={props.onPressAccount}
            onPressExpenses={props.onPressExpenses}
            onPressSettings={props.onPressSettings}
          />
        }
        data={props.payableExpenses}
        loading={props.loading}
      />
    </View>
  );
}
