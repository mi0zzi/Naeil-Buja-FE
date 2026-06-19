import {
  MissionStatus,
  MissionType,
} from '../types/mission';

export const missionTypeLabel = {
  [MissionType.EXPENSE_RECORD]: '소비 기록하기',
  [MissionType.AVOID_CATEGORY]: '특정 소비 안 하기',
  [MissionType.UNDER_DAILY_BUDGET]: '오늘 예산 지키기',
  [MissionType.UNDER_MONTHLY_BUDGET]: '월 예산 지키기',
};

export const missionStatusLabel = {
  [MissionStatus.SCHEDULED]: '예정',
  [MissionStatus.IN_PROGRESS]: '진행중',
  [MissionStatus.COMPLETABLE]: '완료 가능',
  [MissionStatus.COMPLETED]: '완료',
  [MissionStatus.FAILED]: '실패',
};