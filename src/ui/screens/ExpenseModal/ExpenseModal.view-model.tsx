import { useEffect, useState } from "react";
import { ExpenseModalView } from "./ExpenseModal.view";
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
import { useExpenses } from "@application/Hooks/useExpenses/useExpenses.hook";
import { isWeb } from "@application/utils/platform";
import { getWebDate } from "@application/utils/getWebDate";
import { useAuth } from "@application/Hooks/useAuth/useAuth.hook";
import { Expense } from "@domain/entities/Expense";

export function ExpenseModalViewModel(props: AddExpenseModalViewModelProps) {
  if (!props?.open) return null;

  const [formState, setFormState] = useState<ExpenseFormState>({});
  const [webDate, setWebDate] = useState<WebDateState>({});
  const [openAndroidDate, setOpenAndroidDate] = useState<OpenDateAndroid>({});
  const [errors, setErrors] = useState<ErrorState>(new Map());
  const [webDateErrors, setWebDateErrors] = useState<WebDateErrorState>(
    new Map()
  );
  const expenses = useExpenses();
  const [type, setType] = useState<ExpenseType>("loose");
  const { user } = useAuth();

  const isEdit = Boolean(props?.expense);

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

  const onSubmit = async () => {
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

      const expense = new Expense({
        id: props.expense?.id ?? null,
        description: formState.description || "",
        amount: amount,
        due_date: due_date || new Date(),
        paid: type === "expense" ? true : Boolean(formState.paid),
        paid_amount: formState.paid_amount,
        paid_date: paid_date,
        userId: user?.id,
        installment,
        installments,
        observation: formState.observation,
      });

      if (isEdit) {
        await expenses.update(expense);
      } else {
        await expenses.create(expense);
      }

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const openExpense = () => {
    if (props.expense) {
      const { expense } = props;

      setFormState({
        amount: String(expense.amount / 100),
        description: expense?.description,
        due_date: expense?.due_date,
        installment: String(expense?.installment || ""),
        installments: String(expense?.installments || ""),
        observation: expense?.observation,
        paid: expense?.paid,
        paid_amount: expense?.paid_amount,
        paid_date: expense?.paid_date,
      });

      const due_date = {
        day: expense?.due_date?.getDate(),
        month: expense?.due_date?.getMonth() + 1,
        year: expense?.due_date?.getFullYear(),
      };

      console.log({ due_date });

      setWebDate((state) => ({
        ...state,
        due_date,
      }));
    }
  };

  const onChangeType = (newType: ExpenseType) => {
    setType(newType);
  };

  useEffect(() => {
    openExpense();
  }, [props.expense]);

  return (
    <ExpenseModalView
      type={type}
      onClose={props.onClose}
      open={props.open}
      errors={errors}
      expense={props.expense}
      webDate={webDate}
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
