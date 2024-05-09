import { ExpenseModel } from "../../../commons/entities/Expense.entity";

export type THomeModel = {
  payableExpenses: ExpenseModel[];
  onPressAccount: () => void;
  onPressExpenses: () => void;
  onPressSettings: () => void;
};
