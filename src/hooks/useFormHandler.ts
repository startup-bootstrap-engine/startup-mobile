import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import type {
  DefaultValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import type { ZodType } from 'zod';
import { useToastStore } from './useToastStore';
import { useTranslatedSchema } from './useTranslatedSchema';
import { useTranslations } from './useTranslations';

interface IUseFormHandlerConfig<T> {
  schema: ZodType;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void>;
  onError?: (error: unknown) => void;
  redirectTo?: string;
  loadingState?: {
    isLoading: boolean;
    error: string | null;
  };
}

export interface IFormField<T> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  placeholder?: string;
  clearInput?: boolean;
}

export function useFormHandler<T extends Record<string, any>>(
  config: IUseFormHandlerConfig<T>,
): Omit<UseFormReturn<T>, 'handleSubmit'> & {
  setFieldValue: (name: Path<T>, value: any) => void;
  isLoading?: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
} {
  const history = useHistory();
  const { t } = useTranslations();
  const { showToast } = useToastStore();
  const translatedSchema = useTranslatedSchema(() => config.schema);

  const methods = useForm<T>({
    resolver: zodResolver(translatedSchema),
    defaultValues: config.defaultValues,
  });

  const submitHandler: SubmitHandler<T> = async (data) => {
    try {
      await config.onSubmit(data);
      if (config.redirectTo) {
        history.push(config.redirectTo);
      }
    } catch (err) {
      if (config.onError) {
        config.onError(err);
      } else {
        showToast({
          message: t('common.error'),
          type: 'error',
        });
      }
    }
  };

  const setFieldValue = (name: Path<T>, value: any): void => {
    methods.setValue(name, value, { shouldValidate: true });
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await methods.handleSubmit(submitHandler)(e);
  };

  return {
    ...methods,
    setFieldValue,
    onSubmit,
    isLoading: config.loadingState?.isLoading,
    error: config.loadingState?.error ?? null,
  };
}
