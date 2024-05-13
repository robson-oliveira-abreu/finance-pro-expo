import { ExpenseProvider } from "@infra/Hooks/useExpenses/ExpensesContext";
import { CurrencyProvider } from "@infra/Hooks/useCurrency/CurrencyContext";
import { AuthProvider } from "@infra/Hooks/useAuth/AuthContext";
import { ToastProvider } from "react-native-toast-notifications";

export const providers = [
  AuthProvider,
  ExpenseProvider,
  CurrencyProvider,
  ToastProvider,
];
