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
