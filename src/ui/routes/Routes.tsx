import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";
import { useAuth } from "../../infra/Hooks/useAuth/useAuth.hook";
import { PublicStackRoutes } from "./PublicRoutes";
import { Loading } from "../components/UIComponents/Loading/Loading";

export default function Routes() {
  const { isAuthenticated, loading } = useAuth();
  return (
    <NavigationContainer>
      {loading && <Loading />}
      {isAuthenticated && !loading ? <StackRoutes /> : <PublicStackRoutes />}
    </NavigationContainer>
  );
}
