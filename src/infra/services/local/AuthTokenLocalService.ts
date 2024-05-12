import { Failure } from "@core/entities/Failure";
import { Success } from "@core/entities/Success";
import { Storage } from "./Storage";

export class AuthTokenLocalService {
  private storage: Storage<string> = Storage<string>();

  get(): Promise<Failure | Success<string | null>> {
    const full_id = this.getId();

    return this.storage.get(full_id);
  }

  set(data: string): Promise<Failure | Success<null>> {
    return this.storage.set(this.getId(), data);
  }

  remove(): Promise<Failure | Success<null>> {
    const full_id = this.getId();

    return this.storage.remove(full_id);
  }

  private getId(): string {
    return "auth:token";
  }
}
