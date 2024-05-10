import { ExpenseModel } from "../../../core/entities/Expense.entity";
import { Failure } from "../../../core/entities/Failure";
import { Success } from "../../../core/entities/Success";
import { Storage } from "./Storage";

export class ExpenseService {
  private storage: Storage<ExpenseModel> = Storage<ExpenseModel>();

  get(id: string): Promise<Failure | Success<ExpenseModel | null>> {
    const full_id = this.getFullId(id);

    return this.storage.get(full_id);
  }

  set(expense: ExpenseModel): Promise<Failure | Success<null>> {
    return this.storage.set(this.getFullId(expense.id), expense);
  }

  remove(id: string): Promise<Failure | Success<null>> {
    const full_id = this.getFullId(id);

    return this.storage.remove(full_id);
  }

  async list(): Promise<Failure | Success<ExpenseModel[]>> {
    const id = this.getFullId("");
    const data = await this.storage.list(id);

    if (!data.success || !data.payload) {
      return new Failure();
    }

    const parsed = data.payload.map(
      (expense) =>
        new ExpenseModel(
          expense.id,
          expense.description,
          expense.amount,
          expense.due_date,
          expense.installment,
          expense.installments,
          expense.observation,
          expense.paid,
          expense.paid_amount,
          expense.paid_date
        )
    );

    return new Success(parsed);
  }

  private getFullId(id: string): string {
    const base_id: string = "expense:";

    return base_id + id;
  }
}
