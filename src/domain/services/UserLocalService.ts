import { Failure } from "@domain/entities/Failure";
import { Success } from "@domain/entities/Success";
import { User } from "@domain/entities/User.entity";

export class UserLocalService {
  public get: () => Promise<Success<User | null> | Failure>;

  public set: (user: User) => Promise<Success<null> | Failure>;

  public remove: () => Promise<Success<null> | Failure>;
}
