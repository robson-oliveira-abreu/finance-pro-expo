import React, { PropsWithChildren } from "react";

import { ExpenseProvider } from "@infra/Hooks/useExpenses/ExpensesContext";
import { CurrencyProvider } from "@infra/Hooks/useCurrency/CurrencyContext";
import { AuthProvider } from "@infra/Hooks/useAuth/AuthContext";

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
