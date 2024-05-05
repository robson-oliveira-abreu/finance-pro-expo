import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Routes from "../routes/Routes";
import "../web-setup/web-setup";

import { AlertProvider } from "../../commons/contexts/AlertContext";
import { ExpenseProvider } from "../../commons/contexts/ExpensesContext";
import { PlanItemsProvider } from "../../commons/contexts/PlanItemsContext";
import { CurrencyProvider } from "../../commons/contexts/CurrencyContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlertProvider>
        <ExpenseProvider>
          <PlanItemsProvider>
            <CurrencyProvider>
              <StatusBar barStyle="dark-content" />
              <Routes />
            </CurrencyProvider>
          </PlanItemsProvider>
        </ExpenseProvider>
      </AlertProvider>
    </GestureHandlerRootView>
  );
}
