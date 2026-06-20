export interface ExpenseCreateRequestDTO {
  amount: number;
  categoryCode: string;
  memo?: string;
  expenseDate: string;
}

export interface ExpenseCreateResponseDTO {
  expenseId: number;
  amount: number;
  categoryCode: string;
  categoryName: string;
  expenseDate: string;
  monthlyExpenseAmount: number;
  remainingBudget: number;
  todayAvailableAmount: number;
  updatedMissionIds: number[];
}

export interface ExpenseUpdateRequestDTO {
  amount: number;
  categoryCode: string;
  memo?: string;
  expenseDate: string;
}

export interface ExpenseUpdateResponseDTO {
  updated: boolean;
}

export type ExpenseDeleteResponseDTO = string;

export interface ApiErrorResponseDTO {
  timestamp: string;
  statusCode: number;
  error: string;
  message: string;
  details: string;
  errorCode: string;
}
