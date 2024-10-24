import { Storage } from '@capacitor/storage';

export const capacitorStorage = {
  getItem: async (name: string) => {
    const { value } = await Storage.get({ key: name });
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await Storage.set({ key: name, value: JSON.stringify(value) });
  },
  removeItem: async (name: string) => {
    await Storage.remove({ key: name });
  },
};
