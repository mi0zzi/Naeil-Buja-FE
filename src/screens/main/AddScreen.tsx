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

const categories = [
  {
    code: "FOOD",
    label: "식비",
    icon: require("../../../assets/images/categories/food.png"),
  },
  {
    code: "DELIVERY",
    label: "배달",
    icon: require("../../../assets/images/categories/delivery.png"),
  },
  {
    code: "CAFE",
    label: "카페",
    icon: require("../../../assets/images/categories/cafe.png"),
  },
  {
    code: "TRANSPORT",
    label: "교통",
    icon: require("../../../assets/images/categories/transport.png"),
  },
  {
    code: "SHOPPING",
    label: "쇼핑",
    icon: require("../../../assets/images/categories/shopping.png"),
  },
  {
    code: "CONVENIENCE",
    label: "편의점",
    icon: require("../../../assets/images/categories/convenience.png"),
  },
  {
    code: "MEETING",
    label: "약속",
    icon: require("../../../assets/images/categories/meeting.png"),
  },
  {
    code: "ETC",
    label: "기타",
    icon: require("../../../assets/images/categories/etc.png"),
  },
];

const TODAY_AVAILABLE_AMOUNT = 25000;

export default function AddScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const formattedAmount = useMemo(() => {
    if (!amount) return "0";
    return Number(amount).toLocaleString();
  }, [amount]);

  const remainingAfterExpense = useMemo(() => {
    return TODAY_AVAILABLE_AMOUNT - Number(amount || 0);
  }, [amount]);

  const handleAmountChange = (value: string) => {
    setAmount(value.replace(/[^0-9]/g, ""));
  };

  const handleSave = () => {
    if (!selectedCategory) {
      Alert.alert("알림", "카테고리를 선택해주세요.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Alert.alert("알림", "금액을 입력해주세요.");
      return;
    }

    const expenseData = {
      amount: Number(amount),
      categoryCode: selectedCategory,
      memo,
      expenseDate: new Date().toISOString().split("T")[0],
    };

    console.log("지출 등록 데이터", expenseData);
    Alert.alert("저장 준비 완료", "백엔드 연결 후 실제 저장이 진행됩니다.");
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

          <TouchableOpacity activeOpacity={0.85} style={styles.dateCard}>
            <Image
              source={require("../../../assets/images/addCalender.png")}
              style={styles.dateIcon}
              resizeMode="contain"
            />

            <View style={styles.dateTextArea}>
              <Text style={styles.dateLabel}>날짜</Text>
              <Text style={styles.dateValue}>2026.06.20 (토)</Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>카테고리</Text>

          <View style={styles.categoryGrid}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.code;

              return (
                <TouchableOpacity
                  key={category.code}
                  activeOpacity={0.85}
                  onPress={() => setSelectedCategory(category.code)}
                  style={[
                    styles.categoryItem,
                    isSelected && styles.selectedCategoryItem,
                  ]}
                >
                  <Image
                    source={category.icon}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />

                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.selectedCategoryLabel,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>금액</Text>

            <View style={styles.amountInputRow}>
              <Text style={styles.wonSymbol}>₩</Text>

              <TextInput
                value={formattedAmount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#A7AAA4"
                style={styles.amountInput}
              />

              <Text style={styles.amountUnit}>원</Text>
            </View>
          </View>

          <View style={styles.budgetInfoCard}>
            <View style={styles.budgetInfoItem}>
              <Image
                source={require("../../../assets/images/wallet.png")}
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
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>저장하기</Text>
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
    height: 68,
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#9CAD8A",
    borderRadius: 10,
    backgroundColor: "#FFFDF7",
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    width: 34,
    height: 34,
    marginRight: 14,
  },
  dateTextArea: {
    flex: 1,
  },
  dateLabel: {
    fontFamily: "PretendardBold",
    fontSize: 12,
    color: "#6F8F57",
  },
  dateValue: {
    marginTop: 5,
    fontFamily: "PretendardBold",
    fontSize: 21,
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
  categoryItem: {
    width: "22%",
    height: 88,
    borderWidth: 1,
    borderColor: "#EFECE6",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCategoryItem: {
    borderColor: "#6F8F57",
    backgroundColor: "#F2F7EB",
  },
  categoryIcon: {
    width: 36,
    height: 36,
  },
  categoryLabel: {
    marginTop: 8,
    fontFamily: "PretendardMedium",
    fontSize: 12,
    color: "#35352C",
  },
  selectedCategoryLabel: {
    fontFamily: "PretendardBold",
    color: "#557A45",
  },
  amountCard: {
    height: 146,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: "#9CAD8A",
    borderRadius: 10,
    backgroundColor: "#FFFDF7",
  },
  amountLabel: {
    fontFamily: "PretendardBold",
    fontSize: 16,
    color: "#6F8F57",
  },
  amountInputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  wonSymbol: {
    marginRight: 12,
    fontFamily: "PretendardBold",
    fontSize: 40,
    color: "#35352C",
  },
  amountInput: {
    flex: 1,
    fontFamily: "PretendardRegular",
    fontSize: 40,
    color: "#35352C",
    padding: 0,
  },
  amountUnit: {
    fontFamily: "PretendardBold",
    fontSize: 18,
    color: "#557A45",
  },
  budgetInfoCard: {
    height: 78,
    marginTop: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#9CAD8A",
    borderRadius: 10,
    backgroundColor: "#FFFDF7",
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
    height: 48,
    marginHorizontal: 18,
    backgroundColor: "#9CAD8A",
  },
  budgetLabel: {
    fontFamily: "PretendardBold",
    fontSize: 12,
    color: "#6F8F57",
  },
  budgetValue: {
    marginTop: 5,
    fontFamily: "PretendardBold",
    fontSize: 20,
    color: "#35352C",
  },
  memoTitle: {
    marginTop: 26,
    marginBottom: 10,
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#35352C",
  },
  memoInput: {
    height: 60,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#9CAD8A",
    borderRadius: 10,
    backgroundColor: "#FFFDF7",
    fontFamily: "PretendardRegular",
    fontSize: 13,
    color: "#35352C",
  },
  saveButton: {
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#5B874A",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 20,
    color: "#FFFFFF",
  },
});
