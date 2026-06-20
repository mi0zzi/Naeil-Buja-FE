import { Image, StyleSheet, Text, View } from "react-native";

type SpeechBubbleProps = {
  characterName: string;
  message: string;
};

export default function SpeechBubble({
  characterName,
  message,
}: SpeechBubbleProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/CharacterIcon.png")}
        style={styles.characterImage}
      />

      <View style={styles.bubble}>
        <View style={styles.nameBadge}>
          <Text style={styles.name}>{characterName}</Text>
        </View>

        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -40,
    flexDirection: "row",
    alignItems: "center",
  },
  characterImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  bubble: {
    width: 250,
    height: 32,
    borderWidth: 1,
    borderColor: "#E1E5D3",
    borderRadius: 8,
    backgroundColor: "#FEFDFD",
    justifyContent: "center",
    paddingLeft: 28,
    paddingRight: 8,
    position: "relative",
  },
  nameBadge: {
    position: "absolute",
    left: 8,
    top: -8,
    width: 36,
    height: 14,
    borderRadius: 50,
    backgroundColor: "#587E47",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "PretendardMedium",
    fontSize: 8,
    color: "#FFFFFF",
  },
  message: {
    fontFamily: "PretendardMedium",
    fontSize: 10,
    color: "#7E7A71",
  },
});
