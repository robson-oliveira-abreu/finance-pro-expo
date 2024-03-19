import { ExpenseModel } from "../../../commons/models/Expense.model";
import { ModalState } from "../Expenses.model";

export type ExpensesViewProps = {} & TExpensesModel;

export type TExpensesModel = {
  openFAB: boolean;
  modal: ModalState;
  selectedMonth: string;
  onSelectMonth: (newMonth: string) => void;
  onStateChange: ({ open }) => void;
  onChangeModal: (type?: ModalState["type"]) => () => void;
  unPaidExpense: ExpenseModel[];
  paidExpense: ExpenseModel[];
};
