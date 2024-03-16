import { HomeModel } from "./Home.model";
import { HomeView } from "./Home.view";

export function HomeViewModel() {
  const { actions, state, payableExpenses, onStateChange, onPressMenu } =
    HomeModel();

  return (
    <HomeView
      actions={actions}
      state={state}
      onStateChange={onStateChange}
      onPressMenu={onPressMenu}
      payableExpenses={payableExpenses}
    />
  );
}
