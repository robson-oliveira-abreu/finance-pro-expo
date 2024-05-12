import { AxiosInstance } from "axios";
import { ExpenseModel } from "../../../core/entities/Expense.entity";
import { Failure } from "../../../core/entities/Failure";
import { Success } from "../../../core/entities/Success";
import { LogError } from "../../utils/logError";
import { ExpenseService } from "../../../core/services/ExpenseService";

type CreateExpense = Omit<ExpenseModel, "id">;

export class ExpenseHttpService implements ExpenseService {
  constructor(private httpService: AxiosInstance) {}

  async create(
    expense: CreateExpense
  ): Promise<Success<ExpenseModel> | Failure> {
    try {
      const response = await this.httpService.post<{ expense: ExpenseModel }>(
        "/expenses",
        expense
      );
      return new Success(response.data.expense);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.create" });
      return new Failure();
    }
  }

  async find(id: string): Promise<Success<ExpenseModel> | Failure> {
    try {
      if (!id) throw new Error("id  must be provided");

      const response = await this.httpService.get<{ expense: ExpenseModel }>(
        `/expenses?id=${id}`
      );

      return new Success(response.data.expense);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.find" });
      return new Failure();
    }
  }

  async list({
    userId = "",
    groupId = "",
  }): Promise<Success<ExpenseModel[]> | Failure> {
    try {
      if (!groupId && !userId)
        throw new Error("groupId or userId must be provided");

      const query =
        "/expense?" +
        (userId && groupId
          ? `userId=${userId}&groupId=${groupId}`
          : userId
          ? `userId=${userId}`
          : `groupId=${groupId}`);

      const response = await this.httpService.get<{ expenses: ExpenseModel[] }>(
        query
      );

      const parsed = response.data?.expenses?.map(
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
            expense.paid_date,
            expense.userId
          )
      );

      return new Success(parsed);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.list" });
      return new Failure();
    }
  }

  async update(id: string, expense: Partial<CreateExpense>) {
    try {
      const response = await this.httpService.patch<{ expense: ExpenseModel }>(
        `/expenses/${id}`,
        expense
      );

      return new Success(response.data.expense);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.update" });
      return new Failure();
    }
  }

  async remove(id: string) {
    try {
      await this.httpService.delete(`expenses/${id}`);

      return new Success(null);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.delete" });
      return new Failure();
    }
  }

  async migrate(expenses: CreateExpense[]) {
    try {
      const response = await this.httpService.post("expenses/migrate", {
        expenses,
      });

      console.log({ response });
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.migrate" });
    }
  }
}
