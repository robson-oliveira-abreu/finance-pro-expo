import {useState} from "react";
import {SelectService} from "./Select.service";
import {SelectProps} from "./Select.view";

export function SelectController(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState('')
    const months = SelectService.getMonths();
    const handleOpen = () => {
        setOpen(state => !state);
    }

    const changeMonth = (monthString: string, newMonth: Date) => () => {
        setMonth(monthString);
        props.onSelect(newMonth);
        setOpen(false)
    }


    return {
        open,
        month,
        months,
        handleOpen,
        changeMonth,
    }
}