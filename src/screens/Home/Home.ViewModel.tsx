import { HomeModel } from "./Home.Model";
import { HomeView } from "./Home.View";

export function HomeViewModel() {
  const { payableExpenses, onPressMenu } = HomeModel();

  return (
    <HomeView onPressMenu={onPressMenu} payableExpenses={payableExpenses} />
  );
}
