import { ExpensesModel } from "./Expenses.model";
import { ExpensesView } from "./Expenses.view";

export function ExpensesViewModel() {
  const {
    expenses,
    openFAB,
    modal,
    selectedMonth,
    getActions,
    getScreens,
    onSelectMonth,
    onStateChange,
    onChangeModal,
  } = ExpensesModel();

  return (
    <ExpensesView
      expenses={expenses}
      openFAB={openFAB}
      modal={modal}
      selectedMonth={selectedMonth}
      getActions={getActions}
      getScreens={getScreens}
      onSelectMonth={onSelectMonth}
      onStateChange={onStateChange}
      onChangeModal={onChangeModal}
    />
  );
}
