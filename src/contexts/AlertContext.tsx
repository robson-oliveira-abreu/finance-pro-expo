import React, { createContext } from "react";
import { useDialogContext } from "../commons/Hooks/useDialog.hook";

export const AlertContext = createContext<ReturnType<
  typeof useDialogContext
> | null>(null);

export function AlertProvider({ children }) {
  const context = useDialogContext();

  return (
    <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
  );
}
