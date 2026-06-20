import { onboardingMockResponse } from "../mock/onboardingMock";
import {
    OnboardingRequestDTO,
    OnboardingResponseDTO,
} from "../types/onboarding";

export async function saveOnboarding(
  data: OnboardingRequestDTO,
): Promise<OnboardingResponseDTO> {
  console.log("ONBOARDING MOCK REQUEST:", data);

  return onboardingMockResponse;
}
