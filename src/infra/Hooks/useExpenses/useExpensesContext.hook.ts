import { useEffect, useState } from "react";
import { ExpenseModel } from "@core/entities/Expense.entity";
import { ExpenseService } from "@infra/services/local/expense.service";
import { ExpenseHttpService } from "@infra/services/http/ExpenseHttpService";
import { httpService } from "@infra/services/http/HttpService";
import { useAuth } from "@infra/Hooks/useAuth/useAuth.hook";
import { ExpenseList } from "@core/entities/ExpenseList";

export type UseExpense = {
  loading: boolean;
  expenses: ExpenseModel[];
  create: (expense: ExpenseModel) => Promise<void>;
  delete: (expense_id: string) => Promise<void>;
  update: (expense_id: string, expense: Partial<ExpenseModel>) => Promise<void>;
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

  const loading = Object.values(loadings).some((isLoading) => isLoading);

  async function runExpenseListMethod(
    expenseListMethod: () => Promise<ExpenseList>,
    loadKey: keyof typeof loadings
  ) {
    setLoadings((state) => ({ ...state, [loadKey]: true }));

    const newExpenseState = await expenseListMethod();

    setExpenseList(newExpenseState);

    setLoadings((state) => ({ ...state, [loadKey]: false }));
  }

  const listExpenses = async () => {
    if (user) runExpenseListMethod(() => expenseList.list(user), "list");
  };

  const createExpense = async (expense: ExpenseModel) => {
    const { id, ...withoutId } = expense;

    await runExpenseListMethod(
      () => expenseList.create(expense.toCreateObject()),
      "create"
    );

    listExpenses();
  };

  const updateExpense = async (id: string, expense: Partial<ExpenseModel>) => {
    await runExpenseListMethod(() => expenseList.update(id, expense), "update");

    listExpenses();
  };

  const deleteExpense = async (id: string) => {
    await runExpenseListMethod(() => expenseList.delete(id), "delete");

    listExpenses();
  };

  const migrate = async () => {
    const expenses = await expenseService.list();

    if (expenses.success) {
      await expenseHttpService.migrate(
        expenses.payload.map(({ id, ...rest }) => ({
          ...rest,
          userId: user?.id,
        }))
      );

      listExpenses();
    }
  };

  useEffect(() => {
    listExpenses();
  }, [user]);

  return {
    loading,
    expenses: expenseList.expenses,
    create: createExpense,
    delete: deleteExpense,
    update: updateExpense,
    migrate,
  };
}
