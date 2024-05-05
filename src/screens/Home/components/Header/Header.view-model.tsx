import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "./Header.view";
import { RootStackParamList } from "../../../../infra/routes/Stack.routes";

type HeaderProps = {
  onPress: () => void;
  onPressAccount: () => void;
  onPressExpenses: () => void;
};

export function HeaderModelView({
  onPress,
  onPressAccount,
  onPressExpenses,
}: HeaderProps) {
  return (
    <Header
      onPress={onPress}
      onPressAccount={onPressAccount}
      onPressExpenses={onPressExpenses}
    />
  );
}
