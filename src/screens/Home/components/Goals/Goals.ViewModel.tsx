import { GoalsModel } from "./Goals.Model";
import { GoalsView } from "./Goals.View";

export function GoalsViewModel() {
  const { groupedExpenses } = GoalsModel();
  return <GoalsView groupedExpenses={groupedExpenses} />;
}
