import { Failure } from "@domain/entities/Failure";
import { Success } from "@domain/entities/Success";
import { User } from "@domain/entities/User.entity";
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
