import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NextButton from "../../components/NextButton";

import AmountInput from "./AmountInput";
import TextInput from "./TextInput";

const TOTAL_STEP = 5;

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);

  const [nickname, setNickname] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("600000");
  const [fixedExpense, setFixedExpense] = useState("130000");
  const [monthlySavingGoal, setMonthlySavingGoal] = useState("400000");

  const currentAmount =
    step === 3 ? monthlyBudget : step === 4 ? fixedExpense : monthlySavingGoal;

  const availableSaving =
    Number(monthlyBudget || 0) - Number(fixedExpense || 0);

  const setCurrentAmount = (value: string) => {
    if (step === 3) {
      setMonthlyBudget(value);
      return;
    }

    if (step === 4) {
      setFixedExpense(value);
      return;
    }

    setMonthlySavingGoal(value);
  };

  const handleNumberPress = (num: string) => {
    if (currentAmount.length >= 9) return;

    setCurrentAmount(currentAmount === "0" ? num : currentAmount + num);
  };

  const handleDelete = () => {
    setCurrentAmount(
      currentAmount.length <= 1 ? "0" : currentAmount.slice(0, -1),
    );
  };

  const goBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (step === 1 && !nickname.trim()) {
      Alert.alert("알림", "닉네임을 입력해 주세요.");
      return;
    }

    if (step === 2 && !characterName.trim()) {
      Alert.alert("알림", "말랑이 이름을 입력해 주세요.");
      return;
    }

    if (step < TOTAL_STEP) {
      setStep((prev) => prev + 1);
      return;
    }

    // TODO: 온보딩 저장 API 구현 후 saveOnboarding 연결
    // 요청 필드명:
    // nickname, characterName, monthlyBudget, monthlySavingGoal, fixedExpense
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {step > 1 && (
          <Pressable style={styles.backButton} onPress={goBack}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        )}

        <ProgressDots currentStep={step} />

        <View style={styles.content}>
          {step === 1 && (
            <TextInput
              titleTop="앱에서 사용할"
              highlightText="닉네임"
              titleBottom="을 정해 주세요"
              value={nickname}
              placeholder="닉네임을 입력해 주세요."
              onChangeText={(text) => setNickname(text.slice(0, 10))}
            />
          )}

          {step === 2 && (
            <TextInput
              titlePrefix="함께 절약할 "
              highlightText="말랑이"
              titleBottom="의"
              titleSecondLine="이름을 지어 주세요"
              value={characterName}
              placeholder="말랑이의 이름을 지어 주세요."
              showCharacterImage
              onChangeText={(text) => setCharacterName(text.slice(0, 10))}
            />
          )}

          {step === 3 && (
            <AmountInput
              titleTop="한 달 동안 사용할"
              highlightText="예산"
              titleBottom="을 알려 주세요"
              description="추후에 사용할 예산을 변경할 수 있어요"
              amount={monthlyBudget}
              onPressNumber={handleNumberPress}
              onDelete={handleDelete}
            />
          )}

          {step === 4 && (
            <AmountInput
              titleTop="한 달 동안 나가는"
              highlightText="고정 지출"
              titleBottom="을 알려 주세요"
              description="추후에 고정 지출을 변경할 수 있어요"
              amount={fixedExpense}
              onPressNumber={handleNumberPress}
              onDelete={handleDelete}
            />
          )}

          {step === 5 && (
            <AmountInput
              titleTop="절약하고 싶은"
              highlightText="목표 비용"
              titleBottom="을 설정해 주세요"
              description="목표 비용에 맞춰 예산을 정해 드려요"
              amount={monthlySavingGoal}
              helperText={`한달키 남은 ${availableSaving.toLocaleString()}원 이하로 설정할 수 있어요`}
              onPressNumber={handleNumberPress}
              onDelete={handleDelete}
            />
          )}
        </View>

        <NextButton
          title={step === TOTAL_STEP ? "시작하기" : "다음"}
          onPress={goNext}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ProgressDots({ currentStep }: { currentStep: number }) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: TOTAL_STEP }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index < currentStep && styles.activeProgressDot,
            index === currentStep - 1 && styles.currentProgressDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 26,
  },
  backButton: {
    position: "absolute",
    top: 72,
    left: 22,
    zIndex: 10,
  },
  backText: {
    fontSize: 30,
    color: "#35352C",
  },
  progressRow: {
    marginTop: 42,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  progressDot: {
    width: 13,
    height: 5,
    borderRadius: 20,
    backgroundColor: "#D6D3C6",
  },
  activeProgressDot: {
    backgroundColor: "#587E47",
  },
  currentProgressDot: {
    height: 8,
  },
  content: {
    flex: 1,
    paddingTop: 132,
    alignItems: "center",
  },
});
