import { generateId } from "../utils/generateId";

export type ExpenseModel = {
  id: string;
  description: string;
  amount: number;
  due_date: Date;
  installment: number;
  installments: number;
  observation: string;
  paid: boolean;
  paid_amount?: number;
  paid_date?: Date;
};

export function ExpenseModel(
  id: string | null = null,
  description: string,
  amount: number,
  due_date: Date = new Date(),
  installment: number = 1,
  installments: number = 1,
  observation: string = "",
  paid: boolean = false,
  paid_amount?: number,
  paid_date?: Date
): ExpenseModel {
  return {
    id: id || generateId(),
    description,
    amount,
    due_date: new Date(due_date),
    installment,
    installments,
    observation,
    paid,
    paid_amount,
    paid_date,
  };
}
