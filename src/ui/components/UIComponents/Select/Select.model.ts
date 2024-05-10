import { useState } from "react";
import { SelectProps } from "./common/types";
import { format } from "date-fns";
import localePtBr from "date-fns/locale/pt-BR";
import { getMonths } from "./common/utils";

export function SelectModel(props: SelectProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState("");
  const months = getMonths();

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
    return format(date, "MMMM/yyyy", { locale: localePtBr });
  };

  const getRadioStatus = (month: Date, selected: Date) => {
    const sameYear = month.getFullYear() === selected.getFullYear();
    const sameMonth = month.getMonth() === selected.getMonth();

    return sameYear && sameMonth ? "checked" : "unchecked";
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
