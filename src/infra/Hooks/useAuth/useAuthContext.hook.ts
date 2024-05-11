import { useEffect, useState } from "react";
import { AuthHttpService } from "../../services/http/AuthHttpService";
import { httpService } from "../../services/http/HttpService";
import { AuthTokenLocalService } from "../../services/local/AuthTokenLocalService";
import { UserLocalService } from "../../services/local/UserLocalService";
import { SubscribeHttpErrorObserver } from "../../observables/HttpErrorObservable/SubscribeHttpErrorObserver";
import { Authentication } from "../../../core/entities/Authentication.entity";

const defaultLoadings = {
  loadLocalAuthData: false,
  signin: false,
  signup: false,
  signout: false,
};

export function useAuthContext() {
  const userLocalService = new UserLocalService();
  const authTokenLocalService = new AuthTokenLocalService();
  const authHttpService = new AuthHttpService(
    httpService,
    userLocalService,
    authTokenLocalService
  );

  const [loadings, setLoadings] = useState(defaultLoadings);
  const [authentication, setAuthentication] = useState(
    new Authentication(
      null,
      authHttpService,
      userLocalService,
      authTokenLocalService
    )
  );

  const loading = Object.values(loadings).some(Boolean);
  const isAuthenticated = Boolean(authentication.user?.id);

  function setLoading(props: Partial<typeof loadings>) {
    setLoadings((state) => ({ ...state, ...props }));

    const revertLoadingValue: Partial<typeof loadings> = {};

    Object.entries(props).forEach(([key, value]) => {
      revertLoadingValue[key] = !value;
    });

    return () => setLoadings((state) => ({ ...state, ...revertLoadingValue }));
  }

  async function runAuthMethod(
    authenticationMethod: () => Promise<Authentication>,
    loadKey: keyof typeof loadings
  ) {
    const revertLoading = setLoading({ [loadKey]: true });

    const newAuthState = await authenticationMethod();

    setAuthentication(newAuthState);

    revertLoading();
  }

  function signin(email: string, password: string) {
    runAuthMethod(() => authentication.signin(email, password), "signin");
  }

  function signup(email: string, password: string, name: string) {
    runAuthMethod(() => authentication.signup(email, password, name), "signup");
  }

  function signout() {
    runAuthMethod(() => authentication.signout(), "signout");
  }

  function loadLocalAuth() {
    runAuthMethod(() => authentication.loadLocalAuth(), "loadLocalAuthData");
  }

  function onHttpError(onHttpErrorProps: { status: number }) {
    if (onHttpErrorProps?.status === 401) {
      signout();
    }
  }

  useEffect(() => {
    loadLocalAuth();
  }, []);

  useEffect(() => {
    const subscription = new SubscribeHttpErrorObserver(onHttpError);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    isAuthenticated,
    user: authentication.user,
    loading,
    signin,
    signup,
    signout,
  };
}
