import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "../infra/routes/Routes";
import Providers from "@infra/Provides/Provides";
import "@infra/web-setup/web-setup";

import { Loading } from "./components/UIComponents/Loading/Loading";
import { Signup } from "./screens/Sign/Signup.screen";
import { Signin } from "./screens/Sign/Signin.screen";
import { Expense } from "./screens/Expense";
import { Expenses } from "./screens/Expenses";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <StatusBar barStyle="dark-content" />
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
