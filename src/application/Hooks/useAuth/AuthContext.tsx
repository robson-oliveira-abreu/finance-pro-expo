import { PropsWithChildren, createContext } from "react";
import { User } from "@domain/entities/User.entity";
import { useAuthContext } from "src/application/Hooks/useAuth/useAuthContext.hook";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  signout: () => void;
}>({
  user: null,
  isAuthenticated: false,
  loading: false,
  signin: function (): void {},
  signup: function (): void {},
  signout: function (): void {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const value = useAuthContext();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
