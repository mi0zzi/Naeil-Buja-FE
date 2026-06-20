import { api } from "../api/client";
import {
  MissionCompleteRequestDTO,
  MissionCompleteResponseDTO,
  MissionListResponseDTO,
} from "../types/mission";

export async function getMissionsByDate(date: string) {
  const response = await api.get<MissionListResponseDTO>("/api/missions", {
    params: {
      date,
    },
  });

  return response.data;
}

export async function completeMission(
  missionId: number,
  body: MissionCompleteRequestDTO,
) {
  const response = await api.patch<MissionCompleteResponseDTO>(
    `/api/missions/${missionId}/complete`,
    body,
  );

  return response.data;
}
