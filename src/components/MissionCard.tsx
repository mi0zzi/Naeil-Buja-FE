import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MissionDTO, MissionStatus } from "../types/mission";

interface Props {
  mission: MissionDTO;
  onPress: () => void;
}

export default function MissionCard({ mission, onPress }: Props) {
  const isCompleted = mission.status === MissionStatus.COMPLETED;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, isCompleted && styles.completedCard]}
    >
      <View style={styles.content}>
        <View style={styles.textArea}>
          <Text style={styles.title} numberOfLines={1}>
            {mission.title}
          </Text>

          <Text style={styles.description} numberOfLines={1}>
            {mission.description}
          </Text>
        </View>

        {isCompleted ? (
          <View style={styles.checkButton}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        ) : (
          <View style={styles.rewardButton}>
            <Text style={styles.rewardText}>+{mission.rewardPoint}P</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 64,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EFF2E4",

    borderRadius: 10,

    paddingLeft: 22,
    paddingRight: 18,

    marginBottom: 9,

    justifyContent: "center",
  },

  completedCard: {
    backgroundColor: "#EFF2E4",
    borderColor: "#EFF2E4",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  textArea: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D2D2D",

    marginBottom: 4,
  },

  description: {
    fontSize: 11,
    fontWeight: "400",
    color: "#7C7C7C",
  },

  rewardButton: {
    width: 53,
    height: 24,

    borderWidth: 1,
    borderColor: "#E9B440",

    borderRadius: 15,

    backgroundColor: "#FFF0D5",

    justifyContent: "center",
    alignItems: "center",
  },

  rewardText: {
    color: "#96702A",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 18,
  },

  checkButton: {
    width: 53,
    height: 24,

    borderRadius: 15,

    backgroundColor: "#5B7E47",

    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
});
