import { apiClient } from '@/utils/index';
import type { LoginInput, VerifyOtpInput } from '@/schemas';

type LoginResponse = { token: string; user: { id: string; phone: string } };

export async function requestOtp(input: LoginInput): Promise<{ sent: boolean }> {
  const { data } = await apiClient.post<{ sent: boolean }>('/auth/request-otp', input);
  return data;
}

export async function verifyOtp(input: VerifyOtpInput): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/verify-otp', input);
  return data;
}
