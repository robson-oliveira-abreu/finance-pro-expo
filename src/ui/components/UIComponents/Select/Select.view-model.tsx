import { SelectModel } from "./Select.model";
import { SelectView } from "./Select.view";
import { SelectProps } from "./common/types";

export function SelectViewModel(props: SelectProps) {
  const selectModel = SelectModel(props);

  return <SelectView {...selectModel} {...props} />;
}
