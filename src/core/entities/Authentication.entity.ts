import { AuthService } from "../services/AuthService";
import { AuthTokenLocalService } from "../services/AuthTokenLocalService";
import { UserLocalService } from "../services/UserLocalService";
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

  public async loadUser() {
    const response = await this.userLocalService.get();

    if (response.success && response.payload) {
      const newAuth = this.newInstance();

      const user = new User(response.payload);

      if (!user) return this;

      newAuth.user;

      return this.newInstance(newAuth);
    }

    return this;
  }

  public async loadToken() {
    const response = await this.authTokenLocalService.get();

    if (!response.success || !response.payload) {
      return this;
    }

    this.authService.initialize(response.payload);
    const newAuth = await this.signout();

    return newAuth;
  }
}
