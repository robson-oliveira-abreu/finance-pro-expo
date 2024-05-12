import { useMemo, useState } from "react";
import { useExpenses } from "@infra/Hooks/useExpenses/useExpenses.hook";
import { ExpenseModel } from "@core/entities/Expense.entity";
import { TopTabScreen } from "@ui/routes/TopTab.routes";
import { ExpensesView } from "./Expenses.view";
import { filterMonthExpenses } from "@infra/utils/filterExpensesByMonth";
import { ModalState } from "./common/types";

const defaultModalState: ModalState = {
  open: false,
};

export function ExpensesViewModel() {
  const { expenses } = useExpenses();
  const [modal, setModal] = useState<ModalState>(defaultModalState);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toDateString());

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
      [new Array<ExpenseModel>(), new Array<ExpenseModel>()]
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
    component: (props: { data: ExpenseModel[] }) => React.JSX.Element
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
      modal={modal}
      selectedMonth={selectedMonth}
      onSelectMonth={onSelectMonth}
      onChangeModal={onChangeModal}
      getScreens={getScreens}
    />
  );
}
