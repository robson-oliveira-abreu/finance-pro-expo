import { getWebDate } from "../../../../commons/getWebDate";
import { ExpenseModel } from "../../../../models/Expense.model";
import { isWeb } from "../../../../commons/platform";
import { ErrorState, ExpenseFormState, WebDateState } from "./types";
import { UseExpense } from "../../../../commons/Hooks/useExpenses.hook";
import { addMonths } from "date-fns";

export class AddExpenseModalService {
  static onSubmit(
    formState: ExpenseFormState,
    webDate: WebDateState,
    expenses: UseExpense,
    setErrors: React.Dispatch<React.SetStateAction<ErrorState>>,
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

      const amount = Number(formState.amount.replaceAll(",", ".")) * 100;
      const installment = Number(formState.installment) || 1;
      const installments = Number(formState.installments) || 1;

      const due_date = isWeb
        ? getWebDate(webDate?.due_date)
        : formState?.due_date;
      const paid_date = isWeb
        ? getWebDate(webDate?.paid_date)
        : formState?.paid_date;

      const expense_list = new Array(installments - installment + 1)
        .fill(null)
        .map(
          (_, index) =>
            new ExpenseModel(
              null,
              formState.description,
              amount,
              addMonths(due_date, index),
              installment + index,
              installments,
              formState.observation,
              formState.paid,
              formState.paid_amount,
              paid_date
            )
        );

      expense_list.forEach((expense) => expenses?.setExpense(expense));

      closeModal();
    } catch (error) {
      console.log(error);
    }
  }
}
