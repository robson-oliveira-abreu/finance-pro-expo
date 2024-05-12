import { Expense } from "./Expense";

export class CreateExpense {
  description: string;
  amount: number;
  paid: boolean;
  paid_amount?: number;
  userId?: string;
  paid_date?: Date;
  due_date?: Date;
  installment?: number;
  installments?: number;
  observation?: string;
}
