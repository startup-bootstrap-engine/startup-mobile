import { create } from 'zustand';

interface FieldState {
  fields: Record<string, string>;
  setFieldValue: (field: string, value: string) => void;
  getFieldValue: (field: string) => string;
}

export const useFieldStore = create<FieldState>((set, get) => ({
  fields: {},

  setFieldValue: (field, value) => {
    set((state) => ({
      fields: { ...state.fields, [field]: value },
    }));
  },

  getFieldValue: (field) => {
    return get().fields[field] || '';
  },
}));
