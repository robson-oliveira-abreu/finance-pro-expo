import { ExpenseModel } from "../models/Expense.model";
import { Storage } from "./Storage";

class ExpenseService {
  constructor(private storage: Storage) {}

  get(id: string): Promise<ExpenseModel | void> {
    const full_id = this.getFullId(id);

    return this.storage.get<ExpenseModel>(full_id);
  }

  set(expense: ExpenseModel): Promise<void> {
    const full_id = this.getFullId(expense.id);
    return this.storage.set(full_id, expense);
  }

  remove(id: string): Promise<void> {
    const full_id = this.getFullId(id);

    return this.storage.remove(full_id);
  }

  async list(): Promise<ExpenseModel[]> {
    const id = this.getFullId("");
    const data = await this.storage.list<ExpenseModel>(id);

    return data.map(
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
  }

  private getFullId(id: string): string {
    const base_id: string = "expense:";

    return base_id + id;
  }

  private parseData(data: ExpenseModel) {
    const {
      id,
      amount,
      description,
      due_date,
      installment,
      installments,
      observation,
      paid,
      paid_amount,
      paid_date,
    } = data;

    return {
      id,
      amount,
      description,
      installment,
      installments,
      observation,
      paid,
      paid_amount,
      due_date,
      paid_date,
    };
  }
}

const expenseService = new ExpenseService(new Storage());

export { expenseService };
