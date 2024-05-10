import { useEffect, useState } from "react";
import { AuthHttpService } from "../../services/http/AuthHttpService";
import { httpService } from "../../services/http/HttpService";
import { AuthTokenLocalService } from "../../services/local/AuthLocalService";
import { UserLocalService } from "../../services/local/UserLocalService";
import { SubscribeHttpErrorObserver } from "../../observables/HttpErrorObservable/SubscribeHttpErrorObserver";
import { Authentication } from "../../../core/entities/Authentication.entity";

const defaultLoadings = {
  getUser: false,
  signin: false,
  signup: false,
  getToken: false,
  signout: false,
};

export function useAuthContext() {
  const userLocalService = new UserLocalService();
  const authTokenLocalService = new AuthTokenLocalService();
  const [loadings, setLoadings] = useState(defaultLoadings);
  const loading = Object.values(defaultLoadings).some(Boolean);

  const authHttpService = new AuthHttpService(
    httpService,
    userLocalService,
    authTokenLocalService
  );
  const [authentication, setAuthentication] = useState(
    new Authentication(
      null,
      authHttpService,
      userLocalService,
      authTokenLocalService
    )
  );

  const isAuthenticated = Boolean(authentication.user?.id);

  function setLoading(props: Partial<typeof loadings>) {
    setLoadings((state) => ({ ...state, ...props }));

    const revertLoadingValue: Partial<typeof loadings> = {};

    Object.entries(props).forEach(([key, value]) => {
      revertLoadingValue[key] = !value;
    });

    return () => setLoadings((state) => ({ ...state, ...props }));
  }

  async function signin(email: string, password: string) {
    const revertLoading = setLoading({ signin: true });

    setAuthentication(await authentication.signin(email, password));

    revertLoading();
  }

  async function signup(email: string, password: string, name: string) {
    const revertLoading = setLoading({ signup: true });

    setAuthentication(await authentication.signup(email, password, name));

    revertLoading();
  }

  async function signout() {
    const revertLoading = setLoading({ signout: true });

    setAuthentication(await authentication.signout());

    revertLoading();
  }

  async function loadUser() {
    const revertLoading = setLoading({ getUser: true });

    setAuthentication(await authentication.loadUser());

    revertLoading();
  }

  async function loadToken() {
    const revertLoading = setLoading({ getToken: true });

    setAuthentication(await authentication.loadToken());

    revertLoading();
  }

  function onHttpError(onHttpErrorProps: { status: number }) {
    if (onHttpErrorProps?.status === 401) signout();
  }

  useEffect(() => {
    loadUser();
    loadToken();
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
