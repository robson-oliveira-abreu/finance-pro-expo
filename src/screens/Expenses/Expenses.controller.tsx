import {useState} from "react";
import {useExpenses} from "../../commons/Hooks/useExpenses.hook";
import {ExpensesScreenService} from "./Expenses.service";

export type ModalState = {
    open: boolean;
    type: "fixed" | "loose";
};

const defaultModalState: ModalState = {
    open: false,
    type: "loose",
};

export function ExpensesController() {
    const expenses = useExpenses();
    const [openFAB, setOpenFAB] = useState(false);
    const [modal, setModal] = useState<ModalState>(defaultModalState);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const onStateChange = ({open}) => setOpenFAB(open);
    const onChangeModal = (type?: ModalState["type"]) =>
        setModal((state) =>
            state.open ? defaultModalState : {open: true, type}
        );

    const onSelectMonth = (newMonth: Date) => {
        setSelectedMonth(newMonth);
    }

    const getScreens = () => {
        return ExpensesScreenService
            .getScreens(
                expenses.expenses.filter(expense => {
                        if (!expense?.due_date) return;

                        console.log({expense})

                        const equalYear = new Date(expense?.due_date)?.getFullYear() === selectedMonth?.getFullYear();
                        const equalMonth = new Date(expense?.due_date)?.getMonth() === selectedMonth?.getMonth();

                        return equalYear && equalMonth;
                    }
                )
            );
    }

    return {
        expenses,
        openFAB,
        modal,
        selectedMonth,
        getScreens,
        onSelectMonth,
        onStateChange,
        onChangeModal,
    };
}
