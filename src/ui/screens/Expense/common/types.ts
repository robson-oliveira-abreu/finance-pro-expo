import { ICurrencyContext } from "@infra/Hooks/useCurrency/useCurrencyContext.hook";
import { ExpenseModel as Expense } from "@core/entities/Expense.entity";

export type ExpenseModel = {
  payExpense: () => Promise<void>;
  removeExpense: () => void;
  handleOpenEditExpense: () => void;
  expense?: Expense | null;
  openEditExpense: boolean;
};

export type ExpenseViewProps = {
  currency: ICurrencyContext;
} & ExpenseModel;

export type ExpenseRouteProps = {
  expense?: ExpenseModel;
};
