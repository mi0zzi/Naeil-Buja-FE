import { DimensionValue, StyleSheet, Text, View } from "react-native";

type BudgetCardProps = {
  title: string;
  amount: number;
  helperText: string;
  progressRate: number;
};

export default function BudgetCard({
  title,
  amount,
  helperText,
  progressRate,
}: BudgetCardProps) {
  const safeRate = Math.min(Math.max(progressRate, 0), 1);
  const progressWidth: DimensionValue = `${safeRate * 100}%`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.amountRow}>
        <Text style={styles.amount}>{amount.toLocaleString()}</Text>
        <Text style={styles.unit}>원</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 102,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#749364",
  },
  title: {
    fontFamily: "PretendardMedium",
    fontSize: 11,
    color: "#FFFFFF",
  },
  amountRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  amount: {
    fontFamily: "PretendardBold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  unit: {
    marginBottom: 1,
    fontFamily: "PretendardBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  progressTrack: {
    width: "100%",
    height: 8,
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#D7DDC2",
  },
  helperText: {
    marginTop: 5,
    fontFamily: "PretendardMedium",
    fontSize: 6,
    color: "#FFFFFF",
    textAlign: "right",
  },
});
