import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  // Adicione outras propriedades conforme necessário
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // em segundos
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};
