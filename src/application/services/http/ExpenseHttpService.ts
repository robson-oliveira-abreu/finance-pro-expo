import { AxiosInstance } from "axios";
import { Failure } from "@domain/entities/Failure";
import { Success } from "@domain/entities/Success";
import { LogError } from "src/application/utils/logError";
import { ExpenseService } from "@domain/services/ExpenseService";
import { CreateExpense } from "@domain/entities/CreateExpense";
import { AppError } from "@domain/entities/AppError";
import { Expense } from "@domain/entities/Expense";

export class ExpenseHttpService implements ExpenseService {
  constructor(private httpService: AxiosInstance) {}

  async create(expense: CreateExpense): Promise<Success<Expense> | Failure> {
    try {
      const response = await this.httpService.post<{ expense: Expense }>(
        "/expenses",
        expense
      );
      return new Success(response.data.expense);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.create" });
      return new Failure();
    }
  }

  async find(id: string): Promise<Success<Expense> | Failure> {
    try {
      if (!id) throw new Error("id  must be provided");

      const response = await this.httpService.get<{ expense: Expense }>(
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
  }): Promise<Success<Expense[]> | Failure> {
    try {
      if (!groupId && !userId)
        throw new AppError("groupId or userId must be provided");

      const query =
        "/expenses?" +
        (userId && groupId
          ? `userId=${userId}&groupId=${groupId}`
          : userId
          ? `userId=${userId}`
          : `groupId=${groupId}`);

      const response = await this.httpService.get<{ expenses: Expense[] }>(
        query
      );

      const parsed = response.data?.expenses?.map(
        (expense) => new Expense(expense)
      );

      return new Success(parsed);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.list" });
      return new Failure(error?.errorMessage);
    }
  }

  async update(id: string, expense: Partial<CreateExpense>) {
    try {
      const response = await this.httpService.patch<{ expense: Expense }>(
        `/expenses/${id}`,
        expense
      );

      return new Success(response.data.expense);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.update" });
      return new Failure();
    }
  }

  async delete(id: string) {
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

      return new Success(null);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "ExpenseHttpService.migrate" });
      return new Failure();
    }
  }
}
