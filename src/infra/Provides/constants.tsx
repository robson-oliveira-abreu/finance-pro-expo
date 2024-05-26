import { ExpenseProvider } from "@application/Hooks/useExpenses/ExpensesContext";
import { CurrencyProvider } from "@application/Hooks/useCurrency/CurrencyContext";
import { AuthProvider } from "@application/Hooks/useAuth/AuthContext";
import { ToastProvider } from "react-native-toast-notifications";

export const providers = [
  AuthProvider,
  ExpenseProvider,
  CurrencyProvider,
  ({ children }) => <ToastProvider placement="top">{children}</ToastProvider>,
];
