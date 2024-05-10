import { Failure } from "../entities/Failure";
import { Success } from "../entities/Success";
import { User } from "../entities/User.entity";

export class UserLocalService {
  public get: () => Promise<Success<User | null> | Failure>;

  public set: (user: User) => Promise<Success<null> | Failure>;

  public remove: () => Promise<Success<null> | Failure>;
}
