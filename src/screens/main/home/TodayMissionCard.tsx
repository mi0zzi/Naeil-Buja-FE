import { StyleSheet, Text, View } from "react-native";

export type Mission = {
  missionId: number;
  title: string;
  description: string;
  progress: number;
  targetCount: number;
  rewardPoint: number;
  status: "IN_PROGRESS" | "COMPLETED";
};

type TodayMissionCardProps = {
  missions: Mission[];
  totalCount?: number;
};

export default function TodayMissionCard({
  missions,
  totalCount = 4,
}: TodayMissionCardProps) {
  const completedCount = missions.filter(
    (mission) => mission.status === "COMPLETED",
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 미션</Text>
        <Text style={styles.countText}>
          {completedCount}/{totalCount} 완료
        </Text>
      </View>

      <View style={styles.missionList}>
        {missions.map((mission) => (
          <View key={mission.missionId} style={styles.missionItem}>
            <Text style={styles.missionTitle} numberOfLines={1}>
              {mission.title}
            </Text>

            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>+{mission.rewardPoint}P</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>
        ))}
      </View>

      <View style={styles.dots}>
        <View style={styles.activeDot} />
        <View style={styles.inactiveDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 152,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: "#EFECE6",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: "PretendardSemiBold",
    fontSize: 12,
    lineHeight: 26,
    color: "#7E7A71",
  },
  countText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 11,
    lineHeight: 26,
    color: "#7E7A71",
    textAlign: "right",
  },
  missionList: {
    gap: 10,
    paddingBottom: 22,
  },
  missionItem: {
    width: "100%",
    height: 39,
    paddingLeft: 14,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#EFF2E4",
    borderRadius: 10,
    backgroundColor: "#F9FBF0",
    flexDirection: "row",
    alignItems: "center",
  },
  missionTitle: {
    flex: 1,
    fontFamily: "PretendardSemiBold",
    fontSize: 13,
    lineHeight: 21,
    color: "#35352C",
  },
  rewardBadge: {
    width: 46,
    height: 20,
    borderWidth: 1,
    borderColor: "#E9B440",
    borderRadius: 15,
    backgroundColor: "#FFF0D5",
    alignItems: "center",
    justifyContent: "center",
  },
  rewardText: {
    fontFamily: "PretendardBold",
    fontSize: 9.5,
    lineHeight: 18,
    color: "#96702A",
  },
  arrow: {
    marginLeft: 10,
    fontSize: 24,
    lineHeight: 26,
    color: "#35352C",
  },
  dots: {
    position: "absolute",
    bottom: 7,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#749364",
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C9C7B8",
  },
});
