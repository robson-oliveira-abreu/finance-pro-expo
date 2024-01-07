import { useEffect } from "react";
import { web_setup } from "../../infra/web-setup/webSetup";

export function useWebSetup() {
  useEffect(() => {
    web_setup();
  }, []);
}
