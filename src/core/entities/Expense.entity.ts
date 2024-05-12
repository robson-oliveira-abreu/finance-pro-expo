import uuid from "react-native-uuid"; // TODO remover do core
import { CreateExpense } from "./CreateExpense";

export class ExpenseModel {
  public id: string;

  constructor(
    id: string | null,
    public description: string,
    public amount: number,
    public due_date: Date = new Date(),
    public installment: number = 1,
    public installments: number = 1,
    public observation: string = "",
    public paid: boolean = false,
    public paid_amount?: number,
    public paid_date?: Date,
    public userId?: string
  ) {
    this.id = id || (uuid.v4() as string);
    this.due_date = new Date(due_date);
    this.paid_date = paid_date ? new Date(paid_date) : undefined;
  }

  pay(amount?: number) {
    return {
      paid: true,
      paid_date: new Date(),
      paid_amount: amount ?? this.paid_amount,
    };
  }

  toCreateObject(): CreateExpense {
    return {
      description: this.description,
      amount: this.amount,
      due_date: this.due_date,
      installment: this.installment,
      installments: this.installments,
      observation: this.observation,
      paid: this.paid,
      paid_amount: this.paid_amount,
      paid_date: this.paid_date,
      userId: this.userId,
    };
  }
}
