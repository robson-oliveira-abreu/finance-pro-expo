import React, { createContext } from "react";
import { useExpensesContext } from "./useExpensesContext.hook";
import { ExpenseModel } from "../../../core/entities/Expense.entity";

export const ExpensesContext = createContext<
  ReturnType<typeof useExpensesContext>
>({
  expenses: [],
  setExpense: (expense: ExpenseModel) => new Promise(() => {}),
  removeExpense: (expense_id: string) => new Promise(() => {}),
  migrate: () => {},
});

export function ExpenseProvider({ children }) {
  const context = useExpensesContext();

  return (
    <ExpensesContext.Provider value={context}>
      {children}
    </ExpensesContext.Provider>
  );
}
