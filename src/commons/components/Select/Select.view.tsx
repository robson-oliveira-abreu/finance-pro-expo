import { View } from "react-native";
import { SelectController } from "./Select.controller";
import { Picker } from "@react-native-picker/picker";

import { styles } from "./styles";
import { SelectProps } from "./types";
import { IconButton, Text } from "react-native-paper";
import { Spacer } from "../Spacer/Spacer";
import { isIos } from "../../platform";

export function Select(props: SelectProps) {
  const controller = SelectController(props);

  return (
    <View style={[styles.container, props.style]}>
      {isIos && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text onPress={controller.handleOpen}>
            {controller.formatDate(new Date(props.selected))}
          </Text>
          <Spacer flex={1} />
          <IconButton
            icon={controller.open ? "arrow-up" : "arrow-down"}
            onPress={controller.handleOpen}
          />
        </View>
      )}
      {(controller.open || !isIos) && (
        <Picker
          selectedValue={props.selected}
          onValueChange={controller.onSelect}
        >
          {controller.months.reverse().map((month) => {
            return (
              <Picker.Item
                key={month.getTime()}
                label={controller.formatDate(month)}
                value={month.toDateString()}
              />
            );
          })}
        </Picker>
      )}
    </View>
  );
}
