import { ExpenseService } from "@core/services/ExpenseService";
import { ExpenseModel } from "./Expense.entity";
import { User } from "./User.entity";

export class ExpenseList {
  public expenses: ExpenseModel[];

  constructor(
    expenseList: ExpenseList | null = null,
    private expenseService: ExpenseService
  ) {
    if (expenseList) {
      this.expenses = expenseList.expenses;
    }
  }

  private newInstance(expenseList: ExpenseList | null = null) {
    return new ExpenseList(expenseList, this.expenseService);
  }

  async create(expense: Omit<ExpenseModel, "id">): Promise<ExpenseList> {
    try {
      const response = await this.expenseService.create(expense);

      if (response.success && response.payload) {
        const newAuth = this.newInstance(this);

        newAuth.expenses.push(response.payload);

        return this.newInstance(newAuth);
      }

      return this;
    } catch (error) {
      console.log(error);
      return this;
    }
  }

  async list(user: User, groupId?: string): Promise<ExpenseList> {
    try {
      const response = await this.expenseService.list({
        userId: user?.id,
        groupId,
      });

      if (response.success && response.payload) {
        const newAuth = this.newInstance();
        newAuth.expenses = response.payload;

        return this.newInstance(newAuth);
      }

      return this;
    } catch (error) {
      console.log(error);
      return this;
    }
  }

  set(list: ExpenseModel[]) {
    this.expenses = list.sort(
      (a, b) => a.due_date.getTime() - b.due_date.getTime()
    );

    return this;
  }
}
