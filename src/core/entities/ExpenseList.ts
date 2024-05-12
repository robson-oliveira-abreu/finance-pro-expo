import { ExpenseService } from "@core/services/ExpenseService";
import { ExpenseModel } from "./Expense.entity";
import { User } from "./User.entity";
import { Expense } from "./Expense";
import { CreateExpense } from "./CreateExpense";

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

  async create(expense: CreateExpense): Promise<ExpenseList> {
    try {
      const response = await this.expenseService.create(expense);

      if (response.success && response.payload) {
        const newExpenseList = this.newInstance(this);

        newExpenseList.expenses.push(response.payload);

        return this.newInstance(newExpenseList);
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
        const newExpenseList = this.newInstance();
        newExpenseList.expenses = response.payload;

        return newExpenseList;
      }

      return this;
    } catch (error) {
      console.log(error);
      return this;
    }
  }

  async update(id: string, expense: Partial<Expense>): Promise<ExpenseList> {
    try {
      const response = await this.expenseService.update(id, expense);

      if (response.success && response.payload) {
        const newExpenseList = this.newInstance(this);

        const index = newExpenseList.expenses.findIndex(
          (item) => item.id === id
        );

        if (index < 0) {
          return this;
        }

        newExpenseList.expenses.splice(index, 0, response.payload);

        return newExpenseList;
      }

      return this;
    } catch (error) {
      console.log(error);
      return this;
    }
  }

  async delete(id: string): Promise<ExpenseList> {
    try {
      const response = await this.expenseService.delete(id);

      if (response.success && response.payload) {
        const newExpenseList = this.newInstance(this);

        const index = newExpenseList.expenses.findIndex(
          (item) => item.id === id
        );

        if (index < 0) {
          return this;
        }

        newExpenseList.expenses.splice(index, 1);

        return newExpenseList;
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
