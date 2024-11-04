import { z } from 'zod';

import { MIN_PASSWORD_CHARACTERS_NUMBER } from '@constants';

import { useTranslations } from './useTranslations';

export const useChangePasswordSchema = (): z.Schema<{
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}> => {
  const { t } = useTranslations();

  const changePasswordSchema = z
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

  return changePasswordSchema;
};
