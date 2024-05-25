import React from "react";
import { HomeViewProps } from "./common/types";
import { Header } from "./components/Header";
import { ExpenseList } from "@ui/components/ExpenseList/ExpenseList.view";
import { useTheme } from "@/application/Hooks/useTheme";
import { isIos } from "@/application/utils/platform";
import { Container } from "@/ui/components/Container/Container";

export function HomeView({ homeController }: HomeViewProps) {
  const { isDark } = useTheme();
  return (
    <Container
      className={`items-center ${isDark(
        "bg-dark-background",
        "bg-background"
      )} `}
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
    </Container>
  );
}
