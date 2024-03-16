import { UsePlanItem } from "../../../commons/Hooks/usePlanItemsContext.hook";

export type TPlanningModel = {
  planItems: UsePlanItem | null;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type PlanningViewProps = {} & TPlanningModel;
