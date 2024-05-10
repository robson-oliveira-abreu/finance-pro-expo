import { TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { styles } from "./common/styles";
import { SelectViewProps } from "./common/types";
import IconButton from "@expo/vector-icons/FontAwesome";
import { Spacer } from "../../Spacer/Spacer";
import { isIos, isWeb } from "../../../../infra/utils/platform";
import { Text } from "../Text";

export function SelectView(props: SelectViewProps) {
  const { open, months, onSelect, formatDate, handleOpen } = props;

  return (
    <View style={[styles.container, props.style]}>
      {isIos && (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handleOpen}
        >
          <Text>{formatDate(new Date(props.selected))}</Text>
          <Spacer flex={1} />
          <IconButton size={16} name={open ? "angle-up" : "angle-down"} />
        </TouchableOpacity>
      )}
      {(open || !isIos) && (
        <Picker
          selectedValue={props.selected}
          onValueChange={onSelect}
          style={[isWeb ? { padding: 8, borderRadius: 8 } : {}]}
        >
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
