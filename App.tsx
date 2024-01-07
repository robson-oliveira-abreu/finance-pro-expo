import React from "react";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "./src/infra/routes/Routes";
import { AlertProvider } from "./src/commons/contexts/AlertContext";
import Alert from "./src/commons/components/Alert/Alert.component";
import { ExpenseProvider } from "./src/commons/contexts/ExpensesContext";
import { StatusBar } from "react-native";
import { useWebSetup } from "./src/commons/Hooks/useWebSetup";
import { theme } from "./src/commons/theme/theme";
import { PlanItemsProvider } from "./src/commons/contexts/PlanItemsContext";

export default function App() {
  useWebSetup();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <AlertProvider>
          <ExpenseProvider>
            <PlanItemsProvider>
              <StatusBar barStyle="dark-content" />
              <Routes />
              <Alert />
            </PlanItemsProvider>
          </ExpenseProvider>
        </AlertProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
