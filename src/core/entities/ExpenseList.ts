import { ExpenseModel } from "./Expense.entity";

export class ExpenseList {
  public list: ExpenseModel[];

  constructor(list?: ExpenseModel[]) {
    if (list) {
      this.list = list;
    }
  }

  set(list: ExpenseModel[]) {
    this.list = list.sort(
      (a, b) => a.due_date.getTime() - b.due_date.getTime()
    );

    return this;
  }
}
