import { useTranslation as useI18NextTranslation } from 'react-i18next';

import type enTranslations from '@locales/en.json';

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey & string}.${RecursiveKeyOf<TObj[TKey]>}`
    : TKey & string;
}[keyof TObj & (string | number)];

export type TranslationKeys = RecursiveKeyOf<typeof enTranslations>;

export type TFunction = (
  _key: TranslationKeys,
  _params?: { [key: string]: string | number },
) => string;

export const useTranslations = (): {
  t: TFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  i18n: any;
} => {
  const { t: originalT, i18n } = useI18NextTranslation();

  const t: TFunction = (
    key: TranslationKeys,
    params?: { [key: string]: string | number },
  ) => {
    return originalT(key, params);
  };

  return { t, i18n };
};
