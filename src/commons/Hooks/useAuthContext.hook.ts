import { useEffect, useState } from "react";
import { User } from "../entities/User.entity";
import { AuthHttpService } from "../services/http/AuthHttpService";
import { httpService } from "../services/http/HttpService";
import { AuthTokenLocalService } from "../services/local/AuthLocalService";
import { UserLocalService } from "../services/local/UserLocalService";

export function useAuthContext() {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user?.id);

  const authHttpService = new AuthHttpService(
    httpService,
    new UserLocalService(),
    new AuthTokenLocalService()
  );

  async function signin(email: string, password: string) {
    const result = await authHttpService.signin(email, password);

    if (result.success) {
      setUser(result.user);
    }
  }

  async function signup(email: string, password: string, name: string) {
    const result = await authHttpService.signup({ email, password, name });

    if (result.success) {
      setUser(result.user);
    }
  }

  function signout() {
    setUser(null);
    authHttpService.signout();
  }

  return {
    isAuthenticated,
    user,
    signin,
    signup,
    signout,
  };
}
