import { NavigationProp } from "@react-navigation/native";
import { ExpenseModel } from "../../commons/models/Expense.model";

type Expenses = {
  expenses: ExpenseModel[];
  setExpense: (expense: ExpenseModel) => Promise<void>;
  removeExpense: (expense_id: string) => Promise<void>;
};

export class ExpenseScreenService {
  async payExpense(expense: ExpenseModel, expenses: Expenses) {
    const paidExpense: ExpenseModel = { ...expense, paid: true };
    await expenses.setExpense(paidExpense);

    return paidExpense;
  }

  removeExpense(
    expense: ExpenseModel,
    expenses: Expenses,
    navigator: NavigationProp<ReactNavigation.RootParamList>
  ) {
    expenses.removeExpense(expense.id);
    navigator.goBack();
  }
}
