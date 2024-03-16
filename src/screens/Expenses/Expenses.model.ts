import { useState } from "react";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { TopTabScreen } from "../../infra/routes/TopTab.routes";
import { ExpenseList } from "./components/ExpenseList/ExpenseList.view";
import { ExpenseModel } from "../../commons/models/Expense.model";
import { TExpensesModel } from "./common/types";
import { filterMonthExpenses } from "../../commons/utils/filterExpensesByMonth";

export type ModalState = {
  open: boolean;
  type?: "fixed" | "loose";
};

const defaultModalState: ModalState = {
  open: false,
  type: "loose",
};

export function ExpensesModel(): TExpensesModel {
  const expenses = useExpenses();
  const [openFAB, setOpenFAB] = useState(false);
  const [modal, setModal] = useState<ModalState>(defaultModalState);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toDateString());

  const onStateChange = ({ open }) => {
    setOpenFAB(open);
  };

  const onChangeModal = (type?: ModalState["type"]) => {
    setModal((state) =>
      state.open ? defaultModalState : { open: true, type }
    );
  };

  const onSelectMonth = (newMonth: string) => {
    setSelectedMonth(newMonth);
  };

  const getScreens = () => {
    if (!expenses) return;

    const filter = filterMonthExpenses(new Date(selectedMonth));

    const [paidExpense, unPaidExpense] = expenses.expenses.reduce(
      (acc, curr) => {
        if (!filter(curr)) {
          return acc;
        }

        const [paid, unPaid] = acc;

        if (curr.paid) {
          paid.push(curr);
        } else {
          unPaid.push(curr);
        }

        return [paid, unPaid];
      },
      [new Array<ExpenseModel>(), new Array<ExpenseModel>()]
    );

    return [
      new TopTabScreen<{ data?: ExpenseModel[] }>("A Pagar", ExpenseList, {
        data: unPaidExpense,
      }),
      new TopTabScreen<{ data?: ExpenseModel[] }>("Pago", ExpenseList, {
        data: paidExpense,
      }),
    ];
  };

  const getActions = () => {
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
  };

  return {
    expenses,
    openFAB,
    modal,
    selectedMonth,
    getActions,
    getScreens,
    onSelectMonth,
    onStateChange,
    onChangeModal,
  };
}
