import { useMemo, useState } from "react";
import { useExpenses } from "@application/Hooks/useExpenses/useExpenses.hook";
import { Expense } from "@domain/entities/Expense";
import { TopTabScreen } from "@infra/routes/TopTab.routes";
import { ExpensesView } from "./Expenses.view";
import { filterMonthExpenses } from "@application/utils/filterExpensesByMonth";
import { ModalState } from "./common/types";
import { useTheme } from "@application/Hooks/useTheme";

const defaultModalState: ModalState = {
  open: false,
};

export function ExpensesViewModel() {
  const { expenses } = useExpenses();
  const [modal, setModal] = useState<ModalState>(defaultModalState);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toDateString());
  const { isDark } = useTheme();

  const { unPaidExpense, paidExpense } = useMemo(() => {
    const filter = filterMonthExpenses(new Date(selectedMonth));

    const [paidExpense, unPaidExpense] = (expenses || []).reduce(
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
      [new Array<Expense>(), new Array<Expense>()]
    );

    return { paidExpense, unPaidExpense };
  }, [expenses, selectedMonth]);

  const onChangeModal = () => {
    setModal((state) => (state.open ? defaultModalState : { open: true }));
  };

  const onSelectMonth = (newMonth: string) => {
    setSelectedMonth(newMonth);
  };

  const getScreens = function (
    component: (props: { data: Expense[] }) => React.JSX.Element
  ) {
    return [
      new TopTabScreen("A Pagar", component, {
        data: unPaidExpense,
      }),
      new TopTabScreen("Pago", component, {
        data: paidExpense,
      }),
    ];
  };

  return (
    <ExpensesView
      isDark={isDark}
      modal={modal}
      selectedMonth={selectedMonth}
      onSelectMonth={onSelectMonth}
      onChangeModal={onChangeModal}
      getScreens={getScreens}
    />
  );
}
