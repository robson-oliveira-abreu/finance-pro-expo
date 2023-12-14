import { useContext, useEffect, useState } from "react";
import { ExpenseModel } from "../../models/Expense.model";
import { expenseService } from "../../services/expense.service";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export type UseExpense = {
  expenses: ExpenseModel[];
  setExpense: (expense: ExpenseModel) => Promise<void>;
  removeExpense: (expense_id: string) => Promise<void>;
};

export function useExpensesContext(): UseExpense {
  const [expenses, setExpenses] = useState<Array<ExpenseModel>>([]);

  const getExpenses = async () => {
    const result = await expenseService.list();

    setExpenses(result);
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

export function useExpenses(): UseExpense {
  return useContext(ExpensesContext);
}
