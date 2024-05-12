import React, { createContext } from "react";
import { useExpensesContext } from "./useExpensesContext.hook";

export const ExpensesContext = createContext<
  ReturnType<typeof useExpensesContext>
>({
  expenses: [],
  create: () => new Promise(() => {}),
  delete: () => new Promise(() => {}),
  update: () => new Promise(() => {}),
  migrate: () => {},
  loading: false,
});

export function ExpenseProvider({ children }) {
  const context = useExpensesContext();
  return (
    <ExpensesContext.Provider value={context}>
      {children}
    </ExpensesContext.Provider>
  );
}
