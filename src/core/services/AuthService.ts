import { Failure } from "../entities/Failure";
import { Success } from "../entities/Success";
import { User } from "../entities/User.entity";

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