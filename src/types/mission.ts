export enum MissionStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETABLE = "COMPLETABLE",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum MissionType {
  EXPENSE_RECORD = "EXPENSE_RECORD",
  AVOID_CATEGORY = "AVOID_CATEGORY",
  UNDER_DAILY_BUDGET = "UNDER_DAILY_BUDGET",
  UNDER_MONTHLY_BUDGET = "UNDER_MONTHLY_BUDGET",
}

export interface MissionDTO {
  missionId: number;
  title: string;
  description: string;
  missionType: MissionType;
  progress: number;
  targetCount: number;
  rewardPoint: number;
  status: MissionStatus;
  pointReceived: boolean;
}

export interface MissionListResponseDTO {
  date: string;
  isFuture: boolean;
  missions: MissionDTO[];
}

export interface MissionCompleteRequestDTO {
  date: string;
}

export interface MissionCompleteResponseDTO {
  missionId: number;
  status: MissionStatus;
  rewardPoint: number;
  currentPoint: number;
  pointReceived: boolean;
}
