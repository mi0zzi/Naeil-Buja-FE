import { StyleSheet, Text, TextInput, View } from "react-native";

type AmountInputProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export default function AmountInput({ value, onChangeText }: AmountInputProps) {
  return (
    <View style={styles.amountCard}>
      <Text style={styles.amountLabel}>금액</Text>

      <View style={styles.amountInputRow}>
        <Text style={styles.wonSymbol}>₩</Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#A7AAA4"
          style={styles.amountInput}
        />

        <Text style={styles.amountUnit}>원</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amountCard: {
    height: 121,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: "#A2AA89",
    borderRadius: 10,
    backgroundColor: "#F6F3EB",
  },
  amountLabel: {
    fontFamily: "PretendardBold",
    fontSize: 16,
    color: "#6F8F57",
  },
  amountInputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  wonSymbol: {
    marginRight: 12,
    fontFamily: "PretendardMedium",
    fontSize: 32,
    color: "#35352C",
  },
  amountInput: {
    flex: 1,
    fontFamily: "PretendardRegular",
    fontSize: 32,
    color: "#35352C",
    padding: 0,
  },
  amountUnit: {
    fontFamily: "PretendardBold",
    fontSize: 18,
    color: "#557A45",
  },
});
