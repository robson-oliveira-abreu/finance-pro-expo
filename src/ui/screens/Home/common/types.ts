import { Expense } from "@core/entities/Expense";

export type THomeModel = {
  loading: boolean;
  payableExpenses: Expense[];
  onPressAccount: () => void;
  onPressExpenses: () => void;
  onPressSettings: () => void;
};
