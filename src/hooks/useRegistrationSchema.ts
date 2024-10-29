import { z } from 'zod';
import { useTranslations } from './useTranslations';
import { MIN_PASSWORD_CHARACTERS_NUMBER } from '@constants';

export const useRegistrationSchema = () => {
  const { t } = useTranslations();

  const registrationSchema = z
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

  return registrationSchema;
};
