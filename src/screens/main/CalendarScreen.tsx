import { useEffect, useState } from "react";
import {
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

  const dayMap = new Map(monthData.days.map((day) => [day.date, day]));

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => moveMonth(-1)}>
            <Text style={styles.arrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.monthTitle}>
            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
          </Text>

          <TouchableOpacity onPress={() => moveMonth(1)}>
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

                  {dayData?.hasExpense && <View style={styles.expenseDot} />}
                  {dayData?.hasCompletedMission && (
                    <View style={styles.missionDot} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <View style={styles.detailTitleRow}>
              <Text style={styles.detailDate}>6월 {selectedDay}일</Text>

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
                <View>
                  <Text style={styles.expenseCategory}>
                    {expense.categoryName}
                  </Text>
                  <Text style={styles.expenseMemo}>{expense.memo}</Text>
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
              <Text style={styles.reportButtonText}>생활 리포트 ›</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>총 지출</Text>
              <Text style={styles.summaryGreen}>
                {formatWon(monthData.summary.monthlyExpenseAmount)}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>절약한 금액</Text>
              <Text style={styles.summaryGreen}>
                {formatWon(monthData.summary.remainingBudget)}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>예산 대비</Text>
              <Text style={styles.summaryOrange}>
                {Math.round(
                  (monthData.summary.monthlyExpenseAmount /
                    monthData.summary.monthlyBudget) *
                    100,
                )}
                %
              </Text>
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  arrow: {
    fontFamily: "PretendardBold",
    fontSize: 22,
    color: "#9C9C9C",
  },
  monthTitle: {
    marginHorizontal: 8,
    fontFamily: "PretendardBold",
    fontSize: 15,
    color: "#333333",
  },
  calendarCard: {
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontFamily: "PretendardBold",
    fontSize: 9,
    color: "#777777",
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: `${100 / 7}%`,
    height: 42,
    alignItems: "center",
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateCircle: {
    backgroundColor: "#8CAA7B",
  },
  dateText: {
    fontFamily: "PretendardBold",
    fontSize: 12,
    color: "#222222",
  },
  selectedDateText: {
    color: "#FFFFFF",
  },
  disabledDateText: {
    color: "#D3D3D3",
  },
  sundayText: {
    color: "#EF4444",
  },
  expenseDot: {
    width: 4,
    height: 4,
    marginTop: 2,
    borderRadius: 2,
    backgroundColor: "#5F8D4E",
  },
  missionDot: {
    width: 4,
    height: 4,
    marginTop: 2,
    borderRadius: 2,
    backgroundColor: "#E9A23B",
  },
  detailCard: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  detailHeader: {
    height: 38,
    paddingHorizontal: 12,
    backgroundColor: "#EFF4EA",
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
    fontSize: 12,
    color: "#333333",
  },
  budgetBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#DDEBD3",
  },
  budgetBadgeText: {
    fontFamily: "PretendardBold",
    fontSize: 8,
    color: "#6D965D",
  },
  detailTotal: {
    fontFamily: "PretendardBold",
    fontSize: 10,
    color: "#537842",
  },
  expenseRow: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0EAE0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseCategory: {
    fontFamily: "PretendardBold",
    fontSize: 12,
    color: "#333333",
  },
  expenseMemo: {
    marginTop: 3,
    fontFamily: "PretendardRegular",
    fontSize: 10,
    color: "#9C9C9C",
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
    padding: 14,
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
    fontSize: 13,
    color: "#333333",
  },
  reportButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#EFF4EA",
  },
  reportButtonText: {
    fontFamily: "PretendardBold",
    fontSize: 9,
    color: "#7D9F6E",
  },
  summaryRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    gap: 3,
  },
  summaryLabel: {
    fontFamily: "PretendardBold",
    fontSize: 9,
    color: "#777777",
  },
  summaryGreen: {
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#57934D",
  },
  summaryOrange: {
    fontFamily: "PretendardBold",
    fontSize: 14,
    color: "#C9892B",
  },
});
