import { Failure } from "@domain/entities/Failure";
import { Success } from "@domain/entities/Success";
import { Storage } from "./Storage";

type ColorSchemeSystem = "light" | "dark" | "system";

export class ThemeLocalService {
  private storage: Storage<ColorSchemeSystem> = Storage<ColorSchemeSystem>();

  get(): Promise<Failure | Success<ColorSchemeSystem | null>> {
    return this.storage.get("themeSchema");
  }

  set(data: ColorSchemeSystem): Promise<Failure | Success<null>> {
    return this.storage.set("themeSchema", data);
  }

  remove(): Promise<Failure | Success<null>> {
    return this.storage.remove("themeSchema");
  }
}
