import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MissionCard from "../../components/MissionCard";
import MissionModal from "../../components/MissionModal";

import {
  getMissionsByDate,
  completeMission as requestCompleteMission,
} from "../../services/missionService";

import { MissionDTO, MissionStatus } from "../../types/mission";

export default function MissionScreen() {
  const [selectedTab, setSelectedTab] = useState("today");
  const [missionDate, setMissionDate] = useState("");

  const [todayMissions, setTodayMissions] = useState<MissionDTO[]>([]);
  const [dailyMissions, setDailyMissions] = useState<MissionDTO[]>([]);
  const [selectedMission, setSelectedMission] = useState<MissionDTO | null>(
    null,
  );

  useEffect(() => {
    loadMissions();
  }, []);

  const getTodayDateString = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const getErrorCode = (error: unknown) => {
    if (typeof error === "object" && error !== null && "response" in error) {
      const response = (error as any).response;
      return response?.data?.errorCode;
    }

    return undefined;
  };

  const loadMissions = async () => {
    try {
      const today = getTodayDateString();
      const response = await getMissionsByDate(today);

      setMissionDate(response.date);
      setTodayMissions(response.todayMissions ?? []);
      setDailyMissions(response.dailyMissions ?? []);
    } catch (error) {
      console.error("미션 조회 실패", error);

      setTodayMissions([]);
      setDailyMissions([]);

      Alert.alert("오류", "미션을 불러오지 못했습니다.");
    }
  };

  const updateMissionToCompleted = (
    missionId: number,
    status: MissionStatus,
    rewardPoint: number,
    pointReceived: boolean,
  ) => {
    const updateMission = (mission: MissionDTO) =>
      mission.missionId === missionId
        ? {
            ...mission,
            status,
            rewardPoint,
            pointReceived,
          }
        : mission;

    setTodayMissions((prevMissions) => prevMissions.map(updateMission));
    setDailyMissions((prevMissions) => prevMissions.map(updateMission));
  };

  const completeMission = async (missionId: number) => {
    try {
      const response = await requestCompleteMission(missionId, {
        date: missionDate || getTodayDateString(),
      });

      updateMissionToCompleted(
        response.missionId,
        response.status,
        response.rewardPoint,
        response.pointReceived,
      );

      setSelectedMission(null);
    } catch (error) {
      console.error("미션 완료 실패", error);

      const errorCode = getErrorCode(error);

      switch (errorCode) {
        case "MISSION_NOT_FOUND":
          Alert.alert("오류", "미션을 찾을 수 없습니다.");
          break;

        case "MISSION_NOT_COMPLETABLE":
          Alert.alert("알림", "아직 미션 완료 조건을 만족하지 못했습니다.");
          break;

        case "MISSION_ALREADY_COMPLETED":
          Alert.alert("알림", "이미 완료한 미션입니다.");
          setSelectedMission(null);
          await loadMissions();
          break;

        case "FUTURE_MISSION_NOT_ALLOWED":
          Alert.alert("알림", "미래 미션은 완료할 수 없습니다.");
          break;

        default:
          Alert.alert("오류", "미션 완료에 실패했습니다.");
      }
    }
  };

  const completedTodayCount = todayMissions.filter(
    (mission) => mission.status === MissionStatus.COMPLETED,
  ).length;

  const completedDailyCount = dailyMissions.filter(
    (mission) => mission.status === MissionStatus.COMPLETED,
  ).length;

  return (
    <SafeAreaView style={styles.container}>
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
                  key={`today-${mission.missionId}`}
                  mission={mission}
                  onPress={() => setSelectedMission(mission)}
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
                  key={`daily-${mission.missionId}`}
                  mission={mission}
                  onPress={() => setSelectedMission(mission)}
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

      <MissionModal
        visible={selectedMission !== null}
        mission={selectedMission}
        date={missionDate}
        onClose={() => setSelectedMission(null)}
        onComplete={completeMission}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFBF6",
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E3D8",
    borderRadius: 10,
    padding: 4,
  },

  activeTab: {
    flex: 1,
    height: 35,
    borderRadius: 15,
    backgroundColor: "#69885A",
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabText: {
    fontFamily: "PretendardSemiBold",
    color: "#FFFFFF",
    fontSize: 13,
  },

  tab: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  tabText: {
    fontFamily: "PretendardSemiBold",
    color: "#2D2D2D",
    fontSize: 13,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E3D8",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 5,
    marginBottom: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },

  sectionTitle: {
    fontFamily: "PretendardBold",
    fontSize: 17,
    color: "#35352C",
  },

  badge: {
    marginLeft: 8,
    backgroundColor: "#EFF2E4",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  badgeText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 9.5,
    color: "#537842",
  },

  resetText: {
    marginLeft: "auto",
    fontFamily: "PretendardMedium",
    fontSize: 9.5,
    color: "#7E7A71",
  },

  emptyTitle: {
    fontFamily: "PretendardBold",
    fontSize: 17,
    color: "#35352C",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    fontFamily: "PretendardRegular",
    fontSize: 12,
    color: "#777777",
    textAlign: "center",
  },
});
