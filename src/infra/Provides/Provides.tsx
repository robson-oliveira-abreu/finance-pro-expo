import React, { PropsWithChildren } from "react";

import { ExpenseProvider } from "../Hooks/useExpenses/ExpensesContext";
import { CurrencyProvider } from "../Hooks/useCurrency/CurrencyContext";
import { AuthProvider } from "../Hooks/useAuth/AuthContext";

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
