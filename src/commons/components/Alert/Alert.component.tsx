import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useDialog } from "../../Hooks/useDialog.hook";

const Alert: React.FC = () => {
  const { alert, closeAlert } = useDialog();
  return (
    <Portal>
      <Dialog visible={Boolean(alert?.title)} onDismiss={closeAlert}>
        <Dialog.Title>{alert?.title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{alert?.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          {alert?.actions.map((action) => (
            <Button onPress={action.onPress}>{action.label}</Button>
          ))}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Alert;
