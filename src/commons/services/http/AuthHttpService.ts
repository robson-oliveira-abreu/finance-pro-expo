import { AxiosInstance } from "axios";
import { User } from "../../entities/User.entity";
import { AuthTokenLocalService } from "../local/AuthLocalService";
import { UserLocalService } from "../local/UserLocalService";

type Success = { user: User; success: true };
type Failure = { success: false };

export class AuthHttpService {
  constructor(
    private httpService: AxiosInstance,
    private userLocalService: UserLocalService,
    private authLocalService: AuthTokenLocalService
  ) {}

  initialize(token: string) {
    this.setAuthorizationToken(token);
  }

  async signin(email: string, password: string): Promise<Success | Failure> {
    try {
      const body = {
        email,
        password,
      };

      const response = await this.httpService.post<{
        user: User;
        token: string;
      }>("/auth/signin", body);

      this.onSignin(response.data.user, response.data.token);

      return { user: response.data.user, success: true };
    } catch (error) {
      // TODO notificar erro
      console.log(error);
      return { success: false };
    }
  }

  async signup(user: Omit<User, "id">): Promise<Success | Failure> {
    try {
      const body = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      const response = await this.httpService.post<{
        user: User;
        token: string;
      }>(`/auth/signup`, body);

      this.onSignin(response.data.user, response.data.token);

      return { user: response.data.user, success: true };
    } catch (error) {
      // TODO notificar erro
      console.log(error);
      return { success: false };
    }
  }

  signout() {
    this.authLocalService.remove();
    this.userLocalService.remove();
    this.httpService.defaults.headers.common["Authorization"] = "";
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
