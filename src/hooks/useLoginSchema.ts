import { z } from 'zod';

import { MIN_PASSWORD_CHARACTERS_NUMBER } from '@constants';

import { useTranslations } from './useTranslations';

export const useLoginSchema = (): z.Schema<{
  email: string;
  password: string;
}> => {
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
