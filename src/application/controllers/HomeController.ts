import { useExpenses } from "src/application/Hooks/useExpenses/useExpenses.hook";
import { filterPayableExpenses } from "src/application/utils/filterPayableExpenses";
import { RootStackParamList } from "@infra/routes/Stack.routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Expense } from "@domain/entities/Expense";
import { User } from "@domain/entities/User.entity";
import { useAuth } from "src/application/Hooks/useAuth/useAuth.hook";

export type THomeController = {
  user: User | null;
  loading: boolean;
  payableExpenses: Expense[];
  onPressAccount: () => void;
  onPressExpenses: () => void;
  onPressSettings: () => void;
};

export function HomeController(): THomeController {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { expenses, loading } = useExpenses();
  const payableExpenses = filterPayableExpenses(expenses);
  const { user } = useAuth();

  const onPressAccount = () => {
    navigation.navigate("Account");
  };

  const onPressExpenses = () => {
    navigation.navigate("Expenses");
  };

  const onPressSettings = () => {
    navigation.navigate("Settings");
  };

  return {
    user,
    loading,
    payableExpenses,
    onPressAccount,
    onPressExpenses,
    onPressSettings,
  };
}
