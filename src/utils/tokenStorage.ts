import { Preferences } from "@capacitor/preferences";

export const setToken = async (token: string) => {
  await Preferences.set({
    key: 'authToken',
    value: token,
  });
};

export const getToken = async () => {
  const { value } = await Preferences.get({ key: 'authToken' });
  return value;
};

export const removeToken = async () => {
  await Preferences.remove({ key: 'authToken' });
};
