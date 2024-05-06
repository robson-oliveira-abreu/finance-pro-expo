import { ExpenseModel } from "../../entities/Expense.entity";
import { Storage } from "./Storage";

export class ExpenseService {
  private storage: Storage<ExpenseModel> = Storage<ExpenseModel>();

  get(id: string): Promise<ExpenseModel | void> {
    const full_id = this.getFullId(id);

    return this.storage.get(full_id);
  }

  set(expense: ExpenseModel): Promise<void> {
    return this.storage.set(this.getFullId(expense.id), expense);
  }

  remove(id: string): Promise<void> {
    const full_id = this.getFullId(id);

    return this.storage.remove(full_id);
  }

  async list(): Promise<ExpenseModel[] | undefined> {
    const id = this.getFullId("");
    const data = await this.storage.list(id);

    return data?.map((expense) =>
      ExpenseModel(
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
  }

  private getFullId(id: string): string {
    const base_id: string = "expense:";

    return base_id + id;
  }
}
