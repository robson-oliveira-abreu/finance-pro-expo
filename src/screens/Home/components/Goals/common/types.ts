export type TGoalsModel = {
  groupedExpenses: {
    paid: number;
    payable: number;
    overdue: number;
  };
};

export type GoalsViewProps = {} & TGoalsModel;
