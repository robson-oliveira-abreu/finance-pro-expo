import { User } from "../../entities/User.entity";
import { Storage } from "./Storage";

export class UserLocalService {
  private storage: Storage<User> = Storage<User>();

  get(): Promise<User | void> {
    return this.storage.get("user");
  }

  set(data: User): Promise<void> {
    return this.storage.set("user", data);
  }

  remove(): Promise<void> {
    return this.storage.remove("user");
  }
}
