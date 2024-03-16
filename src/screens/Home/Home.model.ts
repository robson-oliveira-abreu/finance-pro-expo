import { useState } from "react";
import { THomeModel } from "./common/types";

export function HomeModel(): THomeModel {
  const [state, setState] = useState({ open: false });

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
    onStateChange,
    onPressMenu,
  };
}
