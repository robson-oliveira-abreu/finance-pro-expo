import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";
import { Success } from "../../../core/entities/Success";
import { Failure } from "../../../core/entities/Failure";

export type Storage<Entitie> = ReturnType<typeof Storage<Entitie>>;

export function Storage<Entitie>() {
  let storage: AsyncStorageStatic = AsyncStorage;

  async function get(id: string): Promise<Failure | Success<Entitie | null>> {
    try {
      const full_id = getFullId(id);

      const data = await storage.getItem(full_id);

      if (!data) {
        return new Success(null);
      }

      const pasrsed_data: Entitie = JSON.parse(data);

      return new Success(pasrsed_data);
    } catch (error) {
      console.error(error);
      return new Failure();
    }
  }

  async function set(
    id: string,
    data: Entitie
  ): Promise<Failure | Success<null>> {
    try {
      const full_id = getFullId(id);
      const parsed_data = JSON.stringify(data);

      await storage.setItem(full_id, parsed_data);

      return new Success(null);
    } catch (error) {
      console.error(error);
      return new Failure();
    }
  }

  async function remove(id: string): Promise<Failure | Success<null>> {
    try {
      const full_id = getFullId(id);

      await storage.removeItem(full_id);

      return new Success(null);
    } catch (error) {
      console.error(error);
      return new Failure();
    }
  }

  async function list(
    id: string
  ): Promise<Failure | Success<Entitie[] | null>> {
    try {
      const full_id = getFullId(id);

      const keys = await storage.getAllKeys();

      const filtered_keys = keys.filter((key) => key.startsWith(full_id));

      const promises_keys = filtered_keys.map((key) => storage.getItem(key));

      const data = await Promise.all(promises_keys);

      const parsed_data: Array<Entitie> = data.map((current_data) => {
        if (current_data) return JSON.parse(current_data);
      });

      return new Success(parsed_data);
    } catch (error) {
      console.error(error);
      return new Failure();
    }
  }

  function getFullId(id: string) {
    const app_id = "@finance_pro:";

    return app_id + id;
  }

  return {
    get,
    set,
    remove,
    list,
  };
}
