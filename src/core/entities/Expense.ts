type NewInstance = Pick<
  Expense,
  | "id"
  | "description"
  | "amount"
  | "paid"
  | "paid_amount"
  | "paid_date"
  | "userId"
> & {
  due_date?: Date;
  installment?: number;
  installments?: number;
  observation?: string;
};

export class Expense {
  public id: string | null;
  public description: string;
  public amount: number;
  public due_date: Date;
  public installment: number;
  public installments: number;
  public observation: string;
  public paid: boolean = false;
  public paid_amount?: number;
  public paid_date?: Date;
  public userId?: string;

  constructor(expense: NewInstance | null = null) {
    if (expense) {
      this.id = expense.id;
      this.description = expense.description;
      this.amount = expense.amount;
      this.paid = expense.paid;
      this.paid_amount = expense.paid_amount;
      this.paid_date = expense.paid_date;
      this.userId = expense.userId;
      this.due_date = expense.due_date ?? new Date();
      this.installment = expense.installment ?? 1;
      this.installments = expense.installments ?? 1;
      this.observation = expense.observation ?? "";
    }
  }
}
