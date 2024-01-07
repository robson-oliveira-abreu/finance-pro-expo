import { PlanItem } from "../models/PlanItem.model";
import { Storage } from "./Storage";

export function PlaItemService() {
  const storage = Storage<PlanItem>();

  async function get(id: string): Promise<PlanItem | void> {
    const full_id = getFullId(id);

    return storage.get(full_id);
  }

  async function set(planItem: PlanItem): Promise<void> {
    const full_id = getFullId(planItem.id);

    return storage.set(full_id, planItem);
  }

  async function remove(id: string): Promise<void> {
    const full_id = getFullId(id);

    return storage.remove(full_id);
  }

  async function list(): Promise<PlanItem[] | undefined> {
    return storage.list(getFullId(""));
  }

  function getFullId(id: string): string {
    const base_id: string = "planItem:";

    return base_id + id;
  }

  return {
    get,
    set,
    list,
    remove,
  };
}
