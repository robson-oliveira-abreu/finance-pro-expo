import { Failure } from "@domain/entities/Failure";
import { Success } from "@domain/entities/Success";
import { User } from "@domain/entities/User.entity";

export class AuthService {
  public initialize: (token: string) => void;

  public signin: (
    email: string,
    password: string
  ) => Promise<Success<User> | Failure>;

  public signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<Success<User> | Failure>;

  public signout: () => Promise<Success<null> | Failure>;
}
