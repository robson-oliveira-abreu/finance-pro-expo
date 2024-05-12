import { useExpenses } from "@infra/Hooks/useExpenses/useExpenses.hook";
import { filterPayableExpenses } from "@infra/utils/filterPayableExpenses";
import { HomeView } from "./Home.view";
import { RootStackParamList } from "@ui/routes/Stack.routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export function HomeViewModel() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { expenses, loading } = useExpenses();
  const payableExpenses = filterPayableExpenses(expenses);

  const onPressAccount = () => {
    navigation.navigate("Account");
  };

  const onPressExpenses = () => {
    navigation.navigate("Expenses");
  };

  const onPressSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <HomeView
      loading={loading}
      payableExpenses={payableExpenses}
      onPressAccount={onPressAccount}
      onPressExpenses={onPressExpenses}
      onPressSettings={onPressSettings}
    />
  );
}
