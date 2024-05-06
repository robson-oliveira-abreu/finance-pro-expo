import { AxiosInstance } from "axios";
import { ExpenseModel } from "../../entities/Expense.entity";

export class ExpenseHttpService {
  constructor(private httpService: AxiosInstance) {}

  async create(expense: ExpenseModel): Promise<ExpenseModel | null> {
    try {
      const response = await this.httpService.post<{ expense: ExpenseModel }>(
        "/expense/create"
      );
      return response.data.expense;
    } catch (error) {
      // TODO notificar erro
      console.log(error);
      return null;
    }
  }

  async find(id: string): Promise<ExpenseModel | null> {
    try {
      if (!id) throw new Error("id  must be provided");

      const query = new URLSearchParams();

      if (id) query.set("id", id);

      const response = await this.httpService.get<{ expense: ExpenseModel }>(
        `/expense/find?${query.toString()}`
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

      const query = new URLSearchParams();

      if (userId) query.set("userId", userId);

      if (groupId) query.set("groupId", groupId);

      const response = await this.httpService.get<{ expenses: ExpenseModel[] }>(
        `/expense/list?${query.toString()}`
      );

      return response.data?.expenses;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async update() {}

  async delete() {}

  async migrate() {}
}
