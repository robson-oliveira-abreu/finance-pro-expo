import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "@infra/routes/Routes";
import Providers from "@infra/Provides/Provides";
import "@infra/web-setup/web-setup";

import { Loading } from "@ui/components/UIComponents/Loading/Loading";
import { Signup } from "@ui/screens/Sign/Signup.screen";
import { Signin } from "@ui/screens/Sign/Signin.screen";
import { Expense } from "@ui/screens/Expense";
import { Expenses } from "@ui/screens/Expenses";
import { Home } from "@ui/screens/Home";
import { Settings } from "@ui/screens/Settings";
import { useColorScheme } from "nativewind";

export default function App() {
  const { colorScheme } = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <StatusBar
          barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        />
        <Routes
          HomeScreen={Home}
          ExpensesScreen={Expenses}
          SettingsScreen={Settings}
          ExpenseScreen={Expense}
          SigninScreen={Signin}
          SignupScreen={Signup}
          Loading={Loading}
        />
      </Providers>
    </GestureHandlerRootView>
  );
}
