import {addMonths} from "date-fns";

export class SelectService {
    private static currentDate = new Date();
    public static getMonths(): Date[] {
        const months: Date[] = new Array(12).fill(addMonths(this.currentDate, 9));

        return months.map(this.popMonth);
    }

    private static popMonth(date: Date, index: number): Date {
        const month =  new Date(date);

        if(month.getMonth() > 0) {
            month.setMonth(month.getMonth() - index);
        } else {
            month.setFullYear(month.getFullYear() - 1);
            month.setMonth(11);
        }

        return month;
    }
}
