import { useCurrency } from "../../../../commons/Hooks/useCurrency.hook";
import { GoalsModel } from "./Goals.model";
import { GoalsView } from "./Goals.view";

export function GoalsViewModel() {
  const { groupedExpenses } = GoalsModel();
  const currency = useCurrency();
  return <GoalsView groupedExpenses={groupedExpenses} currency={currency} />;
}
