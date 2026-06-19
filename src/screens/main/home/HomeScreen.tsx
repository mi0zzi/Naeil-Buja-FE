import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import BudgetCard from "./BudgetCard";
import CharacterCard from "./CharacterCard";
import SpeechBubble from "./SpeechBubble";
import TodayMissionCard, { Mission } from "./TodayMissionCard";

type HomeResponse = {
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
  todayMissions: Mission[];
};

const TODAY_BUDGET = 25000;

const homeData: HomeResponse = {
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

const formatWon = (value: number) => `${value.toLocaleString()}원`;

export default function HomeScreen() {
  const monthlyProgress = homeData.remainingBudget / homeData.monthlyBudget;
  const todayProgress = homeData.todayAvailableAmount / TODAY_BUDGET;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.budgetRow}>
          <BudgetCard
            title="이번 달 남은 예산"
            amount={homeData.remainingBudget}
            helperText={`총 예산 ${formatWon(homeData.monthlyBudget)}`}
            progressRate={monthlyProgress}
          />

          <BudgetCard
            title="오늘 사용 가능한 금액"
            amount={homeData.todayAvailableAmount}
            helperText={`오늘 예산 ${formatWon(TODAY_BUDGET)}`}
            progressRate={todayProgress}
          />
        </View>

        <View style={styles.characterShopRow}>
          <CharacterCard name={homeData.characterName} point={homeData.point} />

          <View style={styles.shopButton}>
            <Text style={styles.shopButtonText}>상점 가기 ›</Text>
          </View>
        </View>

        <Image
          source={require("../../../../assets/images/RoomImage.png")}
          style={styles.roomImage}
          resizeMode="contain"
        />

        <SpeechBubble
          characterName={homeData.characterName}
          message={homeData.speechBubble.message}
        />

        <TodayMissionCard missions={homeData.todayMissions} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFDF7",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  budgetRow: {
    flexDirection: "row",
    gap: 9,
  },
  characterShopRow: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  shopButton: {
    width: 62,
    height: 24,
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#C7D3C1",
    borderRadius: 50,
    backgroundColor: "#EFF2E4",
    alignItems: "center",
    justifyContent: "center",
  },
  shopButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 9,
    color: "#537842",
  },
  roomImage: {
    width: "100%",
    height: 330,
    marginTop: -8,
    alignSelf: "center",
  },
});
