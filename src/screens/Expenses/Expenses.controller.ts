import { useState } from "react";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { ExpensesScreenService } from "./Expenses.service";

export type ModalState = {
  open: boolean;
  type?: "fixed" | "loose";
};

const defaultModalState: ModalState = {
  open: false,
  type: "loose",
};

export function ExpensesController() {
  const expenses = useExpenses();
  const [openFAB, setOpenFAB] = useState(false);
  const [modal, setModal] = useState<ModalState>(defaultModalState);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toDateString());
  const expensesScreenService = new ExpensesScreenService();

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
    return expensesScreenService.getScreens(expenses?.expenses, selectedMonth);
  };

  const getActions = () => {
    return expensesScreenService.getFABActions(onChangeModal);
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
