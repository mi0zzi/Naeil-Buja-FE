export interface CalendarMonthResponseDTO {
  month: string;
  summary: CalendarSummaryDTO;
  days: CalendarDayDTO[];
}

export interface CalendarSummaryDTO {
  monthlyBudget: number;
  monthlySavingGoal: number;
  monthlyExpenseAmount: number;
  remainingBudget: number;
  todayAvailableAmount: number;
}

export interface CalendarDayDTO {
  date: string;
  totalExpenseAmount: number;
  missionTotalCount: number;
  missionCompletedCount: number;
  hasExpense: boolean;
  hasCompletedMission: boolean;
  isFuture: boolean;
}

export interface CalendarDayDetailResponseDTO {
  date: string;
  totalExpenseAmount: number;
  expenses: CalendarExpenseDTO[];
  missions: CalendarMissionDTO[];
}

export interface CalendarExpenseDTO {
  expenseId: number;
  categoryCode: string;
  categoryName: string;
  amount: number;
  memo: string;
}

export interface CalendarMissionDTO {
  missionId: number;
  title: string;
  rewardPoint: number;
  status: string;
}
