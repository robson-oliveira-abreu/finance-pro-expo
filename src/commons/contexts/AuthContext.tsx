import { PropsWithChildren, createContext } from "react";
import { User } from "../entities/User.entity";
import { useAuthContext } from "../Hooks/useAuthContext.hook";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
  signin?: (email: string, password: string) => Promise<void>;
  signup?: (email: string, password: string, name: string) => Promise<void>;
  signout?: () => void;
}>({
  user: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const value = useAuthContext();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
