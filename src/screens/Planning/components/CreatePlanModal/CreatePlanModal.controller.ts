import { useState } from "react";
import {
  PlanItem,
  PlanItemType,
} from "../../../../commons/entities/PlanItem.entity";
import { CreatePlanProps } from "./types";
import { usePlanItems } from "../../../../commons/Hooks/usePlanItems.hook";
import { CreatePlanModalService } from "./CreatePlanModal.service";

export type PlanItemFormState = {
  amount: string;
} & Omit<PlanItem, "id" | "amount">;

const defaultPlanItemState: PlanItemFormState = {
  amount: "",
  description: "",
  type: "expense",
};

export function CreatePlanModalController(props: CreatePlanProps) {
  const planItems = usePlanItems();
  const [planType, setPlanType] = useState<PlanItemType>("expense");
  const [planItemFormData, setPlanItemFormData] =
    useState<PlanItemFormState>(defaultPlanItemState);

  const onTypeChange = (newType: PlanItemType) => {
    setPlanType(newType);
    onChange("type")(newType);
  };

  const onChange = (label: keyof PlanItemFormState) => {
    return (value: string) => {
      setPlanItemFormData((state) => ({
        ...state,
        [label]: value,
      }));
    };
  };

  const onSubmit = () => {
    CreatePlanModalService.onSubmit(
      planItemFormData,
      planItems,
      props.closeModal
    );
  };

  return { planType, planItemFormData, onTypeChange, onChange, onSubmit };
}
