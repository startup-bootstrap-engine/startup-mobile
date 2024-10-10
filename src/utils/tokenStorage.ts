import { Preferences } from "@capacitor/preferences";
import { TokenResponse } from "../store/api/userApi/types/tokenTypes";

export const setToken = async (accessToken: string, refreshToken: string): Promise<void> => {
    await Preferences.set({ key: 'accessToken', value: accessToken });
    await Preferences.set({ key: 'refreshToken', value: refreshToken });
  };
  
  // Função para obter os tokens
  export const getToken = async (): Promise<TokenResponse | null> => {
    const accessToken = await Preferences.get({ key: 'accessToken' });
    const refreshToken = await Preferences.get({ key: 'refreshToken' });
  
    if (accessToken.value && refreshToken.value) {
      return {
        accessToken: accessToken.value,
        refreshToken: refreshToken.value,
      };
    }
    
    return null;
  };

  export const removeToken = async () => {
    await Preferences.remove({ key: 'authToken' });
    await Preferences.remove({ key: 'refreshToken' });
  };
  
