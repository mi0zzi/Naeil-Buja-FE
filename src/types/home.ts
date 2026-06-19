export type HomeMissionStatus = "IN_PROGRESS" | "COMPLETED";

export type HomeMission = {
  missionId: number;
  title: string;
  description: string;
  progress: number;
  targetCount: number;
  rewardPoint: number;
  status: HomeMissionStatus;
};

export type HomeResponse = {
  nickname: string;
  characterName: string;
  monthlyBudget: number;
  monthlySavingGoal: number;
  monthlyExpenseAmount: number;
  remainingBudget: number;
  todayAvailableAmount: number;
  point: number;
  budgetStatus: "NORMAL" | "WARNING" | "DANGER";
  speechBubble: {
    type: string;
    message: string;
    level: string;
  };
  room: {
    backgroundImageUrl: string;
    appliedItems: {
      itemId: number;
      itemType: string;
      name: string;
      imageUrl: string;
    }[];
  };
  todayMissions: HomeMission[];
};
