import { z } from 'zod';
import { useTranslations } from './useTranslations';

export const useForgotPasswordForm = () => {
  const { t } = useTranslations();

  const schema = z.object({
    email: z
      .string()
      .min(1, t('validations.required'))
      .email(t('validations.email')),
  });

  return schema;
};
