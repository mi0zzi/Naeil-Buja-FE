import { Image, StyleSheet, Text, TextInput } from "react-native";

type TextInputStepProps = {
  titleTop?: string;
  titlePrefix?: string;
  highlightText: string;
  titleBottom: string;
  titleSecondLine?: string;
  value: string;
  placeholder: string;
  showCharacterImage?: boolean;
  onChangeText: (text: string) => void;
};

export default function TextInputStep({
  titleTop,
  titlePrefix = "",
  highlightText,
  titleBottom,
  titleSecondLine,
  value,
  placeholder,
  showCharacterImage = false,
  onChangeText,
}: TextInputStepProps) {
  return (
    <>
      {showCharacterImage && (
        <Image
          source={require("../../../assets/images/categories/meeting.png")}
          style={[styles.characterImage, { marginTop: -60 }]}
          resizeMode="contain"
        />
      )}

      {titleTop && <Text style={styles.title}>{titleTop}</Text>}

      <Text style={styles.title}>
        {titlePrefix}
        <Text style={styles.greenText}>{highlightText}</Text>
        {titleBottom}
      </Text>

      {titleSecondLine && <Text style={styles.title}>{titleSecondLine}</Text>}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8F8A80"
        style={styles.input}
      />

      <Text style={styles.counter}>{value.length} / 10</Text>
    </>
  );
}

const styles = StyleSheet.create({
  characterImage: {
    width: 86,
    height: 58,
    marginBottom: 8,
  },
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
  input: {
    width: 321,
    height: 46,
    marginTop: 30,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D7DDC2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontFamily: "PretendardRegular",
    fontSize: 14,
    fontWeight: "500",
    color: "#7E7A71",
  },
  counter: {
    width: "100%",
    marginTop: 6,
    textAlign: "right",
    fontFamily: "PretendardRegular",
    fontSize: 10,
    color: "#7E7A71",
  },
});
