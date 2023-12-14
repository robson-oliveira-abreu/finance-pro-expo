import { getWebDate } from "../../../../commons/getWebDate";
import { ExpenseModel } from "../../../../models/Expense.model";
import { useState } from "react";
import { useExpenses } from "../../../../commons/Hooks/useExpenses.hook";
import {
  ExpenseFormState,
  AddExpenseModalControllerProps,
  WebDateState,
  OpenDateAndroid,
  DateLabel,
  ErrorState,
} from "./types";
import { isWeb } from "../../../../commons/platform";
import { AddExpenseModalService } from "./AddExpenseModal.service";

function AddExpenseModalController(props: AddExpenseModalControllerProps) {
  const [formState, setFormState] = useState<ExpenseFormState>({});
  const [webDate, setWebDate] = useState<WebDateState>({});
  const [openAndroidDate, setOpenAndroidDate] = useState<OpenDateAndroid>({});
  const [errors, setErrors] = useState<ErrorState>(new Map());
  const expenses = useExpenses();

  const onChange = (label: keyof ExpenseFormState) => {
    return (value: ExpenseFormState[keyof ExpenseFormState]) => {
      errors.set(label, "");
      setFormState((state) => ({
        ...state,
        [label]: value,
      }));
    };
  };

  const onChangeDateWeb = (key: DateLabel, label: "day" | "month" | "year") => {
    return (data: string) => {
      setWebDate((state) => ({
        ...state,
        [key]: { ...state[key], [label]: data },
      }));
    };
  };

  const onChangeDateNative = (label: DateLabel, date: Date) => {
    setOpenAndroidDate((state) => ({ ...state, [label]: false }));
    onChange(label)(date);
  };

  const handleOpenAndroidDate = (label: DateLabel) => {
    return () => setOpenAndroidDate((state) => ({ ...state, [label]: true }));
  };

  const closeModal = () => {
    setFormState({});
    setErrors(new Map());
    props.onClose();
  };

  const onSubmit = () =>
    AddExpenseModalService.onSubmit(
      formState,
      webDate,
      expenses,
      setErrors,
      closeModal
    );

  return {
    errors,
    formState,
    openAndroidDate,
    onChange,
    onSubmit,
    onChangeDateWeb,
    handleOpenAndroidDate,
    onChangeDateNative,
  };
}

export { AddExpenseModalController };
