import { AxiosInstance } from "axios";
import { ExpenseModel } from "../../entities/Expense.entity";

export class ExpenseHttpService {
  constructor(private httpService: AxiosInstance) {}

  async create(
    expense: Omit<ExpenseModel, "id">
  ): Promise<ExpenseModel | null> {
    try {
      const response = await this.httpService.post<{ expense: ExpenseModel }>(
        "/expense/create",
        expense
      );
      return response.data.expense;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async find(id: string): Promise<ExpenseModel | null> {
    try {
      if (!id) throw new Error("id  must be provided");

      const response = await this.httpService.get<{ expense: ExpenseModel }>(
        `/expense/find?id=${id}`
      );

      return response.data?.expense;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async list({ userId = "", groupId = "" }): Promise<ExpenseModel[]> {
    try {
      if (!groupId && !userId)
        throw new Error("groupId or userId must be provided");

      const query =
        "/expense/list?" +
        (userId && groupId
          ? `userId=${userId}&groupId=${groupId}`
          : userId
          ? `userId=${userId}`
          : `groupId=${groupId}`);

      const response = await this.httpService.get<{ expenses: ExpenseModel[] }>(
        query
      );

      return response.data?.expenses?.map(
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
    } catch (error) {
      console.log(error);
      return [];
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
