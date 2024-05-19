import React, { ReactNode } from "react";
import { styles } from "./common/styles";
import { TopTabRoutes } from "@infra/routes/TopTab.routes";
import { isIos, isWeb } from "src/application/utils/platform";
import { ExpensesViewProps } from "./common/types";
import { ExpenseList } from "@ui/components/ExpenseList/ExpenseList.view";
import { SelectViewModel } from "@ui/components/UIComponents/Select/Select.view-model";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { BackButton } from "@ui/components/UIComponents/BackButton/BackButton";
import { theme } from "@infra/theme/theme";
import { ExpenseModal } from "../ExpenseModal";

export const ExpensesView = (props: ExpensesViewProps): ReactNode => {
  const { modal, selectedMonth, onSelectMonth, onChangeModal, getScreens } =
    props;
  return (
    <View style={styles.container}>
      <Spacer y={isIos ? 20 : isWeb ? 12 : 0} />

      <BackButton />

      <SelectViewModel
        onSelect={onSelectMonth}
        selected={selectedMonth}
        style={styles.selectMonth}
      />

      <TopTabRoutes screens={getScreens(ExpenseList)} />

      <View style={styles.addButtonWrapper}>
        <TouchableOpacity onPress={onChangeModal} style={styles.addButton}>
          <AntDesignIcon name="plus" size={32} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ExpenseModal open={modal.open} onClose={onChangeModal} />
    </View>
  );
};
