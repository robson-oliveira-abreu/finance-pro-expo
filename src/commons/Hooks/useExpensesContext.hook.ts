import { useEffect, useState } from "react";
import { ExpenseModel } from "../entities/Expense.entity";
import { ExpenseService } from "../services/local/expense.service";
import { ExpenseHttpService } from "../services/http/ExpenseHttpService";
import { httpService } from "../services/http/HttpService";
import { useAuth } from "./useAuth/useAuth.hook";

export type UseExpense = {
  expenses: ExpenseModel[];
  setExpense: (expense: ExpenseModel) => Promise<void>;
  removeExpense: (expense_id: string) => Promise<void>;
  handleUseHttp: () => void;
  migrate: () => void;
  useHttp: boolean;
};

export function useExpensesContext(): UseExpense {
  const [expenses, setExpenses] = useState<Array<ExpenseModel>>([]);
  const expenseService = new ExpenseService();
  const expenseHttpService = new ExpenseHttpService(httpService);
  const { user } = useAuth();

  const [useHttp, setUseHttp] = useState(false);

  const getExpenses = async () => {
    let result = await expenseService.list();
    const result_http = await expenseHttpService.list({ userId: user?.id });
    console.log({ result_http });

    if (useHttp) {
      result = result_http;
    }

    if (result)
      setExpenses(
        result.sort((a, b) => a.due_date.getTime() - b.due_date.getTime())
      );
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

    if (expenses)
      expenseHttpService.migrate(expenses?.filter((ex) => !ex.paid));
  };

  useEffect(() => {
    getExpenses();
  }, [useHttp]);

  return {
    expenses,
    setExpense,
    removeExpense,
    handleUseHttp: () => setUseHttp((state) => !state),
    useHttp,
    migrate,
  };
}
