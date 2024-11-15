import type { z } from 'zod';

import { useTranslations } from './useTranslations';

export type TranslationFn = ReturnType<typeof useTranslations>['t'];

export const useTranslatedSchema = <T extends z.ZodType>(
  schemaFn: (t: TranslationFn) => T,
): T => {
  const { t } = useTranslations();
  return schemaFn(t);
};
