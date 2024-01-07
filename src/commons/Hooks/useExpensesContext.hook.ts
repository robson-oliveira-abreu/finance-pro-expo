import { useEffect, useState } from "react";
import { ExpenseModel } from "../models/Expense.model";
import { ExpenseService } from "../services/expense.service";

export type UseExpense = {
  expenses: ExpenseModel[];
  setExpense: (expense: ExpenseModel) => Promise<void>;
  removeExpense: (expense_id: string) => Promise<void>;
};

export function useExpensesContext(): UseExpense {
  const [expenses, setExpenses] = useState<Array<ExpenseModel>>([]);
  const expenseService = new ExpenseService();

  const getExpenses = async () => {
    const result = await expenseService.list();

    if (result) setExpenses(result);
  };

  const setExpense = async (expense: ExpenseModel) => {
    await expenseService.set(expense);

    getExpenses();
  };

  const removeExpense = async (expense_id: string) => {
    await expenseService.remove(expense_id);

    getExpenses();
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return {
    expenses,
    setExpense,
    removeExpense,
  };
}
