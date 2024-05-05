import { ICurrencyContext } from "../../../commons/Hooks/useCurrencyContext.hook";
import { ExpenseModel as Expense } from "../../../commons/models/Expense.model";

export type ExpenseModel = {
  payExpense: () => Promise<void>;
  removeExpense: () => void;
  handleOpenEditExpense: () => void;
  expense: Expense | undefined;
  openEditExpense: boolean;
};

export type ExpenseViewProps = {
  currency: ICurrencyContext;
} & ExpenseModel;
