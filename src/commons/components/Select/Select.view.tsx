import { TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { styles } from "./common/styles";
import { SelectViewProps } from "./common/types";
import IconButton from "@expo/vector-icons/AntDesign";
import { Spacer } from "../Spacer/Spacer";
import { isIos, isWeb } from "../../utils/platform";
import { Text } from "../UIComponents/Text";

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
          <IconButton size={16} name={open ? "up" : "down"} />
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
