import { useEffect, useState } from "react";
import { ExpenseModel } from "@core/entities/Expense.entity";
import { ExpenseService } from "@infra/services/local/expense.service";
import { ExpenseHttpService } from "@infra/services/http/ExpenseHttpService";
import { httpService } from "@infra/services/http/HttpService";
import { useAuth } from "@infra/Hooks/useAuth/useAuth.hook";
import { ExpenseList } from "@core/entities/ExpenseList";
import { Expense } from "@core/entities/Expense";
import { Success } from "@core/entities/Success";
import { Failure } from "@core/entities/Failure";

export type UseExpense = {
  loading: boolean;
  expenses: ExpenseModel[];
  create: (expense: ExpenseModel) => Promise<void>;
  delete: (expense_id: string) => Promise<void>;
  update: (expense: Partial<ExpenseModel>) => Promise<void>;
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
    expenseListMethod: () => Promise<Success<ExpenseList> | Failure>,
    loadKey: keyof typeof loadings
  ): Promise<Success<null> | Failure> {
    setLoadings((state) => ({ ...state, [loadKey]: true }));

    const response = await expenseListMethod();

    if (!response.success) {
      setLoadings((state) => ({ ...state, [loadKey]: false }));
      return new Failure();
    }

    setExpenseList(response.payload);

    setLoadings((state) => ({ ...state, [loadKey]: false }));

    return new Success(null);
  }

  const listExpenses = async () => {
    if (user) {
      const response = await runExpenseListMethod(
        () => expenseList.list(user),
        "list"
      );

      if (response.success) {
      } else {
      }
    }
  };

  const createExpense = async (expense: ExpenseModel) => {
    await runExpenseListMethod(
      () => expenseList.create(expense.toObjectWithoutId()),
      "create"
    );

    listExpenses();
  };

  const updateExpense = async (expense: Expense) => {
    await runExpenseListMethod(
      () => expenseList.update(expense.id!, expense.toObjectWithoutId()),
      "update"
    );

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
