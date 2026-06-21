import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  getCalendarDayDetail,
  getCalendarMonth,
} from "../../services/calendarService";
import {
  CalendarDayDetailResponseDTO,
  CalendarMonthResponseDTO,
} from "../../types/calendar";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const categoryIcons: Record<string, any> = {
  식비: require("../../../assets/images/categories/food.png"),
  배달: require("../../../assets/images/categories/delivery.png"),
  카페: require("../../../assets/images/categories/cafe.png"),
  교통: require("../../../assets/images/categories/transport.png"),
  쇼핑: require("../../../assets/images/categories/shopping.png"),
  편의점: require("../../../assets/images/categories/convenience.png"),
  약속: require("../../../assets/images/categories/meeting.png"),
  기타: require("../../../assets/images/categories/etc.png"),
};

const summaryIcons = {
  totalExpense: require("../../../assets/images/totalExpenseIcon.png"),
  budgetRatio: require("../../../assets/images/calendarIcon.png"),
};

const formatWon = (value: number) => `${value.toLocaleString()}원`;

const formatMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");

  return `${year}-${month}`;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCalendarDates = (currentMonth: Date) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const dates: Date[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push(new Date(year, month - 1, prevLastDate - i));
  }

  for (let day = 1; day <= lastDate; day++) {
    dates.push(new Date(year, month, day));
  }

  while (dates.length < 42) {
    const nextDay = dates.length - firstDay - lastDate + 1;
    dates.push(new Date(year, month + 1, nextDay));
  }

  return dates;
};

export default function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState("2026-06-18");

  const [monthData, setMonthData] = useState<CalendarMonthResponseDTO | null>(
    null,
  );
  const [dayDetail, setDayDetail] =
    useState<CalendarDayDetailResponseDTO | null>(null);

  useEffect(() => {
    loadCalendarMonth();
  }, [currentMonth]);

  useEffect(() => {
    loadCalendarDayDetail();
  }, [selectedDate]);

  const loadCalendarMonth = async () => {
    const data = await getCalendarMonth(formatMonth(currentMonth));
    setMonthData(data);
  };

  const loadCalendarDayDetail = async () => {
    const data = await getCalendarDayDetail(selectedDate);
    setDayDetail(data);
  };

  const moveMonth = (value: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + value, 1),
    );
  };

  if (!monthData || !dayDetail) {
    return <View style={styles.screen} />;
  }

  const calendarDates = getCalendarDates(currentMonth);
  const selectedMonth = currentMonth.getMonth();
  const selectedDay = Number(selectedDate.slice(8, 10));
  const selectedDayName = WEEK_DAYS[new Date(selectedDate).getDay()];
  const dayMap = new Map(monthData.days.map((day) => [day.date, day]));

  const budgetRatio = Math.round(
    (monthData.summary.monthlyExpenseAmount / monthData.summary.monthlyBudget) *
      100,
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => moveMonth(-1)} activeOpacity={0.7}>
            <Text style={styles.arrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.monthTitle}>
            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
          </Text>

          <TouchableOpacity onPress={() => moveMonth(1)} activeOpacity={0.7}>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.weekRow}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={styles.weekText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.dateGrid}>
            {calendarDates.map((date) => {
              const dateKey = formatDate(date);
              const dayData = dayMap.get(dateKey);

              const isCurrentMonth = date.getMonth() === selectedMonth;
              const isSelected = selectedDate === dateKey;
              const isSunday = date.getDay() === 0;

              return (
                <TouchableOpacity
                  key={dateKey}
                  style={styles.dateCell}
                  activeOpacity={0.75}
                  onPress={() => setSelectedDate(dateKey)}
                >
                  <View
                    style={[
                      styles.dateCircle,
                      isSelected && styles.selectedDateCircle,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        !isCurrentMonth && styles.disabledDateText,
                        isSunday && isCurrentMonth && styles.sundayText,
                        isSelected && styles.selectedDateText,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </View>

                  <View style={styles.dotArea}>
                    {dayData?.hasExpense && <View style={styles.expenseDot} />}
                    {dayData?.hasCompletedMission}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <View style={styles.detailTitleRow}>
              <Text style={styles.detailDate}>
                6월 {selectedDay}일 ({selectedDayName})
              </Text>

              <View style={styles.budgetBadge}>
                <Text style={styles.budgetBadgeText}>
                  예산 {formatWon(monthData.summary.todayAvailableAmount)}
                </Text>
              </View>
            </View>

            <Text style={styles.detailTotal}>
              지출 {formatWon(dayDetail.totalExpenseAmount)}
            </Text>
          </View>

          {dayDetail.expenses.length === 0 ? (
            <Text style={styles.emptyText}>소비 기록이 없어요</Text>
          ) : (
            dayDetail.expenses.map((expense) => (
              <View key={expense.expenseId} style={styles.expenseRow}>
                <View style={styles.expenseLeft}>
                  <Image
                    source={
                      categoryIcons[expense.categoryName] ??
                      categoryIcons["기타"]
                    }
                    style={styles.expenseIcon}
                    resizeMode="contain"
                  />

                  <View>
                    <Text style={styles.expenseCategory}>
                      {expense.categoryName}
                    </Text>

                    {!!expense.memo && (
                      <Text style={styles.expenseMemo}>{expense.memo}</Text>
                    )}
                  </View>
                </View>

                <Text style={styles.expenseAmount}>
                  {formatWon(expense.amount)}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>6월 한눈에 보기</Text>

            <View style={styles.reportButton}>
              <Text style={styles.reportButtonText}>월간 리포트 ›</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <Image
              source={summaryIcons.totalExpense}
              style={styles.summaryIcon}
              resizeMode="contain"
            />

            <View style={styles.summaryMainGroup}>
              <View style={styles.summaryTextItem}>
                <Text style={styles.summaryLabel}>총 지출</Text>
                <Text style={styles.summaryGreen}>
                  {formatWon(monthData.summary.monthlyExpenseAmount)}
                </Text>
              </View>

              <View style={styles.summaryTextItem}>
                <Text style={styles.summaryLabel}>절약한 금액</Text>
                <Text style={styles.summaryGreen}>
                  {formatWon(monthData.summary.remainingBudget)}
                </Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.budgetRatioItem}>
              <Image
                source={summaryIcons.budgetRatio}
                style={styles.summaryIcon}
                resizeMode="contain"
              />

              <View style={styles.budgetRatioTextArea}>
                <Text style={styles.summaryLabel}>예산 대비</Text>
                <Text style={styles.summaryOrange}>{budgetRatio}%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFDF7",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 18,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  arrow: {
    fontFamily: "PretendardBold",
    fontSize: 24,
    lineHeight: 26,
    color: "#9C9C9C",
  },
  monthTitle: {
    marginHorizontal: 8,
    fontFamily: "PretendardBold",
    fontSize: 16,
    color: "#333333",
  },
  calendarCard: {
    paddingHorizontal: 11,
    paddingTop: 14,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    borderRadius: 10,
    backgroundColor: "#FDFBFB",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontFamily: "PretendardBold",
    fontSize: 10,
    color: "#555555",
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: `${100 / 7}%`,
    height: 50,
    alignItems: "center",
  },
  dateCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateCircle: {
    backgroundColor: "#789669",
  },
  dateText: {
    fontFamily: "PretendardBold",
    fontSize: 13,
    color: "#222222",
  },
  selectedDateText: {
    color: "#FFFFFF",
  },
  disabledDateText: {
    color: "#D3D3D3",
  },
  sundayText: {
    color: "#FF3B30",
  },
  dotArea: {
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  expenseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#587E47",
  },
  detailCard: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  detailHeader: {
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: "#F2F4ED",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailDate: {
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#333333",
  },
  budgetBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#B7C7AF",
    backgroundColor: "#E6EBDE",
  },
  budgetBadgeText: {
    fontFamily: "PretendardBold",
    fontSize: 8,
    color: "#4E6C3D",
  },
  detailTotal: {
    fontFamily: "PretendardBold",
    fontSize: 11,
    color: "#4E6C3D",
  },
  expenseRow: {
    height: 47,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: "#F0EAE0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  expenseIcon: {
    width: 19,
    height: 19,
    marginRight: 13,
  },
  expenseCategory: {
    fontFamily: "PretendardBold",
    fontSize: 13,
    color: "#333333",
  },
  expenseMemo: {
    marginTop: 1,
    fontFamily: "PretendardRegular",
    fontSize: 10,
    color: "#B5B5B5",
  },
  expenseAmount: {
    fontFamily: "PretendardBold",
    fontSize: 12,
    color: "#111111",
  },
  emptyText: {
    paddingVertical: 28,
    textAlign: "center",
    fontFamily: "PretendardRegular",
    fontSize: 12,
    color: "#999999",
  },
  summaryCard: {
    marginTop: 14,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryTitle: {
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#34352C",
  },
  reportButton: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#B7C7AF",
    backgroundColor: "#E6EBDE",
  },
  reportButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 9,
    color: "#4E6C3D",
  },
  summaryRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  summaryIcon: {
    width: 46,
    height: 46,
  },
  summaryMainGroup: {
    flex: 1,
    marginLeft: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryTextItem: {
    width: 72,
  },
  summaryDivider: {
    width: 1,
    height: 42,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "#E8E1D6",
  },
  budgetRatioItem: {
    width: 94,
    flexDirection: "row",
    alignItems: "center",
  },
  budgetRatioTextArea: {
    marginLeft: 7,
  },
  summaryLabel: {
    fontFamily: "PretendardBold",
    fontSize: 10,
    color: "#4D4E46",
  },
  summaryGreen: {
    marginTop: 3,
    fontFamily: "PretendardBold",
    fontSize: 12,
    color: "#587E47",
  },
  summaryOrange: {
    marginTop: 3,
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#AA7B30",
  },
});
