import { useExpenses } from "../../../../../infra/Hooks/useExpenses/useExpenses.hook";
import { useCurrency } from "../../../../../infra/Hooks/useCurrency/useCurrency.hook";
import { GoalsView } from "./Goals.view";
import { groupExpenses } from "./common/utils/groupExpenses";

export function GoalsViewModel() {
  const { expenses } = useExpenses();
  const groupedExpenses = groupExpenses(expenses);

  const currency = useCurrency();
  return <GoalsView groupedExpenses={groupedExpenses} currency={currency} />;
}
