import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { UseExpense } from "./useExpensesContext.hook";

export function useExpenses(): UseExpense | null {
  return useContext(ExpensesContext);
}
