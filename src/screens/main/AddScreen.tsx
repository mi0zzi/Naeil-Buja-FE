import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
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
    //icon: require("../../../assets/images/food.png"),
  },
  {
    code: "DELIVERY",
    label: "배달",
    //icon: require("../../../assets/images/delivery.png"),
  },
  {
    code: "CAFE",
    label: "카페",
    //icon: require("../../../assets/images/cafe.png"),
  },
  {
    code: "TRANSPORT",
    label: "교통",
    //icon: require("../../../assets/images/transport.png"),
  },
  {
    code: "SHOPPING",
    label: "쇼핑",
    //icon: require("../../../assets/images/shopping.png"),
  },
  {
    code: "CONVENIENCE",
    label: "편의점",
    //icon: require("../../../assets/images/convenience.png"),
  },
  {
    code: "MEETING",
    label: "약속",
    //icon: require("../../../assets/images/meeting.png"),
  },
  {
    code: "ETC",
    label: "기타",
    //icon: require("../../../assets/images/etc.png"),
  },
];

export default function AddScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");

  const formattedAmount = useMemo(() => {
    if (!amount) return "";

    return Number(amount).toLocaleString();
  }, [amount]);

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
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
      expenseDate: new Date().toISOString().split("T")[0],
    };

    console.log("지출 등록 데이터", expenseData);

    Alert.alert("저장 준비 완료", "백엔드 연결 후 실제 저장이 진행됩니다.");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8F5EF",
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <Image source={require("../../../assets/images/backBtn.png")} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 12,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/addExpense-title.png")}
        />

        <Image
          source={require("../../../assets/images/addExpense-subtitle.png")}
          style={{
            marginTop: 8,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 14,
        }}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.code;

          return (
            <TouchableOpacity
              key={category.code}
              activeOpacity={0.8}
              onPress={() => setSelectedCategory(category.code)}
              style={{
                width: "22%",
                aspectRatio: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? "#6E8C59" : "#E6E0D6",
              }}
            >
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: "#333",
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          marginTop: 40,
          alignItems: "center",
        }}
      >
        <TextInput
          value={formattedAmount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          placeholder="0"
          textAlign="center"
          style={{
            fontSize: 42,
            fontWeight: "700",
            color: "#222",
            minWidth: 200,
          }}
        />

        <Text
          style={{
            marginTop: 4,
            fontSize: 16,
            color: "#555",
          }}
        >
          원
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.8}
        style={{
          marginTop: "auto",
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <Image source={require("../../../assets/images/saveBtn.png")} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
