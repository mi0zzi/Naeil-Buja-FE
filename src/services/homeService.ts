import { api } from "../api/client";
import { HomeResponseDTO } from "../types/home";

export async function getHomeData(): Promise<HomeResponseDTO> {
  const response = await api.get<HomeResponseDTO>("/api/home");

  return response.data;
}
