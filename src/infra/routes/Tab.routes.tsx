import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";

import { PlanningViewModel } from "../../screens/Planning/Planning.view-model";
import { ExpensesViewModel } from "../../screens/Expenses/Expenses.view-model";

import { HomeViewModel } from "../../screens/Home/Home.view-model";
import { Signin } from "../../screens/Signin/Singin.screen";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={HomeViewModel}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesignIcon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Despesas"
        component={ExpensesViewModel}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesomeIcon name="dollar" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Planejamento"
        component={PlanningViewModel}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesomeIcon name="line-chart" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Conta"
        component={Signin}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesignIcon name="user" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
