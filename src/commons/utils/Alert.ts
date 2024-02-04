import { Dialog } from "react-native-paper";

type Action = {
  onPress: () => void;
  label: string;
};

type AlertProps = {
  title: string;
  message: string;
  actions: Action[];
};

export function Alert({ title, message, actions }: AlertProps) {}
