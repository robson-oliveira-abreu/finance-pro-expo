import { useEffect, useState } from "react";
import { AddExpenseModalView } from "./AddExpenseModal.view";
import {
  AddExpenseModalViewModelProps,
  DateLabel,
  ErrorState,
  ExpenseFormState,
  ExpenseType,
  OpenDateAndroid,
  WebDateErrorState,
  WebDateState,
} from "./common/types";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { isWeb } from "../../commons/utils/platform";
import { getWebDate } from "../../commons/utils/getWebDate";
import { ExpenseModel } from "../../commons/entities/Expense.entity";
import { addMonths } from "date-fns";

export function AddExpenseModalViewModel(props: AddExpenseModalViewModelProps) {
  const [formState, setFormState] = useState<ExpenseFormState>({});
  const [webDate, setWebDate] = useState<WebDateState>({});
  const [openAndroidDate, setOpenAndroidDate] = useState<OpenDateAndroid>({});
  const [errors, setErrors] = useState<ErrorState>(new Map());
  const [webDateErrors, setWebDateErrors] = useState<WebDateErrorState>(
    new Map()
  );
  const expenses = useExpenses();
  const [type, setType] = useState<ExpenseType>("expense");

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

  const onSubmit = () => {
    try {
      if (!formState.description || !formState.amount) {
        setErrors((state) => {
          const newState: ErrorState = new Map(state);

          if (!formState.description) {
            newState.set("description", "Descrição é obrigatoria");
          }

          if (!formState.amount) {
            newState.set("amount", "Valor é obrigatorio");
          }

          return newState;
        });
        return;
      }

      if (isWeb) {
        if (
          !webDate.due_date?.day ||
          webDate.due_date.day.toString().length > 2
        )
          return setWebDateErrors((state) => {
            const newState = new Map(state);
            newState.set("day", "Dia invalido");
            return newState;
          });

        if (
          !webDate.due_date?.month ||
          webDate.due_date.month.toString().length > 2
        )
          return setWebDateErrors((state) => {
            const newState = new Map(state);
            newState.set("month", "mês invalido");
            return newState;
          });

        if (![2, 4].includes(webDate.due_date?.year?.toString().length || 0))
          return setWebDateErrors((state) => {
            const newState = new Map(state);

            newState.set("year", "Ano invalido");

            return newState;
          });
      }

      const amount = Math.round(
        Number(formState.amount.replaceAll(",", ".")) * 100
      );
      const installment = Number(formState.installment) || 1;
      const installments = Number(formState.installments) || 1;

      const due_date = isWeb
        ? getWebDate(webDate?.due_date)
        : formState.due_date;
      const paid_date = isWeb
        ? getWebDate(webDate?.paid_date)
        : formState?.paid_date;

      console.log({ type });

      const expense_list = new Array(installments - installment + 1)
        .fill(null)
        .map((_, index) =>
          ExpenseModel(
            null,
            formState.description || "",
            amount,
            addMonths(due_date || new Date(), index),
            installment + index,
            installments,
            formState.observation,
            type === "expense" ? true : formState.paid,
            formState.paid_amount,
            paid_date
          )
        );

      expense_list.forEach((expense) => {
        expenses.setExpense(expense);
      });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const openExpense = () => {
    if (props.expense) {
      const { expense } = props;

      setFormState({
        amount: String(expense?.amount || ""),
        description: expense?.description,
        due_date: expense?.due_date,
        installment: String(expense?.installment || ""),
        installments: String(expense?.installments || ""),
        observation: expense?.observation,
        paid: expense?.paid,
        paid_amount: expense?.paid_amount,
        paid_date: expense?.paid_date,
      });
    }
  };

  const onChangeType = (newType: ExpenseType) => {
    setType(newType);
  };

  useEffect(() => {
    openExpense();
  }, [props.expense]);

  return (
    <AddExpenseModalView
      type={type}
      onClose={props.onClose}
      open={props.open}
      errors={errors}
      expense={props.expense}
      webDateErrors={webDateErrors}
      formState={formState}
      openAndroidDate={openAndroidDate}
      onChange={onChange}
      onSubmit={onSubmit}
      onChangeDateWeb={onChangeDateWeb}
      handleOpenAndroidDate={handleOpenAndroidDate}
      onChangeDateNative={onChangeDateNative}
      onChangeType={onChangeType}
    />
  );
}
