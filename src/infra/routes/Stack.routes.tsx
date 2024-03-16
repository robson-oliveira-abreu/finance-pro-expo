import { createStackNavigator } from "@react-navigation/stack";
import { ExpenseViewModel } from "../../screens/Expense/Expense.view-model";
import { TabRoutes } from "./Tab.routes";
import { ExpenseModel } from "../../commons/models/Expense.model";

type StackParamList = {
  Expense: { expense: ExpenseModel };
  HomeTabs: {};
};

const Stack = createStackNavigator<StackParamList>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeTabs" component={TabRoutes} />
      <Stack.Screen name="Expense" component={ExpenseViewModel} />
    </Stack.Navigator>
  );
}
