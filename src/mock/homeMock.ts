import { HomeResponse } from "../types/home";

export const homeMock: HomeResponse = {
  nickname: "민지",
  characterName: "말랑이",
  monthlyBudget: 600000,
  monthlySavingGoal: 100000,
  monthlyExpenseAmount: 243000,
  remainingBudget: 357000,
  todayAvailableAmount: 12500,
  point: 12500,
  budgetStatus: "NORMAL",
  speechBubble: {
    type: "NORMAL",
    message: "... 우리 지금 절약 잘하고 있는 거 맞지?",
    level: "INFO",
  },
  room: {
    backgroundImageUrl: "/rooms/default-room.png",
    appliedItems: [
      {
        itemId: 1,
        itemType: "WALLPAPER",
        name: "기본 벽지",
        imageUrl: "/items/wallpaper-default.png",
      },
    ],
  },
  todayMissions: [
    {
      missionId: 1,
      title: "오늘의 소비 기록하기",
      description: "오늘 소비를 한 번 기록해 주세요.",
      progress: 0,
      targetCount: 1,
      rewardPoint: 200,
      status: "IN_PROGRESS",
    },
    {
      missionId: 2,
      title: "배달 시켜먹지 않기",
      description: "오늘은 배달 대신 절약해봐요.",
      progress: 0,
      targetCount: 1,
      rewardPoint: 300,
      status: "IN_PROGRESS",
    },
  ],
};
