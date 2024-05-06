import { Storage } from "./Storage";

export class AuthTokenLocalService {
  private storage: Storage<string> = Storage<string>();

  get(): Promise<string | void> {
    const full_id = this.getId();

    return this.storage.get(full_id);
  }

  set(data: string): Promise<void> {
    return this.storage.set(this.getId(), data);
  }

  remove(): Promise<void> {
    const full_id = this.getId();

    return this.storage.remove(full_id);
  }

  private getId(): string {
    return "auth:token";
  }
}
