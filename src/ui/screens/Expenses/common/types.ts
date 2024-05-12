import { ExpenseModel } from "@core/entities/Expense.entity";
import { TopTabScreen } from "@ui/routes/TopTab.routes";

export type ExpensesViewProps = {} & TExpensesModel;

export type ModalState = {
  open: boolean;
};

export type TExpensesModel = {
  modal: ModalState;
  selectedMonth: string;
  onSelectMonth: (newMonth: string) => void;
  onChangeModal: () => void;
  getScreens: (
    component: (props: { data: ExpenseModel[] }) => React.JSX.Element
  ) => TopTabScreen<{
    data: ExpenseModel[];
  }>[];
};
