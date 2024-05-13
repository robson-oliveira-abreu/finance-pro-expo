import { CreateExpense } from "@core/entities/CreateExpense";
import { Expense } from "@core/entities/Expense";
import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";

export class ExpenseService {
  public create: (
    expense: CreateExpense
  ) => Promise<Success<Expense | null> | Failure>;

  public find: (id: string) => Promise<Success<Expense | null> | Failure>;

  public list: (props: {
    userId?: string;
    groupId?: string;
  }) => Promise<Success<Expense[] | null> | Failure>;

  public delete: (id: string) => Promise<Success<null> | Failure>;

  public update: (
    id: string,
    expense: Partial<CreateExpense>
  ) => Promise<Success<Expense> | Failure>;
}
