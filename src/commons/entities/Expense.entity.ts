import uuid from "react-native-uuid";
export class ExpenseModel {
  public id: string;

  constructor(
    id: string | null,
    public description: string,
    public amount: number,
    public due_date: Date = new Date(),
    public installment: number = 1,
    public installments: number = 1,
    public observation: string = "",
    public paid: boolean = false,
    public paid_amount?: number,
    public paid_date?: Date,
    public userId?: string
  ) {
    this.id = id || (uuid.v4() as string);
    this.due_date = new Date(due_date);
    this.paid_date = paid_date ? new Date(paid_date) : undefined;
  }
}
