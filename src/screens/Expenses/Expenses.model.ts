import { useMemo, useState } from "react";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { ExpenseModel } from "../../commons/models/Expense.model";
import { TExpensesModel } from "./common/types";
import { filterMonthExpenses } from "../../commons/utils/filterExpensesByMonth";

export type ModalState = {
  open: boolean;
  type?: "fixed" | "loose" | "expense";
};

const defaultModalState: ModalState = {
  open: false,
  type: "loose",
};

export function ExpensesModel(): TExpensesModel {
  const { expenses } = useExpenses();
  const [openFAB, setOpenFAB] = useState(false);
  const [modal, setModal] = useState<ModalState>(defaultModalState);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toDateString());

  const { unPaidExpense, paidExpense } = useMemo(() => {
    const filter = filterMonthExpenses(new Date(selectedMonth));

    const [paidExpense, unPaidExpense] = expenses?.reduce(
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

    return { paidExpense, unPaidExpense };
  }, [expenses]);

  const onStateChange = ({ open }) => {
    setOpenFAB(open);
  };

  const onChangeModal = (type?: ModalState["type"]) => {
    return () => {
      setModal((state) =>
        state.open ? defaultModalState : { open: true, type }
      );
    };
  };

  const onSelectMonth = (newMonth: string) => {
    setSelectedMonth(newMonth);
  };

  return {
    openFAB,
    modal,
    selectedMonth,
    unPaidExpense,
    paidExpense,
    onSelectMonth,
    onStateChange,
    onChangeModal,
  };
}
