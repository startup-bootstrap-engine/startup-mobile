import { z } from 'zod';
import { useTranslations } from './useTranslations';

export const useForgotPasswordForm = () => {
  const { t } = useTranslations();

  const forgotPasswordSchema = z.object({
    email: z.string().email(t('validations.email')),
  });

  return forgotPasswordSchema;
};
