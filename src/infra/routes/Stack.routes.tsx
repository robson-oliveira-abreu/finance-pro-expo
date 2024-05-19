import { Expense } from "@domain/entities/Expense";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Expense: { expense?: Expense };
  Home: undefined;
  Account: undefined;
  Expenses: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function StackRoutes({
  HomeScreen,
  ExpensesScreen,
  SettingsScreen,
  ExpenseScreen,
}) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Account" component={ExpenseScreen} />
    </Stack.Navigator>
  );
}
