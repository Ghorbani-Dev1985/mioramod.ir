import { z } from 'zod';

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست');

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{5}$/, 'کد تایید باید ۵ رقم باشد');

export const loginSchema = z.object({
  phone: phoneSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: otpSchema,
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
