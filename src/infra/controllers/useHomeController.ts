import { useExpenses } from "@infra/Hooks/useExpenses/useExpenses.hook";
import { filterPayableExpenses } from "@infra/utils/filterPayableExpenses";
import { RootStackParamList } from "@infra/routes/Stack.routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Expense } from "@core/entities/Expense";
import { User } from "@core/entities/User.entity";
import { useAuth } from "@infra/Hooks/useAuth/useAuth.hook";

export type HomeController = {
  user: User | null;
  loading: boolean;
  payableExpenses: Expense[];
  onPressAccount: () => void;
  onPressExpenses: () => void;
  onPressSettings: () => void;
};

export function useHomeController(): HomeController {
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
