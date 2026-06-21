import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { login } from "../../services/authService";

const LOGO_IMAGE = require("../../../assets/images/NaeilBujaLogov2.png");

export default function LoginScreen() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const handleLogin = async () => {
    if (!loginId.trim() || !password.trim()) {
      Alert.alert("알림", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const data = await login({ loginId, password });

      await AsyncStorage.setItem("accessToken", data.accessToken);

      router.replace("/onboarding");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.errorCode;

        if (errorCode === "MEMBER_NOT_FOUND") {
          Alert.alert("로그인 실패", "존재하지 않는 계정입니다.");
          return;
        }

        if (errorCode === "INVALID_PASSWORD") {
          Alert.alert("로그인 실패", "비밀번호가 일치하지 않습니다.");
          return;
        }
      }

      Alert.alert("로그인 실패", "잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logoArea}>
          <Image source={LOGO_IMAGE} style={styles.logo} resizeMode="contain" />

          <Text style={styles.description}>
            오늘의 작은 습관이 내일의 큰 자산이 돼요.
          </Text>
        </View>

        <View style={styles.formArea}>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={15} color="#A7B89A" />

            <TextInput
              style={styles.input}
              value={loginId}
              onChangeText={setLoginId}
              placeholder="아이디를 입력해 주세요."
              placeholderTextColor="#9B9B9B"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={15} color="#A7B89A" />

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력해 주세요."
              placeholderTextColor="#9B9B9B"
              secureTextEntry={isPasswordHidden}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            >
              <Ionicons
                name={isPasswordHidden ? "eye-outline" : "eye-off-outline"}
                size={17}
                color="#A6A6A6"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={styles.autoLoginRow}
              activeOpacity={0.7}
              onPress={() => setIsAutoLogin(!isAutoLogin)}
            >
              <View
                style={[styles.checkbox, isAutoLogin && styles.checkedBox]}
              />
              <Text style={styles.optionText}>자동 로그인</Text>
            </TouchableOpacity>

            <Text style={styles.optionText}>비밀번호를 잊어버리셨나요?</Text>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleLogin}
          >
            <Text style={styles.submitButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bottomLink}
          activeOpacity={0.7}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.bottomText}>
            아직 계정이 없다면?{" "}
            <Text style={styles.bottomBoldText}>회원가입하러 가기</Text>
          </Text>
        </TouchableOpacity>
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
  },
  logoArea: {
    marginTop: 150,
    marginBottom: 100,
    alignItems: "center",
  },
  logo: {
    width: 116,
    height: 116,
  },
  description: {
    marginTop: -12,
    fontFamily: "PretendardMedium",
    fontSize: 11,
    color: "#777777",
  },
  formArea: {
    width: "100%",
  },
  inputBox: {
    height: 43,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D6E1CE",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 0,
    fontFamily: "PretendardRegular",
    fontSize: 12,
    color: "#333333",
  },
  optionRow: {
    marginTop: 1,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  autoLoginRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#B8C8AE",
  },
  checkedBox: {
    borderColor: "#568646",
    backgroundColor: "#568646",
  },
  optionText: {
    fontFamily: "PretendardRegular",
    fontSize: 10,
    color: "#666666",
  },
  submitButton: {
    height: 47,
    borderRadius: 10,
    backgroundColor: "#587E47",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  bottomLink: {
    position: "absolute",
    bottom: 54,
  },
  bottomText: {
    fontFamily: "PretendardRegular",
    fontSize: 11,
    color: "#777777",
  },
  bottomBoldText: {
    fontFamily: "PretendardBold",
    color: "#365333",
  },
});
