import { useState } from "react";
import { HomeService } from "./Home.service";

export function useHomeController() {
  const [state, setState] = useState({ open: false });
  const homeService = new HomeService();

  const onStateChange = ({ open }) => setState({ open });

  const actions = homeService.handleActions();

  return {
    state,
    onStateChange,
    actions,
  };
}
