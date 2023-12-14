import {StyleSheet, View, StyleProp, ViewStyle} from "react-native";
import {Icon, RadioButton, Text, TouchableRipple} from "react-native-paper";
import {SelectController} from "./Select.controller";
import {format} from "date-fns";
import localePtBr from 'date-fns/locale/pt-BR';

export type SelectProps = {
    style?: StyleProp<ViewStyle>;
    selected: Date;
    onSelect: (selected: Date) => void;
}

export function Select(props: SelectProps) {
    const controller = SelectController(props);

    return (
        <View style={[styles.container, props.style]}>
            <TouchableRipple onPress={controller.handleOpen} style={styles.input}>
                <>
                    <Text>{format(props.selected, 'MMMM/yyyy', {locale: localePtBr})}</Text>
                    <Icon size={20} source={controller.open ? 'arrow-up' : 'arrow-down'}/>
                </>
            </TouchableRipple>
            {controller.open && <View style={styles.selectContent}>
                {controller.months.reverse().map((month) => {
                    const monthString = String(month.getMonth() + 1 + '/' + month.getFullYear()).padStart(7, '0')
                    return (
                        <TouchableRipple style={styles.item} onPress={controller.changeMonth(monthString, month)}>
                            <>
                                <Text>{format(month, 'MMMM/yyyy', {locale: localePtBr})}</Text>
                                <RadioButton
                                    onPress={controller.changeMonth(monthString, month)}
                                    value={monthString}
                                    status={
                                        month.getFullYear() === props.selected.getFullYear() &&
                                        month.getMonth() === props.selected.getMonth() ? 'checked' : 'unchecked'
                                    }
                                />
                            </>
                        </TouchableRipple>
                    )
                })}

            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: '100%',
        borderWidth: 2,
        borderColor: '#ff000040',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    selectContent: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 8,
    }
})