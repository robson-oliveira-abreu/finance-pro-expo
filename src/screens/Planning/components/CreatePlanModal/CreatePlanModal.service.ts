import { UsePlanItem } from "../../../../commons/Hooks/usePlanItemsContext.hook";
import { PlanItemFormState } from "./CreatePlanModal.controller";
import { PlanItem } from "../../../../commons/entities/PlanItem.entity";

function onSubmit(
  planItemFormState: PlanItemFormState,
  planItems: UsePlanItem | null,
  closeModal: () => void
) {
  try {
    const amount = Math.round(
      Number(planItemFormState.amount.replaceAll(",", ".")) * 100
    );

    if (
      planItemFormState.type !== "revenue" &&
      planItemFormState.type !== "expense"
    ) {
      return;
    }

    if (
      !planItemFormState.description ||
      !planItemFormState.type ||
      !Number.isSafeInteger(amount)
    ) {
      return console.log("invalid fields");
    }

    const planItem = PlanItem(
      null,
      planItemFormState.type,
      planItemFormState.description,
      amount
    );

    planItems?.setPlanItem(planItem);
    closeModal();
  } catch (error) {
    console.log(error);
  }
}

export const CreatePlanModalService = {
  onSubmit,
};
