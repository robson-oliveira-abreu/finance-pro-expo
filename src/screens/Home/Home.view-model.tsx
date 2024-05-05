import { Alert } from "react-native";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { filterPayableExpenses } from "../../commons/utils/filterPayableExpenses";
import { HomeView } from "./Home.view";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../infra/routes/Stack.routes";

type NavigationProps = StackScreenProps<RootStackParamList, "Home">;
type HomeProps = {} & NavigationProps;

export function HomeViewModel({ navigation }: HomeProps) {
  const { expenses } = useExpenses();
  const payableExpenses = filterPayableExpenses(expenses);

  const onPressMenu = () => {
    Alert.alert("Title", "Hello world", [{ text: "Ok" }, { text: "Cancel" }]);
  };

  const onPressAccount = () => {
    navigation.navigate("Account");
  };

  const onPressExpenses = () => {
    navigation.navigate("Expenses");
  };

  return (
    <HomeView
      onPressMenu={onPressMenu}
      payableExpenses={payableExpenses}
      onPressAccount={onPressAccount}
      onPressExpenses={onPressExpenses}
    />
  );
}
