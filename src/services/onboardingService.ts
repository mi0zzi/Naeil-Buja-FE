import { api } from "../api/client";
import {
    OnboardingRequestDTO,
    OnboardingResponseDTO,
} from "../types/onboarding";

export async function saveOnboarding(
  body: OnboardingRequestDTO,
): Promise<OnboardingResponseDTO> {
  const response = await api.post<OnboardingResponseDTO>(
    "/api/onboarding",
    body,
  );

  return response.data;
}
