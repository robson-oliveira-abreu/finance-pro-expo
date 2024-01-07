import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";

import { Home } from "../../screens/Home/Home.view";
import { Planning } from "../../screens/Planning/Planning.view";
import { Expenses } from "../../screens/Expenses/Expenses.view";

import { BottomTabBar } from "../../commons/components/BottomTabBar/BottomTabBar.component";

const Tab = createBottomTabNavigator();

type TabBarIcon = (props: { color: string; size: number }) => React.ReactNode;
class TabScreen {
  constructor(
    public name: string,
    public component: () => React.JSX.Element | React.ReactNode,
    public tabBarIcon: TabBarIcon
  ) {}
}

const Screens: Array<TabScreen> = [
  new TabScreen("Home", Home, ({ color, size }) => (
    <AntDesignIcon name="home" size={size} color={color} />
  )),
  new TabScreen("Expenses", Expenses, ({ color, size }) => (
    <FontAwesomeIcon name="dollar" size={size} color={color} />
  )),
  new TabScreen("Planning", Expenses, ({ color, size }) => (
    <FontAwesomeIcon name="line-chart" size={size} color={color} />
  )),
];

export function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesignIcon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Despesas"
        component={Expenses}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesomeIcon name="dollar" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Planejamento"
        component={Planning}
        options={{
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
