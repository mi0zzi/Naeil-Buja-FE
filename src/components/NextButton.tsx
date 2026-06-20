import { Pressable, StyleSheet, Text } from "react-native";

type NextButtonProps = {
  title: string;
  onPress: () => void;
};

export default function NextButton({ title, onPress }: NextButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    marginBottom: 56,
    borderRadius: 7,
    backgroundColor: "#587E47",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "PretendardBold",
    fontSize: 13,
    color: "#FFFFFF",
  },
});
