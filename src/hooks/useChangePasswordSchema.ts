import { z } from 'zod';
import { useTranslations } from './useTranslations';
import { MIN_PASSWORD_CHARACTERS_NUMBER } from '../utils/constants';

export const useChangePasswordSchema = () => {
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
