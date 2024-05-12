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

const defaultLoadingsState = {
  find: false,
  create: false,
  list: false,
  update: false,
  delete: false,
};

export function useExpensesContext(): UseExpense {
  const expenseService = new ExpenseService();
  const expenseHttpService = new ExpenseHttpService(httpService);

  const [expenseList, setExpenseList] = useState(
    new ExpenseList(null, expenseHttpService)
  );
  const [loadings, setLoadings] = useState(defaultLoadingsState);
  const [useHttp, setUseHttp] = useState(false);
  const { user } = useAuth();

  async function runAuthMethod(
    authenticationMethod: () => Promise<ExpenseList>,
    loadKey: keyof typeof loadings
  ) {
    setLoadings((state) => ({ ...state, [loadKey]: true }));

    const newAuthState = await authenticationMethod();

    setExpenseList(newAuthState);

    setLoadings((state) => ({ ...state, [loadKey]: false }));
  }

  const listExpenses = async () => {
    if (user) runAuthMethod(() => expenseList.list(user), "list");
  };

  const createExpense = async (expense: ExpenseModel) => {
    if (user) runAuthMethod(() => expenseList.create(expense), "create");

    await expenseService.set(expense);
  };

  const removeExpense = async (expense_id: string) => {
    await expenseService.remove(expense_id);
    listExpenses();
  };

  const migrate = async () => {
    const expenses = await expenseService.list();

    if (expenses.success)
      expenseHttpService.migrate(
        expenses.payload.map(({ id, ...rest }) => ({
          ...rest,
          userId: user?.id,
        }))
      );
  };

  useEffect(() => {
    listExpenses();
  }, [useHttp]);

  return {
    expenses: expenseList.expenses,
    setExpense: createExpense,
    removeExpense,
    handleUseHttp: () => setUseHttp((state) => !state),
    useHttp,
    migrate,
  };
}
