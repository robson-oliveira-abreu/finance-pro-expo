import { ICurrencyContext } from "@infra/Hooks/useCurrency/useCurrencyContext.hook";

export type TGoalsModel = {
  groupedExpenses: {
    paid: number;
    payable: number;
    overdue: number;
    total: number;
  };
};

export type GoalsViewProps = {
  currency: ICurrencyContext;
} & TGoalsModel;
