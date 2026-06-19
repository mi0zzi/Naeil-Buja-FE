import React from "react";
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
          <Text style={styles.title}>{mission.title}</Text>

          <Text style={styles.description} numberOfLines={1}>
            {mission.description}
          </Text>
        </View>

        {isCompleted ? (
          <View style={styles.checkButton}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.rewardButton}
            onPress={onPress}
          >
            <Text style={styles.rewardText}>
              +{mission.rewardPoint}P
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",

    borderWidth: 1,
    borderColor: "#E8E3D8",

    borderRadius: 14,

    minHeight: 72,

    paddingHorizontal: 16,
    paddingVertical: 10,

    marginBottom: 8,

    justifyContent: "center",
  },

  completedCard: {
    backgroundColor: "#F2F5EA",
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
    color: "#7C7C7C",
  },

  rewardButton: {
    width: 66,
    height: 30,

    borderWidth: 1.5,
    borderColor: "#D89E1E",

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },

  rewardText: {
    color: "#D89E1E",
    fontSize: 11,
    fontWeight: "700",
  },

  checkButton: {
    width: 66,
    height: 30,

    borderRadius: 15,

    backgroundColor: "#71935B",

    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});