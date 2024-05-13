import { createStackNavigator } from "@react-navigation/stack";

import { Expense } from "@ui/screens/Expense";
import { Home } from "@ui/screens/Home";
import { Expenses } from "@ui/screens/Expenses";
import { Settings } from "@ui/screens/Settings";

import { ExpenseRouteProps } from "@ui/screens/Expense/common/types";

export type RootStackParamList = {
  Expense: ExpenseRouteProps;
  Home: undefined;
  Account: undefined;
  Expenses: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="Account" component={Expense} />
    </Stack.Navigator>
  );
}
