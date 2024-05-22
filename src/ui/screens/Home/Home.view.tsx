import React from "react";
import { HomeViewProps } from "./common/types";
import { Header } from "./components/Header";
import { ExpenseList } from "@ui/components/ExpenseList/ExpenseList.view";
import { View } from "react-native";
import { useTheme } from "@/application/Hooks/useTheme";

export function HomeView({ homeController }: HomeViewProps) {
  const { isDark } = useTheme();
  return (
    <View
      className={`flex-1 items-center gap-y-3 min-h-full ${isDark(
        "bg-dark-background",
        "bg-background"
      )}`}
    >
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
