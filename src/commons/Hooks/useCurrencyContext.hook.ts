import { useState } from "react";

export type ICurrencyContext = {
  currency: string;
  setCurrency: (value: "USD" | "BRL") => void;
  parse: (value: number) => string;
};

export function useCurrencyContext(): ICurrencyContext {
  const [currency, setCurrency] = useState("USD");

  function parse(value: number): string {
    const total = (value / 100)?.toLocaleString("en-US", {
      style: "currency",
      currency,
    });

    return Number(value) ? total : "";
  }

  function changeCurrency(value: "USD" | "BRL") {
    setCurrency(value);
  }

  return {
    currency,
    setCurrency: changeCurrency,
    parse,
  };
}
