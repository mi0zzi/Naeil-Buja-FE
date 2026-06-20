import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { MissionDTO, MissionType } from "../types/mission";

interface MissionModalProps {
  visible: boolean;
  mission: MissionDTO | null;
  date: string;
  onClose: () => void;
  onComplete: (missionId: number) => void;
}

export default function MissionModal({
  visible,
  mission,
  date,
  onClose,
  onComplete,
}: MissionModalProps) {
  if (!mission) return null;

  const isAvoidCategoryMission =
    mission.missionType === MissionType.AVOID_CATEGORY;

  const handleComplete = () => {
    onComplete(mission.missionId);
  };

  const formatMissionDate = (dateString: string) => {
    if (!dateString) return "오늘 미션";

    const [, month, day] = dateString.split("-");

    return `${Number(month)}월 ${Number(day)}일 오늘 미션`;
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.dateText}>{formatMissionDate(date)}</Text>

          <Image
            source={require("../../assets/images/categories/delivery.png")}
            style={styles.icon}
            resizeMode="contain"
          />

          <Text style={styles.title}>{mission.title}</Text>

          {isAvoidCategoryMission ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.failButton} onPress={onClose}>
                <Text style={styles.failButtonText}>실패</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.successButton}
                onPress={handleComplete}
              >
                <Text style={styles.successButtonText}>성공</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}
            >
              <Text style={styles.completeButtonText}>완료</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },

  modalContainer: {
    width: "100%",
    height: 194,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EFF2E4",
    borderRadius: 10,

    alignItems: "center",

    paddingTop: 25,
  },

  closeButton: {
    position: "absolute",
    top: 17,
    left: 19,

    width: 24,
    height: 24,

    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontFamily: "PretendardRegular",
    fontSize: 32,
    lineHeight: 32,
    color: "#111111",
  },

  dateText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 11,
    color: "#7E7A71",

    marginBottom: 10,
  },

  icon: {
    width: 54,
    height: 54,

    marginBottom: 10,
  },

  title: {
    fontFamily: "PretendardBold",
    fontSize: 20,
    lineHeight: 28,
    color: "#111111",
    textAlign: "center",

    marginBottom: 17,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  failButton: {
    width: 60,
    height: 29,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: "#587E47",

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",
  },

  failButtonText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 13,
    color: "#587E47",
  },

  successButton: {
    width: 60,
    height: 29,

    borderRadius: 20,

    backgroundColor: "#587E47",

    justifyContent: "center",
    alignItems: "center",
  },

  successButtonText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 13,
    color: "#FFFFFF",
  },

  completeButton: {
    width: 60,
    height: 29,

    borderRadius: 20,

    backgroundColor: "#587E47",

    justifyContent: "center",
    alignItems: "center",
  },

  completeButtonText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 13,
    color: "#FFFFFF",
  },
});
