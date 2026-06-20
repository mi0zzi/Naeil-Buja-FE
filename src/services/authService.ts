import { api } from "../api/client";
import {
    CheckLoginIdResponseDTO,
    JwtTokenResponseDTO,
    LoginRequestDTO,
    SignupRequestDTO,
    SignupResponseDTO,
} from "../types/auth";

export async function signup(
  body: SignupRequestDTO,
): Promise<SignupResponseDTO> {
  const response = await api.post<SignupResponseDTO>("/api/auth/signup", body);

  return response.data;
}

export async function login(
  body: LoginRequestDTO,
): Promise<JwtTokenResponseDTO> {
  const response = await api.post<JwtTokenResponseDTO>("/api/auth/login", body);

  return response.data;
}

export async function checkLoginId(
  loginId: string,
): Promise<CheckLoginIdResponseDTO> {
  const response = await api.get<CheckLoginIdResponseDTO>(
    `/api/auth/check-login-id?loginId=${loginId}`,
  );

  return response.data;
}
