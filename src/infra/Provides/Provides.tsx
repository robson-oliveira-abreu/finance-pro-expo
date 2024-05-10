import React, { PropsWithChildren } from "react";

import { ExpenseProvider } from "../contexts/ExpensesContext";
import { CurrencyProvider } from "../contexts/CurrencyContext";
import { AuthProvider } from "../contexts/AuthContext";

const providers = [AuthProvider, ExpenseProvider, CurrencyProvider];

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      {providers.reduceRight(
        (prevProviders, Provider) => (
          <Provider>{prevProviders}</Provider>
        ),
        children
      )}
    </>
  );
}
