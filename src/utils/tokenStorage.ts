import { Storage } from '@capacitor/storage';

export const setToken = async (token: string) => {
  await Storage.set({
    key: 'authToken',
    value: token,
  });
};

export const getToken = async () => {
  const { value } = await Storage.get({ key: 'authToken' });
  return value;
};

export const removeToken = async () => {
  await Storage.remove({ key: 'authToken' });
};
