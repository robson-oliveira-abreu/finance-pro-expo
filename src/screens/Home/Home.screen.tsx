import React from "react";
import { StyleSheet } from "react-native";
import { FAB, Surface } from "react-native-paper";
import { handleActions } from "./handlers";

export default function Home() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  return (
    <Surface style={[styles.container]}>
      <FAB.Group
        visible
        open={state.open}
        onStateChange={onStateChange}
        actions={handleActions()}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "red",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 8,
  },
});
