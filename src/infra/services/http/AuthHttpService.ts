import { AxiosInstance } from "axios";
import { User } from "@core/entities/User.entity";
import { AuthTokenLocalService } from "@infra/services/local/AuthTokenLocalService";
import { UserLocalService } from "@infra/services/local/UserLocalService";
import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";
import { AuthService } from "@core/services/AuthService";
import { LogError } from "@infra/utils/logError";

type HttpResponseData = {
  user: User;
  access_token: string;
};

export class AuthHttpService implements AuthService {
  constructor(
    private httpService: AxiosInstance,
    private userLocalService: UserLocalService,
    private authLocalService: AuthTokenLocalService
  ) {}

  initialize(token: string) {
    this.setAuthorizationToken(token);
  }

  async signin(
    email: string,
    password: string
  ): Promise<Success<User> | Failure> {
    try {
      const body = {
        email,
        password,
      };

      const response = await this.httpService.post<HttpResponseData>(
        "/auth/signin",
        body
      );

      const { access_token, user } = response.data;

      this.onSignin(user, access_token);

      return new Success(user);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "AuthHttpService.signin" });
      return new Failure();
    }
  }

  async signup(
    email: string,
    password: string,
    name: string
  ): Promise<Success<User> | Failure> {
    try {
      const body = {
        name: name,
        email: email,
        password: password,
      };

      const { data } = await this.httpService.post<HttpResponseData>(
        `/auth/signup`,
        body
      );

      this.onSignin(data.user, data.access_token);

      return new Success(data.user);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "AuthHttpService.signup" });
      return new Failure();
    }
  }

  async signout() {
    try {
      await this.authLocalService.remove();
      await this.userLocalService.remove();
      this.httpService.defaults.headers.common["Authorization"] = "";

      return new Success(null);
    } catch (error) {
      LogError(error, { type: "HTTP", handler: "AuthHttpService.signout" });
      return new Failure();
    }
  }

  private setAuthorizationToken(token: string) {
    this.httpService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  private onSignin(user: User, token: string) {
    this.setAuthorizationToken(token);
    this.userLocalService.set(user);
    this.authLocalService.set(token);
  }
}
