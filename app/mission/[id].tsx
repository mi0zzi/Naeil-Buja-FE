import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MissionDetailScreen() {
  const {
    title,
    description,
    reward,
    id,
    guideSteps,
    progress,
    targetCount,
    status,
    missionType,
  } = useLocalSearchParams();

  const steps = guideSteps ? JSON.parse(String(guideSteps)) : [];
  const currentProgress = Number(progress ?? 0);
  const currentTarget = Number(targetCount ?? 1);

  const percent =
    currentTarget === 0 ? 0 : (currentProgress / currentTarget) * 100;

  const getStatusText = () => {
    switch (String(status)) {
      case "COMPLETED":
        return "완료";

      case "COMPLETABLE":
        return "보상 수령";

      case "IN_PROGRESS":
        return "진행 중";

      case "FAILED":
        return "실패";

      default:
        return "예정";
    }
  };

  const getButtonText = () => {
    switch (String(missionType)) {
      case "EXPENSE_RECORD":
        return "미션 수행하기";

      case "AVOID_CATEGORY":
        return "확인하기";

      case "UNDER_DAILY_BUDGET":
        return "예산 확인하기";

      default:
        return "홈으로 돌아가기";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>미션 상세</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.missionCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>오늘 미션</Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.description}>{description}</Text>

          <View style={styles.bottomRow}>
            <View style={styles.pointChip}>
              <Text style={styles.pointText}>+{reward}P</Text>
            </View>

            <View style={styles.statusChip}>
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.progressRow}>
            <Text style={styles.boxTitle}>미션 진행도</Text>

            <Text style={styles.progressText}>
              {currentProgress} / {currentTarget} 완료
            </Text>
          </View>

          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percent}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.percent}>{Math.round(percent)}%</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>수행 방법</Text>

          {steps.map((step: string, index: number) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.numberCircle}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>TIP</Text>
          <Text style={styles.tipText}>작은 습관이 모여 큰 절약이 됩니다.</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {
          if (String(id) === "1") {
            router.push("/add");
            return;
          }

          router.back();
        }}
      >
        <Text style={styles.actionButtonText}>{getButtonText()}</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  back: {
    fontSize: 24,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  logo: {
    width: 110,
    height: 40,
    marginLeft: 16,
    marginBottom: 12,
  },

  missionCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E3D8",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8EFDD",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    color: "#71935B",
    fontSize: 11,
    fontWeight: "700",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
  },

  description: {
    marginTop: 8,
    color: "#777",
  },

  bottomRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  pointChip: {
    borderWidth: 1,
    borderColor: "#D89E1E",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  pointText: {
    color: "#D89E1E",
    fontWeight: "700",
  },

  statusChip: {
    marginLeft: 8,
    backgroundColor: "#E8EFDD",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  statusText: {
    color: "#71935B",
    fontWeight: "700",
  },

  box: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E3D8",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  boxTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  progressText: {
    color: "#71935B",
    fontWeight: "700",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#ECECEC",
    borderRadius: 999,
    marginTop: 12,
  },

  progressFill: {
    width: "0%",
    height: "100%",
    backgroundColor: "#71935B",
    borderRadius: 999,
  },

  percent: {
    marginTop: 8,
    color: "#71935B",
    fontWeight: "700",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  numberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#71935B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  numberText: {
    color: "#FFF",
    fontWeight: "700",
  },

  stepText: {
    flex: 1,
    color: "#555",
  },

  tipBox: {
    backgroundColor: "#EEF3E8",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  tipTitle: {
    color: "#71935B",
    fontWeight: "700",
    marginBottom: 6,
  },

  tipText: {
    color: "#555",
  },

  actionButton: {
    height: 56,
    backgroundColor: "#71935B",
    margin: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
