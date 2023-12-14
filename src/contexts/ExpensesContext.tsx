import React, { createContext } from "react";
import { useExpensesContext } from "../commons/Hooks/useExpenses.hook";

export const ExpensesContext = createContext<ReturnType<
  typeof useExpensesContext
> | null>(null);

export function ExpenseProvider({ children }) {
  const context = useExpensesContext();

  return (
    <ExpensesContext.Provider value={context}>
      {children}
    </ExpensesContext.Provider>
  );
}
