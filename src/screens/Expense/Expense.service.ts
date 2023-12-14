import { NavigationProp } from "@react-navigation/native";
import { ExpenseModel } from "../../models/Expense.model";

type Expenses = {
  expenses: ExpenseModel[];
  setExpense: (expense: ExpenseModel) => Promise<void>;
  removeExpense: (expense_id: string) => Promise<void>;
};

export class ExpenseScreenService {
  static payExpense(expense: ExpenseModel, expenses: Expenses) {
    expense.pay();
    expenses.setExpense(expense);
  }

  static removeExpense(
    expense: ExpenseModel,
    expenses: Expenses,
    navigator: NavigationProp<ReactNavigation.RootParamList>
  ) {
    expenses.removeExpense(expense.id);
    navigator.goBack();
  }
}
