import { useContext } from "react";
import { PlanItemsContext } from "../contexts/PlanItemsContext";
import { UsePlanItem } from "./usePlanItemsContext.hook";

export function usePlanItems(): UsePlanItem | null {
  return useContext(PlanItemsContext);
}
