import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import BudgetCard from "./BudgetCard";
import CharacterCard from "./CharacterCard";
import SpeechBubble from "./SpeechBubble";
import TodayMissionCard from "./TodayMissionCard";

import { getHomeData } from "../../../services/homeService";
import { HomeResponseDTO } from "../../../types/home";

const formatWon = (value: number) => `${value.toLocaleString()}원`;

export default function HomeScreen() {
  const [homeData, setHomeData] = useState<HomeResponseDTO | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, []),
  );

  const loadHomeData = async () => {
    const data = await getHomeData();
    setHomeData(data);
  };

  if (!homeData) {
    return <View style={styles.screen} />;
  }

  const monthlyProgress = homeData.remainingBudget / homeData.monthlyBudget;
  const visibleTodayMissions = homeData.todayMissions.slice(0, 2);

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
            helperText={`오늘 예산 ${formatWon(homeData.todayAvailableAmount)}`}
            progressRate={1}
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

        <TodayMissionCard missions={visibleTodayMissions} />
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
