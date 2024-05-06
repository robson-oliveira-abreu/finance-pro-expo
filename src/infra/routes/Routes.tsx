import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";
import { useAuth } from "../../commons/Hooks/useAuth.hook";
import { PublicStackRoutes } from "./PublicRoutes";

export default function Routes() {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <StackRoutes /> : <PublicStackRoutes />}
    </NavigationContainer>
  );
}
