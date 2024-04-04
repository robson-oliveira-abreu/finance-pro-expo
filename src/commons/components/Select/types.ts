import { StyleProp, ViewStyle } from "react-native";
import { SelectModel } from "./Select.model";

export type SelectProps = {
  style?: StyleProp<ViewStyle>;
  selected: string;
  onSelect: (selected: string) => void;
};

export type SelectModel = {
  open: boolean;
  month: string;
  months: Date[];
  onBlur: () => void;
  formatDate: (date: Date) => string;
  closeSelect: () => void;
  handleOpen: () => void;
  changeMonth: (monthString: string, newMonth: Date) => () => void;
  getRadioStatus: (month: Date, selected: Date) => "checked" | "unchecked";
  onSelect: (itemValue: string) => void;
};

export type SelectViewProps = SelectProps & SelectModel;
