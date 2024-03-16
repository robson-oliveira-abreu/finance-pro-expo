export type THomeModel = {
  state: {
    open: boolean;
  };
  onStateChange: ({ open }: { open: any }) => void;
  actions: {
    icon: string;
    onPress: () => void;
    label?: string;
  }[];
  onPressMenu: () => void;
};
