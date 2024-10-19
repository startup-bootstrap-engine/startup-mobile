import { z } from 'zod';
import { useTranslations } from './useTranslations';
import { MIN_PASSWORD_CHARACTERS_NUMBER } from '../utils/constants';

export const useLoginSchema = () => {
  const { t } = useTranslations();

  const loginSchema = z.object({
    email: z.string().email(t('validations.email')),
    password: z
      .string()
      .min(
        MIN_PASSWORD_CHARACTERS_NUMBER,
        t('validations.password', { number: MIN_PASSWORD_CHARACTERS_NUMBER }),
      ),
  });

  return loginSchema;
};
