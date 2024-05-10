import { Failure } from "../entities/Failure";
import { Success } from "../entities/Success";

export class AuthTokenLocalService {
  public get: () => Promise<Success<string | null> | Failure>;

  public set: (token: string) => Promise<Success<null> | Failure>;

  public remove: () => Promise<Success<null> | Failure>;
}
