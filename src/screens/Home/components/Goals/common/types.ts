export type TGoalsModel = {
  groupedExpenses: {
    paid: number;
    payable: number;
    overdue: number;
    total: number;
  };
};

export type GoalsViewProps = {} & TGoalsModel;
