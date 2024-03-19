import { GoalsModel } from "./Goals.model";
import { GoalsView } from "./Goals.view";

export function GoalsViewModel() {
  const { groupedExpenses } = GoalsModel();
  return <GoalsView groupedExpenses={groupedExpenses} />;
}
