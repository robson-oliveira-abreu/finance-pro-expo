import { AuthService } from "@core/services/AuthService";
import { AuthTokenLocalService } from "@core/services/AuthTokenLocalService";
import { UserLocalService } from "@core/services/UserLocalService";
import { User } from "./User.entity";

export class Authentication {
  private authenticatedUser: User;

  constructor(
    authentication: Authentication | null,
    private authService: AuthService,
    private userLocalService: UserLocalService,
    private authTokenLocalService: AuthTokenLocalService
  ) {
    if (authentication) {
      this.authenticatedUser = authentication.authenticatedUser;
    }
  }

  get user() {
    return this.authenticatedUser;
  }

  set user(user: User) {
    this.authenticatedUser = user;
  }

  private newInstance(authentication: Authentication | null = null) {
    return new Authentication(
      authentication,
      this.authService,
      this.userLocalService,
      this.authTokenLocalService
    );
  }

  public async signin(email: string, password: string) {
    const response = await this.authService.signin(email, password);

    if (response.success) {
      const newAuth = this.newInstance();
      newAuth.user = response.payload;

      return this.newInstance(newAuth);
    }

    return this;
  }

  public async signup(email: string, password: string, name: string) {
    const response = await this.authService.signup(email, password, name);

    if (response.success) {
      const newAuth = this.newInstance();
      newAuth.user = response.payload;

      return this.newInstance(newAuth);
    }

    return this;
  }

  public async signout() {
    const res = await this.authService.signout();

    if (res.success) {
      return this.newInstance();
    }

    return this;
  }

  public async loadLocalAuth() {
    try {
      const [user_response, token_response] = await Promise.all([
        this.userLocalService.get(),
        this.authTokenLocalService.get(),
      ]);

      if (
        user_response.success &&
        user_response.payload &&
        token_response.success &&
        token_response.payload
      ) {
        const newAuth = this.newInstance();

        newAuth.user = user_response.payload;

        this.authService.initialize(token_response.payload);

        return this.newInstance(newAuth);
      }

      return this.signout();
    } catch (error) {
      console.log({ error });
      return this;
    }
  }
}
