import { useExpenses } from "../../../../commons/Hooks/useExpenses.hook";
import { TGoalsModel } from "./common/types";
import { groupExpenses } from "./common/utils/groupExpenses";

export function GoalsModel(): TGoalsModel {
  const { expenses } = useExpenses();
  const groupedExpenses = groupExpenses(expenses);

  return { groupedExpenses };
}
