import { useState } from "react";

type Action = {
  onPress: () => void;
  label: string;
};

type AlertState = {
  title: string;
  message: string;
  actions: Action[];
};

export function useDialogContext() {
  const [alert, setAlert] = useState<Partial<AlertState> | null>(null);

  const Alert = (data: Partial<AlertState>) => {
    setAlert(data);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return { alert, closeAlert, Alert };
}
