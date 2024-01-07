import React from "react";
import { ExpenseModel } from "../../commons/models/Expense.model";
import { TopTabScreen } from "../../infra/routes/TopTab.routes";
import { ExpenseList } from "./components/ExpenseList/ExpenseList.view";
import { ModalState } from "./Expenses.controller";

export class ExpensesScreenService {
  private filterPaidExpense = (expense: ExpenseModel) => expense.paid;
  private filterUnPaidExpense = (expense: ExpenseModel) => !expense.paid;

  getScreens(expenses: ExpenseModel[] | undefined, selectedMonth: string) {
    const _expenses = expenses?.filter(
      this.filterMonthExpenses(new Date(selectedMonth))
    );
    const unPaidExpense = _expenses?.filter(this.filterUnPaidExpense);
    const paidExpense = _expenses?.filter(this.filterPaidExpense);

    return [
      new TopTabScreen("A Pagar", <ExpenseList data={unPaidExpense} />),
      new TopTabScreen("Pago", <ExpenseList data={paidExpense} />),
    ];
  }

  getFABActions(onChangeModal: (type: ModalState["type"]) => void) {
    const expenseLooseAction = {
      icon: "plus",
      label: "Despesa avulsa",
      onPress: () => onChangeModal("loose"),
    };
    const expenseFixedAction = {
      icon: "pin",
      label: "Despesa fixa",
      onPress: () => onChangeModal("fixed"),
    };

    return [expenseLooseAction, expenseFixedAction];
  }

  filterMonthExpenses(selectedMonth: Date) {
    return function (expense: ExpenseModel) {
      if (!expense?.due_date) return;

      const date = new Date(expense?.due_date);
      const equalYear = date?.getFullYear() === selectedMonth?.getFullYear();
      const equalMonth = date?.getMonth() === selectedMonth?.getMonth();

      return equalYear && equalMonth;
    };
  }
}
