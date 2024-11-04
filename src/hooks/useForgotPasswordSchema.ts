import { z } from 'zod';

import { useTranslations } from './useTranslations';

export const useForgotPasswordSchema = (): z.Schema<{
  email: string;
}> => {
  const { t } = useTranslations();

  const schema = z.object({
    email: z
      .string()
      .min(1, t('validations.required'))
      .email(t('validations.email')),
  });

  return schema;
};
