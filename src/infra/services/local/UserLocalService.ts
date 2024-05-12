import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";
import { User } from "@core/entities/User.entity";
import { Storage } from "./Storage";

export class UserLocalService {
  private storage: Storage<User> = Storage<User>();

  get(): Promise<Failure | Success<User | null>> {
    return this.storage.get("user");
  }

  set(data: User): Promise<Failure | Success<null>> {
    return this.storage.set("user", data);
  }

  remove(): Promise<Failure | Success<null>> {
    return this.storage.remove("user");
  }
}
