import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MissionDTO } from "../../types/mission";

import MissionCard from "../../components/MissionCard";

import { useEffect } from "react";
import {
  getDailyMissions,
  getTodayMissions,
} from "../../services/missionService";
import { MissionStatus } from "../../types/mission";

export default function MissionScreen() {
  const [selectedTab, setSelectedTab] = useState("today");

  const [todayMissions, setTodayMissions] = useState<MissionDTO[]>([]);
  const [dailyMissions, setDailyMissions] = useState<MissionDTO[]>([]);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    const today = await getTodayMissions();
    const daily = await getDailyMissions();

    setTodayMissions(today);
    setDailyMissions(daily);
  };

  const completedTodayCount = todayMissions.filter(
    (mission) => mission.status === MissionStatus.COMPLETED,
  ).length;

  const completedDailyCount = dailyMissions.filter(
    (mission) => mission.status === MissionStatus.COMPLETED,
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity>
          <Image
            source={require("../../../assets/images/bell.png")}
            style={styles.bell}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={selectedTab === "today" ? styles.activeTab : styles.tab}
          onPress={() => setSelectedTab("today")}
        >
          <Text
            style={
              selectedTab === "today" ? styles.activeTabText : styles.tabText
            }
          >
            오늘 미션
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedTab === "weekly" ? styles.activeTab : styles.tab}
          onPress={() => setSelectedTab("weekly")}
        >
          <Text
            style={
              selectedTab === "weekly" ? styles.activeTabText : styles.tabText
            }
          >
            주간 미션
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedTab === "monthly" ? styles.activeTab : styles.tab}
          onPress={() => setSelectedTab("monthly")}
        >
          <Text
            style={
              selectedTab === "monthly" ? styles.activeTabText : styles.tabText
            }
          >
            월간 미션
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === "today" && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>오늘 미션</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {completedTodayCount}/{todayMissions.length} 완료
                  </Text>
                </View>

                <Text style={styles.resetText}>매일 00:00 초기화</Text>
              </View>

              {todayMissions.map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  mission={mission}
                  onPress={() =>
                    router.push({
                      pathname: "/mission/[id]",
                      params: {
                        id: String(mission.missionId),
                        title: mission.title,
                        description: mission.description,
                        reward: String(mission.rewardPoint),
                        guideSteps: JSON.stringify(mission.guideSteps),
                      },
                    })
                  }
                />
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>매일 미션</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {completedDailyCount}/{dailyMissions.length} 완료
                  </Text>
                </View>

                <Text style={styles.resetText}>매일 00:00 초기화</Text>
              </View>

              {dailyMissions.map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  mission={mission}
                  onPress={() =>
                    router.push({
                      pathname: "/mission/[id]",
                      params: {
                        id: String(mission.missionId),
                        title: mission.title,
                        description: mission.description,
                        reward: String(mission.rewardPoint),

                        progress: String(mission.progress),
                        targetCount: String(mission.targetCount),
                        status: mission.status,
                        missionType: mission.missionType,

                        guideSteps: JSON.stringify(mission.guideSteps),
                      },
                    })
                  }
                />
              ))}
            </View>
          </>
        )}

        {selectedTab === "weekly" && (
          <View style={styles.section}>
            <Text style={styles.emptyTitle}>주간 미션</Text>

            <Text style={styles.emptyText}>주간 미션 API 연동 예정</Text>
          </View>
        )}

        {selectedTab === "monthly" && (
          <View style={styles.section}>
            <Text style={styles.emptyTitle}>월간 미션</Text>

            <Text style={styles.emptyText}>월간 미션 API 연동 예정</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingTop: 4,
    marginBottom: 8,
  },

  logo: {
    width: 100,
    height: 32,
  },

  bell: {
    width: 20,
    height: 20,
  },

  tabContainer: {
    flexDirection: "row",

    marginHorizontal: 16,
    marginBottom: 12,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E8E3D8",

    borderRadius: 14,
    padding: 4,
  },

  activeTab: {
    flex: 1,
    height: 40,

    borderRadius: 10,

    backgroundColor: "#71935B",

    justifyContent: "center",
    alignItems: "center",
  },

  activeTabText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },

  tab: {
    flex: 1,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },

  tabText: {
    color: "#2D2D2D",
    fontSize: 14,
    fontWeight: "700",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  section: {
    backgroundColor: "#FFF",

    borderWidth: 1,
    borderColor: "#E8E3D8",

    borderRadius: 16,

    padding: 14,

    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D2D2D",
  },

  badge: {
    marginLeft: 8,

    backgroundColor: "#E8EFDD",

    borderRadius: 12,

    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  badgeText: {
    fontSize: 10,
    color: "#71935B",
    fontWeight: "700",
  },

  resetText: {
    marginLeft: "auto",

    fontSize: 10,
    color: "#9D9D9D",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    textAlign: "center",
    color: "#777",
  },
});
