import { useRef, useState } from "react";
import { SelectService } from "./Select.service";
import { SelectProps } from "./types";
import { TextInput } from "react-native";

export function SelectController(props: SelectProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState("");
  const months = SelectService.getMonths();

  const handleOpen = () => {
    setOpen((state) => !state);
  };

  const closeSelect = () => {
    setOpen(false);
  };

  const changeMonth = (monthString: string, newMonth: Date) => () => {
    setMonth(monthString);
    props.onSelect(newMonth.getTime().toString());
    setOpen(false);
  };

  const onBlur = () => {
    setTimeout(() => setOpen(false), 300);
  };

  const formatDate = (date: Date) => {
    return SelectService.formatDate(date);
  };

  const getRadioStatus = (month: Date, selected: Date) => {
    return SelectService.getRadioStatus(month, selected);
  };

  const onSelect = (itemValue: string) => {
    props.onSelect(itemValue);
    closeSelect();
  };

  return {
    open,
    month,
    months,
    onBlur,
    formatDate,
    closeSelect,
    handleOpen,
    changeMonth,
    getRadioStatus,
    onSelect,
  };
}
