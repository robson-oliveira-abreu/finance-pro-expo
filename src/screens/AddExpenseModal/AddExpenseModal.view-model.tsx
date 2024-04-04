import { AddExpenseModalModel } from "./AddExpenseModal.model";
import { AddExpenseModalView } from "./AddExpenseModal.view";
import { AddExpenseModalViewModelProps } from "./common/types";

export function AddExpenseModalViewModel(props: AddExpenseModalViewModelProps) {
  const { onClose, open, type } = props;
  const {
    errors,
    webDateErrors,
    formState,
    openAndroidDate,
    onChange,
    onSubmit,
    onChangeDateWeb,
    handleOpenAndroidDate,
    onChangeDateNative,
  } = AddExpenseModalModel({ onClose, type });

  return (
    <AddExpenseModalView
      onClose={onClose}
      type={type}
      open={open}
      errors={errors}
      webDateErrors={webDateErrors}
      formState={formState}
      openAndroidDate={openAndroidDate}
      onChange={onChange}
      onSubmit={onSubmit}
      onChangeDateWeb={onChangeDateWeb}
      handleOpenAndroidDate={handleOpenAndroidDate}
      onChangeDateNative={onChangeDateNative}
    />
  );
}
