import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { UseExpense } from "./useExpensesContext.hook";

export function useExpenses() {
  return useContext(ExpensesContext);
}
