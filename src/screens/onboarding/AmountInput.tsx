import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type AmountInputStepProps = {
  titleTop: string;
  highlightText: string;
  titleBottom: string;
  description: string;
  amount: string;
  helperText?: string;
  onPressNumber: (num: string) => void;
  onDelete: () => void;
};

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const formatWon = (value: string) => {
  if (!value) return "0원";
  return `${Number(value).toLocaleString()}원`;
};

export default function AmountInputStep({
  titleTop,
  highlightText,
  titleBottom,
  description,
  amount,
  helperText,
  onPressNumber,
  onDelete,
}: AmountInputStepProps) {
  return (
    <>
      <Text style={styles.title}>{titleTop}</Text>

      <Text style={styles.title}>
        <Text style={styles.greenText}>{highlightText}</Text>
        {titleBottom}
      </Text>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.amountBox}>
        <Image
          source={require("../../../assets/images/wallet.png")}
          style={styles.walletIcon}
          resizeMode="contain"
        />

        <Text style={styles.amountText}>{formatWon(amount)}</Text>
      </View>

      {helperText && <Text style={styles.hintText}>{helperText}</Text>}

      <View style={styles.numberPad}>
        {numbers.map((num) => (
          <Pressable
            key={num}
            style={styles.numberButton}
            onPress={() => onPressNumber(num)}
          >
            <Text style={styles.numberText}>{num}</Text>
          </Pressable>
        ))}

        <View style={styles.emptyNumberButton} />

        <Pressable
          style={styles.numberButton}
          onPress={() => onPressNumber("0")}
        >
          <Text style={styles.numberText}>0</Text>
        </Pressable>

        <Pressable style={styles.numberButton} onPress={onDelete}>
          <Text style={styles.numberText}>⌫</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "PretendardBold",
    fontSize: 22,
    lineHeight: 30,
    color: "#111111",
    textAlign: "center",
  },
  greenText: {
    color: "#587E47",
  },
  description: {
    marginTop: 12,
    marginBottom: 24,
    fontFamily: "PretendardSemiBold",
    fontSize: 11,
    color: "#111111",
  },
  amountBox: {
    width: 321,
    height: 61,
    marginBottom: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D7DDC2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  walletIcon: {
    width: 28,
    height: 28,
  },
  amountText: {
    flex: 1,
    textAlign: "right",
    fontFamily: "PretendardBold",
    fontSize: 24,
    color: "#587E47",
  },
  hintText: {
    marginTop: -6,
    marginBottom: 14,
    fontFamily: "PretendardRegular",
    fontSize: 10,
    color: "#7E7A71",
  },
  numberPad: {
    width: 321,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 6,
    rowGap: 8,
  },
  numberButton: {
    width: 103,
    height: 44,
    borderWidth: 1,
    borderColor: "#D7DDC2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyNumberButton: {
    width: 103,
    height: 44,
  },
  numberText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 20,
    color: "#35352C",
  },
});
