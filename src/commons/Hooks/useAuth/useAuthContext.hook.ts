import { useEffect, useState } from "react";
import { User } from "../../entities/User.entity";
import { AuthHttpService } from "../../services/http/AuthHttpService";
import { httpService } from "../../services/http/HttpService";
import { AuthTokenLocalService } from "../../services/local/AuthLocalService";
import { UserLocalService } from "../../services/local/UserLocalService";

export function useAuthContext() {
  const [user, setUser] = useState<User | null>(null);
  const [loadings, setLoadings] = useState({
    getUser: false,
    signin: false,
    signup: false,
    getToken: false,
  });

  const loading = Object.values(loadings).some(Boolean);
  const isAuthenticated = Boolean(user?.id);
  const userLocalService = new UserLocalService();
  const authTokenLocalService = new AuthTokenLocalService();

  const authHttpService = new AuthHttpService(
    httpService,
    userLocalService,
    authTokenLocalService
  );

  function setLoading(label: keyof typeof loadings, value: boolean) {
    setLoadings((state) => ({ ...state, [label]: value }));
  }

  async function signin(email: string, password: string) {
    setLoading("signin", true);

    const result = await authHttpService.signin(email, password);

    if (result.success) {
      setUser(result.user);
    }
    setLoading("signin", false);
  }

  async function signup(email: string, password: string, name: string) {
    setLoading("signup", true);
    const result = await authHttpService.signup({ email, password, name });

    if (result.success) {
      setUser(result.user);
    }
    setLoading("signup", false);
  }

  function signout() {
    setUser(null);
    authHttpService.signout();
  }

  async function getUser() {
    setLoading("getUser", true);
    const _user = await userLocalService.get();

    if (_user && !user) setUser(_user);
    setLoading("getUser", false);
  }

  async function getToken() {
    setLoading("getToken", true);
    const token = await authTokenLocalService.get();

    if (token) {
      authHttpService.initialize(token);
    } else {
      signout();
    }
    setLoading("getToken", false);
  }

  useEffect(() => {
    getUser();
    getToken();
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
    signin,
    signup,
    signout,
  };
}
