import { Image, StyleSheet, View } from "react-native";

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/NaeilBujaLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#FFFDF7",
  },
  logo: {
    width: 126,
    height: 34,
  },
});
