import { useEffect, useState } from "react";
import { PlanItem } from "../entities/PlanItem.entity";
import { PlaItemService } from "../services/local/planItem.service";

export type UsePlanItem = {
  planItems: PlanItem[];
  setPlanItem: (planItem: PlanItem) => Promise<void>;
  removePlanItem: (plan_item_id: string) => Promise<void>;
  totalExpenses: number;
  totalRevenue: number;
};

export function usePlanItemsContext(): UsePlanItem {
  const planItemsService = PlaItemService();
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);

  const getPlanItems = async () => {
    const _planItems = await planItemsService.list();
    if (_planItems) setPlanItems(_planItems);
  };

  const setPlanItem = async (planItem: PlanItem) => {
    await planItemsService.set(planItem);

    getPlanItems();
  };

  const removePlanItem = async (plan_item_id: string) => {
    await planItemsService.remove(plan_item_id);

    getPlanItems();
  };

  const totalExpenses = planItems
    .filter((planItem) => planItem.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalRevenue = planItems
    .filter((planItem) => planItem.type === "revenue")
    .reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    getPlanItems();
  }, []);

  return {
    planItems,
    setPlanItem,
    removePlanItem,
    totalExpenses,
    totalRevenue,
  };
}
