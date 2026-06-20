import {
    CalendarDayDetailResponseDTO,
    CalendarMonthResponseDTO,
} from "../types/calendar";

export const getCalendarMonth = async (
  month: string,
): Promise<CalendarMonthResponseDTO> => {
  return {
    month,
    summary: {
      monthlyBudget: 600000,
      monthlySavingGoal: 100000,
      monthlyExpenseAmount: 243000,
      remainingBudget: 357000,
      todayAvailableAmount: 12500,
    },
    days: [
      {
        date: "2026-06-18",
        totalExpenseAmount: 4500,
        missionTotalCount: 3,
        missionCompletedCount: 2,
        hasExpense: true,
        hasCompletedMission: true,
        isFuture: false,
      },
    ],
  };
};

export const getCalendarDayDetail = async (
  date: string,
): Promise<CalendarDayDetailResponseDTO> => {
  return {
    date,
    totalExpenseAmount: 4500,
    expenses: [
      {
        expenseId: 1,
        categoryCode: "CAFE",
        categoryName: "카페",
        amount: 4500,
        memo: "아이스 아메리카노",
      },
    ],
    missions: [
      {
        missionId: 1,
        title: "오늘의 소비 기록하기",
        rewardPoint: 200,
        status: "COMPLETED",
      },
    ],
  };
};
