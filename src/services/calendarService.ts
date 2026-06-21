import { api } from "../api/client";
import {
    CalendarDayDetailResponseDTO,
    CalendarMonthResponseDTO,
} from "../types/calendar";

export async function getCalendarMonth(
  month: string,
): Promise<CalendarMonthResponseDTO> {
  const response = await api.get<CalendarMonthResponseDTO>("/api/calendar", {
    params: {
      month,
    },
  });

  return response.data;
}

export async function getCalendarDayDetail(
  date: string,
): Promise<CalendarDayDetailResponseDTO> {
  const response = await api.get<CalendarDayDetailResponseDTO>(
    `/api/calendar/days/${date}`,
  );

  return response.data;
}
