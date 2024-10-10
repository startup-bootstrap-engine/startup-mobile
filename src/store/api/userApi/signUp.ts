import { AuthState } from './types/authTypes';
import { setToken } from '../../../utils/tokenStorage';
import { TokenResponse } from './types/tokenTypes';
import { IUser } from './types/userTypes'; // Importando a interface do usuário

const apiURL = import.meta.env.VITE_API_URL;

export const signUp = async (
  email: string,
  password: string,
  passwordConfirmation: string,
  name: string,
  set: (state: Partial<AuthState>) => void,
): Promise<IUser> => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetch(`${apiURL}/auth/signup`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, passwordConfirmation, name }),
      referrerPolicy: 'strict-origin-when-cross-origin',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no registro');
    }

    // Tipar explicitamente o retorno da resposta como IUser
    const newUser: IUser = await response.json();

    // Supondo que o backend também retorna accessToken e refreshToken
    const { accessToken, refreshToken }: TokenResponse = {
      accessToken: newUser.refreshTokens[0]?.token,
      refreshToken: newUser.refreshTokens[0]?.token,
    };

    // Armazena o accessToken e o refreshToken
    await setToken(accessToken, refreshToken);

    // Atualiza o estado global com os dados do usuário
    set({
      token: accessToken,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    // Retorna o usuário criado
    return newUser;
  } catch (error) {
    set({
      isLoading: false,
      error: 'Erro no registro. Verifique suas informações.',
    });
    throw error; // Rejeita a Promise com o erro para tratamento posterior
  }
};
