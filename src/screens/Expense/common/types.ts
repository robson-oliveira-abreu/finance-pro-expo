import { ExpenseModel as Expense } from "../../../commons/models/Expense.model";

export type ExpenseModel = {
  payExpense: () => Promise<void>;
  removeExpense: () => void;
  goBack: () => void;
  expense: Expense | undefined;
};

export type ExpenseViewProps = {} & ExpenseModel;
