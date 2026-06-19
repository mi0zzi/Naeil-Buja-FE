import {
  todayMissionMock,
  dailyMissionMock,
} from "../mock/missions";

export async function getTodayMissions() {
  return todayMissionMock;
}

export async function getDailyMissions() {
  return dailyMissionMock;
}