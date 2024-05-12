import { createStackNavigator } from "@react-navigation/stack";
import { ExpenseViewModel } from "@ui/screens/Expense/Expense.view-model";
import { ExpenseModel } from "@core/entities/Expense.entity";
import { HomeViewModel } from "@ui/screens/Home/Home.view-model";
import { ExpensesViewModel } from "@ui/screens/Expenses/Expenses.view-model";
import { Settings } from "@ui/screens/Settings";

export type RootStackParamList = {
  Expense: { expense?: ExpenseModel };
  Home: undefined;
  Account: undefined;
  Expenses: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeViewModel} />
      <Stack.Screen name="Expense" component={ExpenseViewModel} />
      <Stack.Screen name="Account" component={ExpenseViewModel} />
      <Stack.Screen name="Expenses" component={ExpensesViewModel} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
