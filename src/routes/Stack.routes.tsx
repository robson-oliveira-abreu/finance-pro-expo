import { createStackNavigator } from "@react-navigation/stack";
import { Expense } from "../screens/Expense/Expense.view";
import { TabRoutes } from "./Tab.routes";
import { ParamListBase } from "@react-navigation/native";
import { ExpenseModel } from "../models/Expense.model";

type StackParamList = {
  Expense: { expense: ExpenseModel };
  Home: {};
};

const Stack = createStackNavigator<StackParamList>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen name="Expense" component={Expense} />
    </Stack.Navigator>
  );
}
