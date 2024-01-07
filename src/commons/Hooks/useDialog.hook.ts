import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export function useDialog() {
  return useContext(AlertContext);
}
