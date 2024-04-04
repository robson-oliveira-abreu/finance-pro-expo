import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { styles } from "./common/styles";
import { SelectViewProps } from "./common/types";
import { IconButton, Text } from "react-native-paper";
import { Spacer } from "../Spacer/Spacer";
import { isIos } from "../../utils/platform";

export function SelectView(props: SelectViewProps) {
  const { open, months, onSelect, formatDate, handleOpen } = props;

  return (
    <View style={[styles.container, props.style]}>
      {isIos && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text onPress={handleOpen}>
            {formatDate(new Date(props.selected))}
          </Text>
          <Spacer flex={1} />
          <IconButton
            icon={open ? "arrow-up" : "arrow-down"}
            onPress={handleOpen}
          />
        </View>
      )}
      {(open || !isIos) && (
        <Picker selectedValue={props.selected} onValueChange={onSelect}>
          {months.reverse().map((month) => {
            return (
              <Picker.Item
                key={month.getTime()}
                label={formatDate(month)}
                value={month.toDateString()}
              />
            );
          })}
        </Picker>
      )}
    </View>
  );
}
