export interface OnboardingRequestDTO {
  nickname: string;
  characterName: string;
  monthlyBudget: number;
  monthlySavingGoal: number;
  fixedExpense?: number;
}

export interface OnboardingResponseDTO {
  onboardingCompleted: boolean;
}

export interface ApiErrorResponseDTO {
  timestamp: string;
  statusCode: number;
  error: string;
  message: string;
  details: string;
  errorCode: string;
}
