import { ExpensesModel } from "./Expenses.model";
import { ExpensesView } from "./Expenses.view";

export function ExpensesViewModel() {
  const {
    openFAB,
    modal,
    selectedMonth,
    paidExpense,
    unPaidExpense,
    onSelectMonth,
    onStateChange,
    onChangeModal,
  } = ExpensesModel();

  return (
    <ExpensesView
      openFAB={openFAB}
      modal={modal}
      selectedMonth={selectedMonth}
      paidExpense={paidExpense}
      unPaidExpense={unPaidExpense}
      onSelectMonth={onSelectMonth}
      onStateChange={onStateChange}
      onChangeModal={onChangeModal}
    />
  );
}
