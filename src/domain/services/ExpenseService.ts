import { CreateExpense } from "@domain/entities/CreateExpense";
import { Expense } from "@domain/entities/Expense";
import { Failure } from "@domain/entities/Failure";
import { Success } from "@domain/entities/Success";

export class ExpenseService {
  public create: (expense: CreateExpense) => Promise<Success<null> | Failure>;

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
