import { ExpenseModel } from "../../../../../commons/models/Expense.model";
import { ModalState } from "../../../Expenses.model";

export interface ExpenseFormState
  extends Partial<
    Omit<ExpenseModel, "id" | "amount" | "installment" | "installments">
  > {
  amount?: string;
  installment?: string;
  installments?: string;
}

export type WebDate = {
  day?: number;
  month?: number;
  year?: number;
};

export type DateLabel = keyof Pick<ExpenseFormState, "due_date" | "paid_date">;

export type WebDateState = {
  [label in keyof Pick<ExpenseFormState, "due_date" | "paid_date">]: WebDate;
};

export type OpenDateAndroid = {
  [label in keyof Pick<ExpenseFormState, "due_date" | "paid_date">]: boolean;
};

export type AddExpenseModalControllerProps = {
  onClose: () => void;
  type: ModalState["type"];
};

export type ErrorState = Map<keyof ExpenseFormState, string>;

export type WebDateErrorState = Map<keyof WebDate, string>;

export type AddExpenseModalViewModelProps = {
  open: boolean;
  type: ModalState["type"];
  onClose: () => void;
};

export type AddExpenseModalViewProps = AddExpenseModalViewModelProps &
  TAddExpenseModalModel;

export type TAddExpenseModalModel = {
  errors: ErrorState;
  webDateErrors: WebDateErrorState;
  formState: ExpenseFormState;
  openAndroidDate: OpenDateAndroid;
  onChangeDateNative: (label: DateLabel, date: Date) => void;
  onChange: (
    label: keyof ExpenseFormState
  ) => (value: ExpenseFormState[keyof ExpenseFormState]) => void;
  onSubmit: () => void;
  onChangeDateWeb: (
    key: DateLabel,
    label: "day" | "month" | "year"
  ) => (data: string) => void;
  handleOpenAndroidDate: (label: DateLabel) => () => void;
};
