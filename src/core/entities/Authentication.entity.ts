import { AuthService } from "@core/services/AuthService";
import { AuthTokenLocalService } from "@core/services/AuthTokenLocalService";
import { UserLocalService } from "@core/services/UserLocalService";
import { User } from "./User.entity";
import { AppError } from "./AppError";
import { Failure } from "./Failure";
import { Success } from "./Success";

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

  public async signin(
    email: string,
    password: string
  ): Promise<Success<Authentication> | Failure> {
    try {
      const response = await this.authService.signin(email, password);

      if (!response.success) {
        throw new AppError("Error no signin!");
      }

      const newAuth = this.newInstance();
      newAuth.user = response.payload;

      return new Success(this.newInstance(newAuth));
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on signin!");
    }
  }

  public async signup(
    email: string,
    password: string,
    name: string
  ): Promise<Success<Authentication> | Failure> {
    try {
      const response = await this.authService.signup(email, password, name);

      if (!response.success) {
        throw new AppError("Error no singup!");
      }

      const newAuth = this.newInstance();
      newAuth.user = response.payload;

      return new Success(this.newInstance(newAuth));
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on singup!");
    }
  }

  public async signout(): Promise<Success<Authentication> | Failure> {
    try {
      const response = await this.authService.signout();

      if (!response.success) {
        throw new AppError("Error no singout!");
      }

      return new Success(this.newInstance());
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on singout!");
    }
  }

  public async loadLocalAuth(): Promise<Success<Authentication> | Failure> {
    try {
      const [user_response, token_response] = await Promise.all([
        this.userLocalService.get(),
        this.authTokenLocalService.get(),
      ]);

      if (
        !user_response.success ||
        !user_response.payload ||
        !token_response.success ||
        !token_response.payload
      ) {
        throw new AppError("Error on load user data!");
      }

      const newAuth = this.newInstance();

      newAuth.user = user_response.payload;

      this.authService.initialize(token_response.payload);

      return new Success(this.newInstance(newAuth));
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return new Failure(error.errorMessage);
      }

      return new Failure("Error on load user data!");
    }
  }
}
