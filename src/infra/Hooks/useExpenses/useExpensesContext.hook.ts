import { useEffect, useState } from "react";
import { ExpenseModel } from "../../../core/entities/Expense.entity";
import { ExpenseService } from "../../services/local/expense.service";
import { ExpenseHttpService } from "../../services/http/ExpenseHttpService";
import { httpService } from "../../services/http/HttpService";
import { useAuth } from "../useAuth/useAuth.hook";
import { ExpenseList } from "../../../core/entities/ExpenseList";

export type UseExpense = {
  expenses: ExpenseModel[];
  setExpense: (expense: ExpenseModel) => Promise<void>;
  removeExpense: (expense_id: string) => Promise<void>;
  handleUseHttp: () => void;
  migrate: () => void;
  useHttp: boolean;
};

export function useExpensesContext(): UseExpense {
  const [expenseList, setExpenseList] = useState(new ExpenseList());
  const expenseService = new ExpenseService();
  const expenseHttpService = new ExpenseHttpService(httpService);
  const { user } = useAuth();

  const [useHttp, setUseHttp] = useState(false);

  const getExpenses = async () => {
    const result = await expenseService.list();
    const res = await expenseHttpService.list({ userId: user?.id });

    if (useHttp) {
      if (res.success) setExpenseList(new ExpenseList().set(res.payload));
      return;
    }

    if (result.success) setExpenseList(new ExpenseList().set(result.payload));
  };

  const setExpense = async (expense: ExpenseModel) => {
    await expenseService.set(expense);
    getExpenses();
  };

  const removeExpense = async (expense_id: string) => {
    await expenseService.remove(expense_id);
    getExpenses();
  };

  const migrate = async () => {
    const expenses = await expenseService.list();

    if (expenses.success) expenseHttpService.migrate(expenses.payload);
  };

  useEffect(() => {
    getExpenses();
  }, [useHttp]);

  return {
    expenses: expenseList.list,
    setExpense,
    removeExpense,
    handleUseHttp: () => setUseHttp((state) => !state),
    useHttp,
    migrate,
  };
}
