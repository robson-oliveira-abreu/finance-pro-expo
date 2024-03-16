import { useState } from "react";
import { THomeModel } from "./common/types";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { filterPayableExpenses } from "../../commons/utils/filterPayableExpenses";

export function HomeModel(): THomeModel {
  const [state, setState] = useState({ open: false });
  const { expenses } = useExpenses();
  const payableExpenses = filterPayableExpenses(expenses);

  const onStateChange = ({ open }) => setState({ open });

  const actions = [
    { icon: "plus", onPress: () => console.log("Pressed add") },
    {
      icon: "star",
      label: "Star",
      onPress: () => console.log("Pressed star"),
    },
    {
      icon: "email",
      label: "Email",
      onPress: () => console.log("Pressed email"),
    },
    {
      icon: "bell",
      label: "Remind",
      onPress: () => console.log("Pressed notifications"),
    },
  ];

  const onPressMenu = () => {};

  return {
    state,
    actions,
    payableExpenses,
    onStateChange,
    onPressMenu,
  };
}
