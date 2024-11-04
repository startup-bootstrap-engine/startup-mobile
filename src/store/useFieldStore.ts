import { create } from 'zustand';

interface IFieldState {
  fields: Record<string, string>;
  setFieldValue: (_field: string, _value: string) => void;
  getFieldValue: (_field: string) => string;
}

export const useFieldStore = create<IFieldState>((set, get) => ({
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
