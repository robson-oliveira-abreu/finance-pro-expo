import { useState } from "react";
import { usePlanItems } from "../../commons/Hooks/usePlanItems.hook";
import { TPlanningModel } from "./common/types";

export function PlanningModel(): TPlanningModel {
  const [modalOpen, setModalOpen] = useState(false);
  const planItems = usePlanItems();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    planItems,
    modalOpen,
    openModal,
    closeModal,
  };
}
