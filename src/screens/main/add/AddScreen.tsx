import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createExpense } from "../../../services/addService";
import { ApiErrorResponseDTO } from "../../../types/add";
import AmountInput from "./AmountInput";
import CategoryButton from "./CategoryButton";

const categories = [
  {
    code: "FOOD",
    label: "식비",
    icon: require("../../../../assets/images/categories/food.png"),
  },
  {
    code: "DELIVERY",
    label: "배달",
    icon: require("../../../../assets/images/categories/delivery.png"),
  },
  {
    code: "CAFE",
    label: "카페",
    icon: require("../../../../assets/images/categories/cafe.png"),
  },
  {
    code: "TRANSPORT",
    label: "교통",
    icon: require("../../../../assets/images/categories/transport.png"),
  },
  {
    code: "SHOPPING",
    label: "쇼핑",
    icon: require("../../../../assets/images/categories/shopping.png"),
  },
  {
    code: "CONVENIENCE",
    label: "편의점",
    icon: require("../../../../assets/images/categories/convenience.png"),
  },
  {
    code: "MEETING",
    label: "약속",
    icon: require("../../../../assets/images/categories/meeting.png"),
  },
  {
    code: "ETC",
    label: "기타",
    icon: require("../../../../assets/images/categories/etc.png"),
  },
];

const TODAY_AVAILABLE_AMOUNT = 25000;

const formatDate = (date: Date) => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayName = dayNames[date.getDay()];

  return `${year}.${month}.${day} (${dayName})`;
};

const formatDateForRequest = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function AddScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const formattedAmount = useMemo(() => {
    if (!amount) return "";
    return Number(amount).toLocaleString();
  }, [amount]);

  const remainingAfterExpense = useMemo(() => {
    return TODAY_AVAILABLE_AMOUNT - Number(amount || 0);
  }, [amount]);

  const handleAmountChange = (value: string) => {
    setAmount(value.replace(/[^0-9]/g, ""));
  };

  const handleChangeDate = (_: unknown, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setExpenseDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!selectedCategory) {
      Alert.alert("알림", "카테고리를 선택해주세요.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Alert.alert("알림", "금액을 입력해주세요.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(expenseDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      Alert.alert("알림", "아직 기록할 수 없는 날짜입니다.");
      return;
    }

    const expenseData = {
      amount: Number(amount),
      categoryCode: selectedCategory,
      memo: memo.trim(),
      expenseDate: formatDateForRequest(expenseDate),
    };

    try {
      setIsSaving(true);

      const data = await createExpense(expenseData);

      console.log("소비 등록 성공:", data);

      Alert.alert("저장 완료", "소비 기록이 저장되었습니다.", [
        {
          text: "확인",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log("소비 등록 실패:", error);

      if (axios.isAxiosError<ApiErrorResponseDTO>(error)) {
        Alert.alert(
          "저장 실패",
          error.response?.data.message ?? "소비 기록 저장에 실패했습니다.",
        );
        return;
      }

      Alert.alert("저장 실패", "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            <View style={styles.titleArea}>
              <Text style={styles.title}>지출 입력</Text>
              <Text style={styles.subtitle}>사용한 금액을 기록해 주세요!</Text>
            </View>

            <View style={styles.headerPlaceholder} />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.dateCard}
            onPress={() => setShowDatePicker(true)}
          >
            <Image
              source={require("../../../../assets/images/addCalender.png")}
              style={styles.dateIcon}
              resizeMode="contain"
            />

            <View style={styles.dateTextArea}>
              <Text style={styles.dateLabel}>날짜</Text>
              <Text style={styles.dateValue}>{formatDate(expenseDate)}</Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={expenseDate}
              mode="date"
              display={Platform.OS === "ios" ? "compact" : "default"}
              onChange={handleChangeDate}
            />
          )}

          <Text style={styles.sectionTitle}>카테고리</Text>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <CategoryButton
                key={category.code}
                label={category.label}
                icon={category.icon}
                selected={selectedCategory === category.code}
                onPress={() => setSelectedCategory(category.code)}
              />
            ))}
          </View>

          <AmountInput
            value={formattedAmount}
            onChangeText={handleAmountChange}
          />

          <View style={styles.budgetInfoCard}>
            <View style={styles.budgetInfoItem}>
              <Image
                source={require("../../../../assets/images/wallet.png")}
                style={styles.walletIcon}
                resizeMode="contain"
              />

              <View>
                <Text style={styles.budgetLabel}>오늘 사용 가능 금액</Text>
                <Text style={styles.budgetValue}>
                  {TODAY_AVAILABLE_AMOUNT.toLocaleString()}원
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View>
              <Text style={styles.budgetLabel}>입력 후 남은 금액</Text>
              <Text style={styles.budgetValue}>
                {remainingAfterExpense.toLocaleString()}원
              </Text>
            </View>
          </View>

          <Text style={styles.memoTitle}>메모 (선택 사항)</Text>

          <TextInput
            value={memo}
            onChangeText={setMemo}
            placeholder="메모할 사항이 있다면 기록해 주세요."
            placeholderTextColor="#8F8A80"
            style={styles.memoInput}
          />

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.saveButton, isSaving && styles.disabledSaveButton]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "저장 중..." : "저장하기"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFDF7",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIcon: {
    fontSize: 34,
    lineHeight: 36,
    color: "#35352C",
  },
  titleArea: {
    alignItems: "center",
  },
  title: {
    fontFamily: "PretendardBold",
    fontSize: 22,
    color: "#35352C",
  },
  subtitle: {
    marginTop: 7,
    fontFamily: "PretendardSemiBold",
    fontSize: 11,
    color: "#6F8F57",
  },
  headerPlaceholder: {
    width: 34,
  },
  dateCard: {
    height: 56,
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#A2AA89",
    borderRadius: 10,
    backgroundColor: "#FEFBF6",
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    width: 29,
    height: 29,
    marginRight: 14,
  },
  dateTextArea: {
    flex: 1,
  },
  dateLabel: {
    fontFamily: "PretendardBold",
    fontSize: 10,
    color: "#6F8F57",
  },
  dateValue: {
    marginTop: 2,
    fontFamily: "PretendardSemiBold",
    fontSize: 16,
    color: "#35352C",
  },
  chevron: {
    fontSize: 36,
    color: "#35352C",
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontFamily: "PretendardBold",
    fontSize: 16,
    color: "#35352C",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  budgetInfoCard: {
    height: 65,
    marginTop: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#A2AA89",
    borderRadius: 10,
    backgroundColor: "#F6F3EB",
    flexDirection: "row",
    alignItems: "center",
  },
  budgetInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  walletIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  divider: {
    width: 1,
    height: 36,
    marginHorizontal: 18,
    backgroundColor: "#9CAD8A",
  },
  budgetLabel: {
    fontFamily: "PretendardBold",
    fontSize: 11,
    color: "#6F8F57",
  },
  budgetValue: {
    marginTop: 4,
    fontFamily: "PretendardBold",
    fontSize: 17,
    color: "#35352C",
  },
  memoTitle: {
    marginTop: 26,
    marginBottom: 10,
    fontFamily: "PretendardSemiBold",
    fontSize: 14,
    color: "#35352C",
  },
  memoInput: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#A2AA89",
    borderRadius: 10,
    backgroundColor: "#FEFBF6",
    fontFamily: "PretendardRegular",
    fontSize: 12,
    fontWeight: "500",
    color: "#7E7A71",
  },
  saveButton: {
    height: 50,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#587E47",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledSaveButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
