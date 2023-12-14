export class ExpenseModel {
  constructor(
    public id: string = undefined,
    public description: string,
    public amount: number,
    public due_date: Date = new Date(),
    public installment: number = 1,
    public installments: number = 1,
    public observation: string = "",
    public paid: boolean = false,
    public paid_amount?: number,
    public paid_date?: Date
  ) {
    if (!id) {
      this.generateId();
    }
  }

  private generateId() {
    const random = Math.random;

    let random_id = `${random()}-${random()}-${random()}`;

    this.id = random_id.replaceAll(".", "");
  }

  public pay(amount: number = this.amount) {
    this.paid = true;
    this.paid_amount = amount;
  }
}
