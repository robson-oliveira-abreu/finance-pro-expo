import React, { createContext } from "react";
import { usePlanItemsContext } from "../Hooks/usePlanItemsContext.hook";

export const PlanItemsContext = createContext<ReturnType<
  typeof usePlanItemsContext
> | null>(null);

export function PlanItemsProvider({ children }) {
  const context = usePlanItemsContext();

  return (
    <PlanItemsContext.Provider value={context}>
      {children}
    </PlanItemsContext.Provider>
  );
}
