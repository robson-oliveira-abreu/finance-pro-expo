import React, { useEffect } from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "./src/routes/Routes";
import { AlertProvider } from "./src/contexts/AlertContext";
import Alert from "./src/components/Alert/Alert.component";
import { ExpenseProvider } from "./src/contexts/ExpensesContext";
import { StatusBar } from "react-native";
import { add_metadata } from "./src/commons/metadata/add_metadata";

const theme: typeof MD3LightTheme = {
  ...MD3LightTheme,
  mode: "adaptive",
  colors: {
    ...MD3LightTheme.colors,
    primary: "#fa3c23",
    surface: "#000",
  },
};

export default function App() {
  useEffect(() => {
    add_metadata();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <AlertProvider>
          <ExpenseProvider>
            <StatusBar barStyle="dark-content" />
            <Routes />
            <Alert />
          </ExpenseProvider>
        </AlertProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
