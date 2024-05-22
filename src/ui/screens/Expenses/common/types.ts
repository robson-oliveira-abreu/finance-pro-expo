import { Expense } from "@domain/entities/Expense";
import { TopTabScreen } from "@infra/routes/TopTab.routes";

export type ExpensesViewProps = {
  isDark: (...classes: string[]) => string;
} & TExpensesModel;

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
