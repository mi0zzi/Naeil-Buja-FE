import { MissionStatus, MissionType } from "../types/mission";

export const todayMissionMock = [
  {
    missionId: 1,
    title: "오늘의 소비 기록하기",
    description: "오늘 총 얼마 사용했는지 기록해 주세요.",
    missionType: MissionType.EXPENSE_RECORD,
    progress: 0,
    targetCount: 1,
    rewardPoint: 200,
    status: MissionStatus.IN_PROGRESS,
    pointReceived: false,

    guideSteps: [
      "지출 입력 화면으로 이동해요",
      "금액과 카테고리를 입력해요",
      "저장하면 미션이 완료돼요",
    ],
  },

  {
    missionId: 2,
    title: "배달 시켜먹지 않기",
    description: "오늘 하루 배달 소비를 하지 않아요.",
    missionType: MissionType.AVOID_CATEGORY,
    progress: 0,
    targetCount: 1,
    rewardPoint: 300,
    status: MissionStatus.IN_PROGRESS,
    pointReceived: false,

    guideSteps: [
      "배달 주문을 하지 않아요",
      "집에 있는 음식으로 식사해요",
      "하루 종료 시 자동 판정돼요",
    ],
  },

  {
    missionId: 3,
    title: "오늘 예산 지키기",
    description: "설정한 하루 예산 이하로 소비하기",
    missionType: MissionType.UNDER_DAILY_BUDGET,
    progress: 0,
    targetCount: 1,
    rewardPoint: 200,
    status: MissionStatus.IN_PROGRESS,
    pointReceived: false,

    guideSteps: [
      "오늘 예산을 확인해요",
      "예산 안에서 소비해요",
      "하루 종료 시 자동 판정돼요",
    ],
  },
];

export const dailyMissionMock = [
  {
    missionId: 4,
    title: "출석 체크",
    description: "하루 한 번 출석하기",
    missionType: MissionType.EXPENSE_RECORD,
    progress: 0,
    targetCount: 1,
    rewardPoint: 100,
    status: MissionStatus.IN_PROGRESS,
    pointReceived: false,

    guideSteps: [
      "출석 버튼을 눌러요",
      "출석 완료 시 포인트 획득",
      "매일 자정 초기화",
    ],
  },
];