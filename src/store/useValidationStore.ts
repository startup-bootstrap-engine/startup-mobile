// src/store/useValidationStore.ts

import { create } from 'zustand';

interface ValidationState {
  errors: Record<string, string | null>;
  validateField: (field: string, value: string, rules: Array<(value: string) => boolean | string>) => string;
  setError: (field: string, error: string | null) => void;
  getError: (field: string) => string | null;
}

export const useValidationStore = create<ValidationState>((set, get) => ({
  errors: {},

  validateField: (field, value, rules) => {
    for (const rule of rules) {
      const validationResult = rule(value);
      if (typeof validationResult === 'string') {
        return validationResult; // Retorna a mensagem de erro se a validação falhar
      }
    }
    return ''; // Sem erros
  },

  setError: (field, error) => {
    set((state) => ({
      errors: { ...state.errors, [field]: error },
    }));
  },

  getError: (field) => {
    return get().errors[field] || '';
  },
}));
