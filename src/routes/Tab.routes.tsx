import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";

import Home from "../screens/Home/Home.screen";
import Login from "../screens/Login/Login.screen";
import { Expenses } from "../screens/Expenses/Expenses.view";
import { BottomTabBar } from "../components/BottomTabBar/BottomTabBar.component";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => {
            return <AntDesignIcon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Despesas"
        component={Expenses}
        options={{
          title: "Despesas",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesomeIcon name="dollar" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesomeIcon name="line-chart" size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
