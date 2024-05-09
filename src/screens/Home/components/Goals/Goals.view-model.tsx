import { useExpenses } from "../../../../commons/Hooks/useExpenses.hook";
import { useCurrency } from "../../../../commons/Hooks/useCurrency.hook";
import { GoalsView } from "./Goals.view";
import { groupExpenses } from "./common/utils/groupExpenses";

export function GoalsViewModel() {
  const { expenses } = useExpenses();
  const groupedExpenses = groupExpenses(expenses);

  const currency = useCurrency();
  return <GoalsView groupedExpenses={groupedExpenses} currency={currency} />;
}
