import { CreateExpense } from "@core/entities/CreateExpense";
import { ExpenseModel } from "@core/entities/Expense.entity";
import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";

export class ExpenseService {
  public create: (
    expense: CreateExpense
  ) => Promise<Success<ExpenseModel | null> | Failure>;

  public find: (id: string) => Promise<Success<ExpenseModel | null> | Failure>;

  public list: (props: {
    userId?: string;
    groupId?: string;
  }) => Promise<Success<ExpenseModel[] | null> | Failure>;

  public delete: (id: string) => Promise<Success<null> | Failure>;

  public update: (
    id: string,
    expense: Partial<CreateExpense>
  ) => Promise<Success<ExpenseModel> | Failure>;
}
