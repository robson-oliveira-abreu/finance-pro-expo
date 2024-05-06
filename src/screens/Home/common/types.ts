import { ExpenseModel } from "../../../commons/entities/Expense.entity";

export type THomeModel = {
  payableExpenses: ExpenseModel[];
  onPressMenu: () => void;
  onPressAccount: () => void;
  onPressExpenses: () => void;
};
