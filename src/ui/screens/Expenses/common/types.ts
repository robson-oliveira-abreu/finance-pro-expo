import { Expense } from "@core/entities/Expense";
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
    component: (props: { data: Expense[] }) => React.JSX.Element
  ) => TopTabScreen<{
    data: Expense[];
  }>[];
};
