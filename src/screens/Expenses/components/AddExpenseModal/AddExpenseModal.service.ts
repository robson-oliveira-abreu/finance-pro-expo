import { getWebDate } from "../../../../commons/utils/getWebDate";
import { ExpenseModel } from "../../../../commons/models/Expense.model";
import { isWeb } from "../../../../commons/utils/platform";
import {
  ErrorState,
  ExpenseFormState,
  WebDateErrorState,
  WebDateState,
} from "./types";
import { UseExpense } from "../../../../commons/Hooks/useExpensesContext.hook";
import { addMonths } from "date-fns";

export class AddExpenseModalService {
  static onSubmit(
    formState: ExpenseFormState,
    webDate: WebDateState,
    expenses: UseExpense,
    setErrors: React.Dispatch<React.SetStateAction<ErrorState>>,
    setWebDateErrors: React.Dispatch<React.SetStateAction<WebDateErrorState>>,
    closeModal: () => void
  ) {
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
            formState.paid,
            formState.paid_amount,
            paid_date
          )
        );

      expense_list.forEach((expense) => {
        if (expense) expenses?.setExpense(expense);
      });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  }
}
