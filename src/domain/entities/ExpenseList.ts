import { ExpenseService } from "@domain/services/ExpenseService";
import { User } from "./User.entity";
import { Expense } from "./Expense";
import { CreateExpense } from "./CreateExpense";
import { Success } from "./Success";
import { Failure } from "./Failure";
import { AppError } from "./AppError";

export class ExpenseList {
  public expenses: Expense[];

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

  async create(
    expense: CreateExpense
  ): Promise<Success<ExpenseList> | Failure> {
    try {
      const response = await this.expenseService.create(expense);

      if (!response.success || !response.payload) {
        throw new AppError("Error on creating expense!");
      }

      const newExpenseList = this.newInstance(this);

      newExpenseList.expenses.push(response.payload);

      return new Success(this.newInstance(newExpenseList));
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on creating expense!");
    }
  }

  async list(
    user: User,
    groupId?: string
  ): Promise<Success<ExpenseList> | Failure> {
    try {
      const response = await this.expenseService.list({
        userId: user?.id,
        groupId,
      });

      if (!response.success || !response.payload) {
        throw new AppError("Error on list expenses!");
      }

      const newExpenseList = this.newInstance();
      newExpenseList.expenses = response.payload;

      return new Success(newExpenseList);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on lisnt expenses!");
    }
  }

  async update(
    id: string,
    expense: Partial<CreateExpense>
  ): Promise<Success<ExpenseList> | Failure> {
    try {
      const response = await this.expenseService.update(id, expense);

      if (!response.success || !response.payload) {
        throw new AppError("Error on updating expense!");
      }

      const newExpenseList = this.newInstance(this);

      const index = newExpenseList.expenses.findIndex((item) => item.id === id);

      if (index < 0) {
        throw new AppError("Expense index not found in expenseList!");
      }

      newExpenseList.expenses.splice(index, 0, response.payload);

      return new Success(newExpenseList);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on updating expense!");
    }
  }

  async delete(id: string): Promise<Success<ExpenseList> | Failure> {
    try {
      const response = await this.expenseService.delete(id);
      if (!response.success || !response.payload) {
        throw new AppError("Error on deleting expense!");
      }
      const newExpenseList = this.newInstance(this);

      const index = newExpenseList.expenses.findIndex((item) => item.id === id);

      if (index < 0) {
        throw new AppError("Expense index not found in expenseList!");
      }

      newExpenseList.expenses.splice(index, 1);

      return new Success(newExpenseList);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on deleting expense!");
    }
  }

  set(list: Expense[]) {
    this.expenses = list.sort(
      (a, b) => a.due_date.getTime() - b.due_date.getTime()
    );

    return this;
  }
}
