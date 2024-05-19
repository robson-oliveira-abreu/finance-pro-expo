import React from "react";
import { styles } from "./common/styles";
import { HomeViewProps } from "./common/types";
import { Header } from "./components/Header";
import { ExpenseList } from "@ui/components/ExpenseList/ExpenseList.view";
import { View } from "react-native";

export function HomeView({ homeController }: HomeViewProps) {
  return (
    <View style={styles.container}>
      <ExpenseList
        title="Despesas proximas"
        HeaderComponent={
          <Header
            user={homeController.user}
            onPressAccount={homeController.onPressAccount}
            onPressExpenses={homeController.onPressExpenses}
            onPressSettings={homeController.onPressSettings}
          />
        }
        data={homeController.payableExpenses}
        loading={homeController.loading}
      />
    </View>
  );
}
