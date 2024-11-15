import { z } from 'zod';

import { MIN_PASSWORD_CHARACTERS_NUMBER } from '@constants';
import { type TranslationFn } from '@hooks/useTranslatedSchema';

export const loginSchema = (
  t: TranslationFn,
): z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
}> =>
  z.object({
    email: z.string().email(t('validations.email')),
    password: z
      .string()
      .min(
        MIN_PASSWORD_CHARACTERS_NUMBER,
        t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
      ),
  });

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;

export const changePasswordSchema = (
  t: TranslationFn,
): z.Schema<{
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}> =>
  z
    .object({
      currentPassword: z
        .string()
        .min(
          MIN_PASSWORD_CHARACTERS_NUMBER,
          t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
        ),
      newPassword: z
        .string()
        .min(
          MIN_PASSWORD_CHARACTERS_NUMBER,
          t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
        ),
      newPasswordConfirmation: z
        .string()
        .min(
          MIN_PASSWORD_CHARACTERS_NUMBER,
          t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
        ),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: t('validations.passwordNotMatch'),
      path: ['newPasswordConfirmation'],
    });

export type ChangePasswordSchema = z.infer<
  ReturnType<typeof changePasswordSchema>
>;

export const forgotPasswordSchema = (
  t: TranslationFn,
): z.Schema<{
  email: string;
}> =>
  z.object({
    email: z
      .string()
      .min(1, t('validations.required'))
      .email(t('validations.email')),
  });

export type ForgotPasswordSchema = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;

export const registrationSchema = (
  t: TranslationFn,
): z.Schema<{
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}> =>
  z
    .object({
      name: z.string().min(1, t('validations.required')),
      email: z.string().email(t('validations.email')),
      password: z
        .string()
        .min(
          MIN_PASSWORD_CHARACTERS_NUMBER,
          t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
        ),
      passwordConfirmation: z
        .string()
        .min(
          MIN_PASSWORD_CHARACTERS_NUMBER,
          t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
        ),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('validations.passwordNotMatch'),
      path: ['passwordConfirmation'],
    });

export type RegistrationSchema = z.infer<ReturnType<typeof registrationSchema>>;
