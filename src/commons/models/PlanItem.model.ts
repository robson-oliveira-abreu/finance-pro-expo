import { generateId } from "../generateId";

export type PlanItemType = "expense" | "revenue";

export type PlanItem = {
  id: string;
  type: PlanItemType;
  description: string;
  amount: number;
};

export function PlanItem(
  id: string | null = null,
  type: PlanItemType,
  description: string,
  amount: number
): PlanItem {
  return {
    id: id || generateId(),
    type,
    description,
    amount,
  };
}
