import { z } from 'zod';
import { useTranslations } from './useTranslations';

export const useForgotPasswordSchema = () => {
  const { t } = useTranslations();

  const forgotPasswordSchema = z.object({
    email: z.string().email(t('validations.email')),
  });

  return forgotPasswordSchema;
};
