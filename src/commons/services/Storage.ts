import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

export type Storage<Entitie> = ReturnType<typeof Storage<Entitie>>;

export function Storage<Entitie>() {
  let storage: AsyncStorageStatic = AsyncStorage;

  async function get(id: string): Promise<Entitie | void> {
    try {
      const full_id = getFullId(id);

      const data = await storage.getItem(full_id);

      if (!data) {
        return;
      }

      const pasrsed_data: Entitie = JSON.parse(data);

      return pasrsed_data;
    } catch (error) {
      console.error(error);
    }
  }

  async function set(id: string, data: Entitie): Promise<void> {
    try {
      const full_id = getFullId(id);
      const parsed_data = JSON.stringify(data);

      await storage.setItem(full_id, parsed_data);
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(id: string): Promise<void> {
    try {
      const full_id = getFullId(id);

      await storage.removeItem(full_id);
    } catch (error) {
      console.error(error);
    }
  }

  async function list(id: string): Promise<Array<Entitie> | undefined> {
    try {
      const full_id = getFullId(id);

      const keys = await storage.getAllKeys();

      const filtered_keys = keys.filter((key) => key.startsWith(full_id));

      const promises_keys = filtered_keys.map((key) => storage.getItem(key));

      const data = await Promise.all(promises_keys);

      const parsed_data: Array<Entitie> = data.map((current_data) => {
        if (current_data) return JSON.parse(current_data);
      });

      return parsed_data;
    } catch (error) {
      console.error(error);
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
