import { ExpenseModel } from "../../../commons/models/Expense.model";

export type THomeModel = {
  payableExpenses: ExpenseModel[];
  onPressMenu: () => void;
  onPressAccount: () => void;
  onPressExpenses: () => void;
};
