import React from "react";
import { ExpenseModel } from "../../models/Expense.model";
import { TopTabScreen } from "../../routes/TopTab.routes";
import { ExpenseList } from "./components/ExpenseList/ExpenseList.view";
import { ModalState } from "./Expenses.controller";

export class ExpensesScreenService {
  private static filterPaidExpense = (expense: ExpenseModel) => expense.paid;
  private static filterUnPaidExpense = (expense: ExpenseModel) => !expense.paid;

  static getScreens = (expenses: ExpenseModel[]) => [
    new TopTabScreen(
      "A Pagar",
      <ExpenseList data={expenses.filter(this.filterUnPaidExpense)} />
    ),
    new TopTabScreen(
      "Pago",
      <ExpenseList data={expenses.filter(this.filterPaidExpense)} />
    ),
  ];

  static getFABActions = (
    onChangeModal: (type: ModalState["type"]) => void
  ) => [
    {
      icon: "plus",
      label: "Despesa avulsa",
      onPress: () => onChangeModal("loose"),
    },
    {
      icon: "pin",
      label: "Despesa fixa",
      onPress: () => onChangeModal("fixed"),
    },
  ];
}
