import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LOGO_IMAGE = require("../../../assets/images/NaeilBujaLogov2.png");

export default function SignupScreen() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordConfirmHidden, setIsPasswordConfirmHidden] = useState(true);

  const handleSignup = async () => {
    // await signup({ loginId, password, passwordConfirm });

    router.replace("/login");
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

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={15} color="#A7B89A" />

            <TextInput
              style={styles.input}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              placeholder="비밀번호를 다시 입력해 주세요."
              placeholderTextColor="#9B9B9B"
              secureTextEntry={isPasswordConfirmHidden}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setIsPasswordConfirmHidden(!isPasswordConfirmHidden)
              }
            >
              <Ionicons
                name={
                  isPasswordConfirmHidden ? "eye-outline" : "eye-off-outline"
                }
                size={17}
                color="#A6A6A6"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSignup}
          >
            <Text style={styles.submitButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bottomLink}
          activeOpacity={0.7}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.bottomText}>
            이미 계정이 있으신가요?{" "}
            <Text style={styles.bottomBoldText}>로그인하러 가기</Text>
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
  submitButton: {
    height: 47,
    marginTop: 14,
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
