export interface SignupRequestDTO {
  loginId: string;
  password: string;
  passwordConfirm: string;
}

export interface SignupResponseDTO {
  userId: number;
  loginId: string;
  onboardingCompleted: boolean;
}

export interface LoginRequestDTO {
  loginId: string;
  password: string;
}

export interface JwtTokenResponseDTO {
  accessToken: string;
  userId: number;
  nickname: string;
  onboardingCompleted: boolean;
}

export interface CheckLoginIdResponseDTO {
  available: boolean;
}

export interface ApiErrorResponseDTO {
  timestamp: string;
  statusCode: number;
  error: string;
  message: string;
  details: string;
  errorCode: string;
}
