import { ICurrencyContext } from "@application/Hooks/useCurrency/useCurrencyContext.hook";
import { Expense } from "@domain/entities/Expense";

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
  expense?: Expense;
};
