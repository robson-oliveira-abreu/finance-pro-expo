import { UseExpense } from "../../../commons/Hooks/useExpensesContext.hook";
import { ExpenseModel } from "../../../commons/models/Expense.model";
import { TopTabScreen } from "../../../infra/routes/TopTab.routes";
import { ModalState } from "../Expenses.model";

export type ExpensesViewProps = {} & TExpensesModel;

export type TExpensesModel = {
  expenses: UseExpense | null;
  openFAB: boolean;
  modal: ModalState;
  selectedMonth: string;
  onSelectMonth: (newMonth: string) => void;
  onStateChange: ({ open }) => void;
  onChangeModal: (type?: ModalState["type"]) => void;
  getActions: () => {
    icon: string;
    label: string;
    onPress: () => void;
  }[];
  getScreens: () =>
    | TopTabScreen<{
        data?: ExpenseModel[] | undefined;
      }>[]
    | undefined;
};
