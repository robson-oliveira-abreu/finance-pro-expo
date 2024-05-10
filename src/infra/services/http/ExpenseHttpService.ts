import { AxiosInstance } from "axios";
import { ExpenseModel } from "../../../core/entities/Expense.entity";
import { Failure } from "../../../core/entities/Failure";
import { Success } from "../../../core/entities/Success";

export class ExpenseHttpService {
  constructor(private httpService: AxiosInstance) {}

  async create(
    expense: Omit<ExpenseModel, "id">
  ): Promise<Success<ExpenseModel> | Failure> {
    try {
      const response = await this.httpService.post<{ expense: ExpenseModel }>(
        "/expenses",
        expense
      );
      return new Success(response.data.expense);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      return new Failure();
    }
  }

  async update() {}

  async delete(id: string) {
    try {
      const response = await this.httpService.delete(`/delete?id=${id}`);

      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  }

  async migrate(expenses: ExpenseModel[]) {
    try {
      const response = await this.httpService.post("/migrate", expenses);

      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  }
}
