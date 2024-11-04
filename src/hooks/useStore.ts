import { useApiStore } from '@store/useApiStore';
import React, { useCallback, useRef } from 'react';

interface IStoreField<T> {
  value: T;
  setValue: (_newValue: T) => void;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const useStore = <T extends Record<string, any>>(
  initialValue: T[keyof T],
  fieldName: keyof T,
  rules: ((_value: T[keyof T]) => string | null)[],
): IStoreField<T[keyof T]> => {
  const data = useApiStore((state) => state.data);
  const setData = useApiStore((state) => state.setData);

  const inputRef = useRef<HTMLInputElement>(null);

  const validateField = useCallback((): string | null => {
    const value = data?.[fieldName];
    for (const rule of rules) {
      const errorMessage = rule(value as T[keyof T]);
      if (errorMessage) return errorMessage;
    }
    return null;
  }, [data, fieldName, rules]);

  const setValue = useCallback(
    (newValue: T[keyof T]) => {
      setData((prevData: any) => ({
        ...prevData,
        [fieldName]: newValue,
      }));
    },
    [setData, fieldName],
  );

  const error = validateField();

  return {
    value: data?.[fieldName] || initialValue,
    setValue,
    error,
    inputRef,
  };
};
