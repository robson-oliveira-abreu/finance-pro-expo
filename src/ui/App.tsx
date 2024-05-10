import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "./routes/Routes";
import Providers from "../infra/Provides/Provides";
import "../infra/web-setup/web-setup";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <StatusBar barStyle="dark-content" />
        <Routes />
      </Providers>
    </GestureHandlerRootView>
  );
}
