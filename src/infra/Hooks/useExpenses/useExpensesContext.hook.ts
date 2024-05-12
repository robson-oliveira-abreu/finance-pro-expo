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
  migrate: () => void;
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
  const { user } = useAuth();

  async function runAuthMethod(
    expenseListMethod: () => Promise<ExpenseList>,
    loadKey: keyof typeof loadings
  ) {
    setLoadings((state) => ({ ...state, [loadKey]: true }));

    const newExpenseState = await expenseListMethod();

    setExpenseList(newExpenseState);

    setLoadings((state) => ({ ...state, [loadKey]: false }));
  }

  const listExpenses = async () => {
    if (user) runAuthMethod(() => expenseList.list(user), "list");
  };

  const createExpense = async (expense: ExpenseModel) => {
    const { id, ...expenseWithoutId } = expense;
    if (user)
      runAuthMethod(() => expenseList.create(expenseWithoutId), "create");

    await expenseService.set(expense);

    listExpenses();
  };

  const removeExpense = async (expense_id: string) => {
    await expenseService.remove(expense_id);
    listExpenses();
  };

  const migrate = async () => {
    const expenses = await expenseService.list();

    if (expenses.success)
      await expenseHttpService.migrate(
        expenses.payload.map(({ id, ...rest }) => ({
          ...rest,
          userId: user?.id,
        }))
      );

    listExpenses();
  };

  useEffect(() => {
    listExpenses();
  }, [user]);

  return {
    expenses: expenseList.expenses,
    setExpense: createExpense,
    removeExpense,
    migrate,
  };
}
