import { ExpenseModel } from "../../../commons/models/Expense.model";

export type THomeModel = {
  onPressMenu: () => void;
  payableExpenses: ExpenseModel[];
};
