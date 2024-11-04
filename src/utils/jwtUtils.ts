import { jwtDecode } from 'jwt-decode';

interface IDecodedToken {
  exp: number;
  // Adicione outras propriedades conforme necessário
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: IDecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // em segundos
    return decoded.exp > currentTime;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Token decoding error:', error.message);
    } else {
      console.error('Unknown error while decoding the token.');
    }
    return false;
  }
};
