import { api } from "../api/client";
import {
    ExpenseCreateRequestDTO,
    ExpenseCreateResponseDTO,
    ExpenseDeleteResponseDTO,
    ExpenseUpdateRequestDTO,
    ExpenseUpdateResponseDTO,
} from "../types/add";

export const createExpense = async (
  data: ExpenseCreateRequestDTO,
): Promise<ExpenseCreateResponseDTO> => {
  const response = await api.post<ExpenseCreateResponseDTO>(
    "/api/expenses",
    data,
  );

  return response.data;
};

export const updateExpense = async (
  expenseId: number,
  data: ExpenseUpdateRequestDTO,
): Promise<ExpenseUpdateResponseDTO> => {
  const response = await api.patch<ExpenseUpdateResponseDTO>(
    `/api/expenses/${expenseId}`,
    data,
  );

  return response.data;
};

export const deleteExpense = async (
  expenseId: number,
): Promise<ExpenseDeleteResponseDTO> => {
  const response = await api.delete<ExpenseDeleteResponseDTO>(
    `/api/expenses/${expenseId}`,
  );

  return response.data;
};
