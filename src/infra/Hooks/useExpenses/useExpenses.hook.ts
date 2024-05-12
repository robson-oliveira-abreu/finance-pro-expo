import { useContext } from "react";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export function useExpenses() {
  return useContext(ExpensesContext);
}
