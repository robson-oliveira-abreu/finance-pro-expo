import { useEffect, useState } from "react";
import { ExpenseService } from "@infra/services/local/expense.service";
import { ExpenseHttpService } from "@infra/services/http/ExpenseHttpService";
import { httpService } from "@infra/services/http/HttpService";
import { useAuth } from "@infra/Hooks/useAuth/useAuth.hook";
import { ExpenseList } from "@core/entities/ExpenseList";
import { Expense } from "@core/entities/Expense";
import { Success } from "@core/entities/Success";
import { Failure } from "@core/entities/Failure";
import { Toast } from "react-native-toast-notifications";

export type UseExpense = {
  loading: boolean;
  expenses: Expense[];
  create: (expense: Expense) => Promise<void>;
  delete: (id: string) => Promise<void>;
  update: (expense: Partial<Expense>) => Promise<void>;
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

      if (!response.success)
        Toast.show(response.errorMessage ?? "Error on list expenses!", {
          type: "danger",
        });
    }
  };

  const createExpense = async (expense: Expense) => {
    const response = await runExpenseListMethod(
      () => expenseList.create(expense.toObjectWithoutId()),
      "create"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on create expense!", {
        type: "danger",
      });
      return;
    }

    Toast.show("Expense was created!", {
      type: "success",
    });

    listExpenses();
  };

  const updateExpense = async (expense: Expense) => {
    const response = await runExpenseListMethod(
      () =>
        expenseList.update(
          expense.id!,
          new Expense(expense).toObjectWithoutId()
        ),
      "update"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on update expense!", {
        type: "danger",
      });
      return;
    }

    Toast.show("Expense was updated!", {
      type: "success",
    });

    listExpenses();
  };

  const deleteExpense = async (id: string) => {
    const response = await runExpenseListMethod(
      () => expenseList.delete(id),
      "delete"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on delete expense!", {
        type: "danger",
      });
      return;
    }

    Toast.show("Expense was deleted!", {
      type: "success",
    });

    listExpenses();
  };

  const migrate = async () => {
    const response = await expenseService.list();

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on list local expenses!", {
        type: "danger",
      });
      return;
    }

    const httpResponse = await expenseHttpService.migrate(
      response.payload.map(({ id, ...rest }) => ({
        ...rest,
        userId: user?.id,
      }))
    );

    if (!httpResponse.success) {
      Toast.show(httpResponse.errorMessage || "Error on migrate expenses!", {
        type: "danger",
      });
      return;
    }

    Toast.show("Expenses was migrated!", {
      type: "success",
    });

    listExpenses();
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
