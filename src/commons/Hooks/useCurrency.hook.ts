import { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ICurrencyContext } from "./useCurrencyContext.hook";

export function useCurrency(): ICurrencyContext {
  return useContext(CurrencyContext);
}
