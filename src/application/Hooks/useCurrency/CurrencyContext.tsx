import { PropsWithChildren, createContext } from "react";
import {
  ICurrencyContext,
  useCurrencyContext,
} from "@application/Hooks/useCurrency/useCurrencyContext.hook";

export const CurrencyContext = createContext<ICurrencyContext>({
  currency: "",
  setCurrency: () => {},
  parse: () => "parse",
});

export function CurrencyProvider({ children }: PropsWithChildren) {
  const currencyContext = useCurrencyContext();

  return (
    <CurrencyContext.Provider value={currencyContext}>
      {children}
    </CurrencyContext.Provider>
  );
}
