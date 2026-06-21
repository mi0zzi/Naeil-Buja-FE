import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/cute.png")}
          style={styles.character}
          resizeMode="contain"
        />

        <Text style={styles.text}>준비 중입니다..</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFBF6",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
  },

  character: {
    width: 110,
    height: 110,
  },

  text: {
    marginTop: 8,
    fontFamily: "PretendardBold",
    fontSize: 20,
    color: "#2D2D2D",
  },
});
