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
