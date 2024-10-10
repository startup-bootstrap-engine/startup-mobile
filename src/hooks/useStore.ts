import React, { useCallback, useRef } from 'react';
import { useApiStore } from '../store/useApiStore';

interface StoreField<T> {
  value: T;
  setValue: (newValue: T) => void;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
}

// Hook para gerenciar campos de forma genérica dentro da store
export const useStore = <T extends Record<string, any>>(
  initialValue: T[keyof T], // Corrige para pegar o tipo correto do valor
  fieldName: keyof T, // Corrige para aceitar chaves de string
  rules: ((value: T[keyof T]) => string | null)[], // Regras aplicadas ao tipo correto
): StoreField<T[keyof T]> => {
  const data = useApiStore((state) => state.data); // Usa um seletor para acessar data
  const setData = useApiStore((state) => state.setData); // Usa um seletor para acessar setData

  const inputRef = useRef<HTMLInputElement>(null);

  // Função para validar o campo com base nas regras fornecidas
  const validateField = useCallback((): string | null => {
    const value = data?.[fieldName];
    for (const rule of rules) {
      const errorMessage = rule(value as T[keyof T]); // Garantindo que o valor seja do tipo correto
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
