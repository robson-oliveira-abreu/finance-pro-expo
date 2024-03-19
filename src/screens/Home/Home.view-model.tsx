import { HomeModel } from "./Home.model";
import { HomeView } from "./Home.view";

export function HomeViewModel() {
  const { payableExpenses, onPressMenu } = HomeModel();

  return (
    <HomeView onPressMenu={onPressMenu} payableExpenses={payableExpenses} />
  );
}
