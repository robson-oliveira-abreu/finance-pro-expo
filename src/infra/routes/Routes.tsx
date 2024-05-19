import React, { useMemo } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";
import { useAuth } from "@infra/Hooks/useAuth/useAuth.hook";
import { PublicStackRoutes } from "./PublicRoutes";
import { theme } from "@infra/theme/theme";

export default function Routes({
  HomeScreen,
  ExpensesScreen,
  SettingsScreen,
  ExpenseScreen,
  SigninScreen,
  SignupScreen,
  Loading,
}) {
  const { isAuthenticated, loading } = useAuth();

  const navTheme: typeof DefaultTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background,
      },
    }),
    []
  );

  return (
    <NavigationContainer theme={navTheme}>
      {loading && <Loading />}
      {isAuthenticated && !loading ? (
        <StackRoutes
          HomeScreen={HomeScreen}
          ExpensesScreen={ExpensesScreen}
          SettingsScreen={SettingsScreen}
          ExpenseScreen={ExpenseScreen}
        />
      ) : (
        <PublicStackRoutes
          SigninScreen={SigninScreen}
          SignupScreen={SignupScreen}
        />
      )}
    </NavigationContainer>
  );
}
