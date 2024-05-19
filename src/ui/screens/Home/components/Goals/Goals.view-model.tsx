import { useExpenses } from "src/application/Hooks/useExpenses/useExpenses.hook";
import { useCurrency } from "src/application/Hooks/useCurrency/useCurrency.hook";
import { GoalsView } from "./Goals.view";
import { groupExpenses } from "./common/utils/groupExpenses";

export function GoalsViewModel() {
  const { expenses } = useExpenses();
  const groupedExpenses = groupExpenses(expenses);

  const currency = useCurrency();
  return <GoalsView groupedExpenses={groupedExpenses} currency={currency} />;
}
