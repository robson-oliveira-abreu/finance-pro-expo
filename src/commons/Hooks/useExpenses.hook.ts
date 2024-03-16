import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { UseExpense } from "./useExpensesContext.hook";

export function useExpenses(): UseExpense {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("useExpenses should be within the ExpensesContext");
  }

  return context;
}
