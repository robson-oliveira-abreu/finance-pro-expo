import { useEffect, useState } from "react";
import { AuthHttpService } from "src/application/services/http/AuthHttpService";
import { httpService } from "src/application/services/http/HttpService";
import { AuthTokenLocalService } from "src/application/services/local/AuthTokenLocalService";
import { UserLocalService } from "src/application/services/local/UserLocalService";
import { Authentication } from "@domain/entities/Authentication.entity";
import { Success } from "@domain/entities/Success";
import { Failure } from "@domain/entities/Failure";
import { Toast } from "react-native-toast-notifications";
import { SubscribeHttpErrorObserver } from "src/application/observables/HttpErrorObservable/SubscribeHttpErrorObserver";

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

  async function runAuthMethod(
    authenticationMethod: () => Promise<Success<Authentication> | Failure>,
    loadKey: keyof typeof loadings
  ): Promise<Success<null> | Failure> {
    setLoadings((state) => ({ ...state, [loadKey]: true }));

    const response = await authenticationMethod();

    setLoadings((state) => ({ ...state, [loadKey]: false }));

    if (response.success) {
      setAuthentication(response.payload);
      return new Success(null);
    }

    return new Failure(response.errorMessage);
  }

  async function signin(email: string, password: string) {
    const response = await runAuthMethod(
      () => authentication.signin(email, password),
      "signin"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on singin!", {
        type: "danger",
      });
    }
  }

  async function signup(email: string, password: string, name: string) {
    const response = await runAuthMethod(
      () => authentication.signup(email, password, name),
      "signup"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on signup!", {
        type: "danger",
      });
    }
  }

  async function signout() {
    const response = await runAuthMethod(
      () => authentication.signout(),
      "signout"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on signout!", {
        type: "danger",
      });
    }
  }

  async function loadLocalAuth() {
    const response = await runAuthMethod(
      () => authentication.loadLocalAuth(),
      "loadLocalAuthData"
    );

    if (!response.success) {
      Toast.show(response.errorMessage || "Error on load user data!", {
        type: "danger",
      });
    }
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
