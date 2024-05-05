import { createStackNavigator } from "@react-navigation/stack";
import { ExpenseViewModel } from "../../screens/Expense/Expense.view-model";
import { ExpenseModel } from "../../commons/models/Expense.model";
import { HomeViewModel } from "../../screens/Home/Home.view-model";
import { ExpensesViewModel } from "../../screens/Expenses/Expenses.view-model";

export type RootStackParamList = {
  Expense: { expense?: ExpenseModel };
  Home: undefined;
  Account: undefined;
  Expenses: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeViewModel} />
      <Stack.Screen name="Expense" component={ExpenseViewModel} />
      <Stack.Screen name="Account" component={ExpenseViewModel} />
      <Stack.Screen name="Expenses" component={ExpensesViewModel} />
    </Stack.Navigator>
  );
}
