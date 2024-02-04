import { generateId } from "../utils/generateId";

export type ExpenseModel = {
  id: string;
  description: string;
  amount: number;
  due_date: Date;
  installment: number;
  installments: number;
  observation: string;
  paid: boolean;
  paid_amount?: number;
  paid_date?: Date;
};

export function ExpenseModel(
  id: string | null = null,
  description: string,
  amount: number,
  due_date: Date = new Date(),
  installment: number = 1,
  installments: number = 1,
  observation: string = "",
  paid: boolean = false,
  paid_amount?: number,
  paid_date?: Date
): ExpenseModel {
  return {
    id: id || generateId(),
    description,
    amount,
    due_date,
    installment,
    installments,
    observation,
    paid,
    paid_amount,
    paid_date,
  };
}

// export class ExpenseModel {
//   constructor(
//     public id: string = undefined,
//     public description: string,
//     public amount: number,
//     public due_date: Date = new Date(),
//     public installment: number = 1,
//     public installments: number = 1,
//     public observation: string = "",
//     public paid: boolean = false,
//     public paid_amount?: number,
//     public paid_date?: Date
//   ) {
//     if (!id) {
//       this.generateId();
//     }
//   }

//   private generateId() {
//     const random = Math.random;

//     let random_id = `${random()}-${random()}-${random()}`;

//     this.id = random_id.replaceAll(".", "");
//   }

//   public pay(amount: number = this.amount) {
//     this.paid = true;
//     this.paid_amount = amount;
//   }

//   public getData() {
//     return {
//       id: this.id,
//       amount: this.amount,
//       description: this.description,
//       due_date: this.due_date,
//       installment: this.installment,
//       installments: this.installments,
//       observation: this.observation,
//       paid: this.paid,
//       paid_amount: this.paid_amount,
//       paid_date: this.paid_date,
//     };
//   }
// }
