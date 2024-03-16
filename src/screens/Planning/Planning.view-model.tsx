import { PlanningModel } from "./Planning.model";
import { PlanningView } from "./Planning.view";

export function PlanningViewModel() {
  const { planItems, modalOpen, openModal, closeModal } = PlanningModel();

  return (
    <PlanningView
      planItems={planItems}
      modalOpen={modalOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
}
