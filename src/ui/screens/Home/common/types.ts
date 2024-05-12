import { ExpenseModel } from "@core/entities/Expense.entity";

export type THomeModel = {
  loading: boolean;
  payableExpenses: ExpenseModel[];
  onPressAccount: () => void;
  onPressExpenses: () => void;
  onPressSettings: () => void;
};
