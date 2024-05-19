import { TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { styles } from "./common/styles";
import { SelectViewProps } from "./common/types";
import IconButton from "@expo/vector-icons/FontAwesome";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { isAndroid, isIos, isWeb } from "@infra/utils/platform";
import { Text } from "@ui/components/UIComponents/Text";
import { theme } from "@infra/theme/theme";

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
          mode="dropdown"
          selectedValue={props.selected}
          onValueChange={onSelect}
          style={[
            isWeb && {
              padding: 8,
              borderRadius: 8,
            },
            (isAndroid || isWeb) && {
              backgroundColor: theme.colors.backgroundSecondary,
              color: theme.colors.text,
            },
          ]}
          dropdownIconColor={theme.colors.main}
          dropdownIconRippleColor={theme.colors.main}
        >
          {months.reverse().map((month) => {
            return (
              <Picker.Item
                key={month.getTime()}
                label={formatDate(month)}
                value={month.toDateString()}
                color={theme.colors.text}
                style={{ backgroundColor: theme.colors.backgroundSecondary }}
              />
            );
          })}
        </Picker>
      )}
    </View>
  );
}
