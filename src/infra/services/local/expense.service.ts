import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";
import { Storage } from "./Storage";
import { Expense } from "@core/entities/Expense";

export class ExpenseService {
  private storage: Storage<Expense> = Storage<Expense>();

  get(id: string): Promise<Failure | Success<Expense | null>> {
    const full_id = this.getFullId(id);

    return this.storage.get(full_id);
  }

  set(expense: Expense): Promise<Failure | Success<null>> {
    return this.storage.set(this.getFullId(expense?.id!), expense);
  }

  remove(id: string): Promise<Failure | Success<null>> {
    const full_id = this.getFullId(id);

    return this.storage.remove(full_id);
  }

  async list(): Promise<Failure | Success<Expense[]>> {
    const id = this.getFullId("");
    const data = await this.storage.list(id);

    if (!data.success || !data.payload) {
      return new Failure();
    }

    const parsed = data.payload.map((expense) => new Expense(expense));

    return new Success(parsed);
  }

  private getFullId(id: string): string {
    const base_id: string = "expense:";

    return base_id + id;
  }
}
