import { ExpenseProvider } from "src/application/Hooks/useExpenses/ExpensesContext";
import { CurrencyProvider } from "src/application/Hooks/useCurrency/CurrencyContext";
import { AuthProvider } from "src/application/Hooks/useAuth/AuthContext";
import { ToastProvider } from "react-native-toast-notifications";

export const providers = [
  AuthProvider,
  ExpenseProvider,
  CurrencyProvider,
  ({ children }) => <ToastProvider placement="top">{children}</ToastProvider>,
];
