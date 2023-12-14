import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

export class Storage {
  private storage: AsyncStorageStatic;

  constructor() {
    this.storage = AsyncStorage;
  }

  async get<T>(id: string): Promise<T | void> {
    try {
      const full_id = this.getFullId(id);

      const data = await this.storage.getItem(full_id);

      if (!data) {
        return;
      }

      const pasrsed_data: T = JSON.parse(data);

      return pasrsed_data;
    } catch (error) {
      console.error(error);
    }
  }

  async set(id: string, data: any): Promise<void> {
    try {
      const full_id = this.getFullId(id);
      const parsed_data = JSON.stringify(data);

      console.log({ parsed_data });
      await this.storage.setItem(full_id, parsed_data);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const full_id = this.getFullId(id);

      await this.storage.removeItem(full_id);
    } catch (error) {
      console.error(error);
    }
  }

  async list<T>(id: string): Promise<Array<T>> {
    try {
      const full_id = this.getFullId(id);

      const keys = await this.storage.getAllKeys();

      const filtered_keys = keys.filter((key) => key.startsWith(full_id));

      const promises_keys = filtered_keys.map((key) =>
        this.storage.getItem(key)
      );

      const data = await Promise.all(promises_keys);

      const parsed_data: Array<T> = data.map((current_data) =>
        JSON.parse(current_data)
      );

      return parsed_data;
    } catch (error) {
      console.error(error);
    }
  }

  private getFullId(id: string) {
    const app_id = "@finance_pro:";

    return app_id + id;
  }
}
