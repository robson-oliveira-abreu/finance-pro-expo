import { useState } from "react";
import { THomeModel } from "./common/types";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { filterPayableExpenses } from "../../commons/utils/filterPayableExpenses";

export function HomeModel(): THomeModel {
  const { expenses } = useExpenses();
  const payableExpenses = filterPayableExpenses(expenses);

  const onPressMenu = () => {};

  return {
    payableExpenses,
    onPressMenu,
  };
}
