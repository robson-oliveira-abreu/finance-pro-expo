import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";
import { User } from "@core/entities/User.entity";

export class UserLocalService {
  public get: () => Promise<Success<User | null> | Failure>;

  public set: (user: User) => Promise<Success<null> | Failure>;

  public remove: () => Promise<Success<null> | Failure>;
}
