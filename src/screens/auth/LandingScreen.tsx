import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LOGO_IMAGE = require("../../../assets/images/NaeilBujaLogov2.png");

export default function LandingScreen() {
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Image
          source={LOGO_IMAGE}
          style={isIntro ? styles.logoLarge : styles.logo}
          resizeMode="contain"
        />

        {!isIntro && (
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.signupButton}
              activeOpacity={0.8}
              onPress={() => router.push("/signup")}
            >
              <Text style={styles.signupButtonText}>회원가입</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFDF7",
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logoLarge: {
    width: 190,
    height: 190,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },
  buttonArea: {
    width: "100%",
    alignItems: "center",
    gap: 13,
  },
  signupButton: {
    width: 321,
    height: 50,
    borderWidth: 1,
    borderColor: "#425940",
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#425940",
  },
  loginButton: {
    width: 321,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#587E47",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
