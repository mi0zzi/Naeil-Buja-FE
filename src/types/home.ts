import { MissionStatus } from "./mission";

export interface HomeResponseDTO {
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
  todayMissions: {
    missionId: number;
    title: string;
    description: string;
    progress: number;
    targetCount: number;
    rewardPoint: number;
    status: MissionStatus;
  }[];
}
