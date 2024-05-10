import { Alert } from "react-native";
import { useExpenses } from "../../../infra/Hooks/useExpenses/useExpenses.hook";
import { filterPayableExpenses } from "../../../infra/utils/filterPayableExpenses";
import { HomeView } from "./Home.view";
import { RootStackParamList } from "../../routes/Stack.routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export function HomeViewModel() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { expenses } = useExpenses();
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
      payableExpenses={payableExpenses}
      onPressAccount={onPressAccount}
      onPressExpenses={onPressExpenses}
      onPressSettings={onPressSettings}
    />
  );
}
