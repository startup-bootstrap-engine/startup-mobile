import { getToken } from './tokenStorage';
import { isTokenValid } from './jwtUtils';
import { refreshToken } from '../store/api/userApi/refreshToken';
import type { IAuthState } from '../store/api/userApi/types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

interface IFetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export const fetchWithAuth = async (
  endpoint: string,
  options: IFetchOptions = {},
  set?: (_state: Partial<IAuthState>) => void,
): Promise<Response> => {
  const { requiresAuth = true, ...fetchOptions } = options;

  if (requiresAuth) {
    const tokens = await getToken();

    if (!tokens) {
      throw new Error('No authentication tokens found');
    }

    // Check if access token needs refresh
    if (!isTokenValid(tokens.accessToken) && set) {
      const newTokens = await refreshToken(tokens.refreshToken, set);
      if (!newTokens) {
        throw new Error('Failed to refresh authentication token');
      }
      tokens.accessToken = newTokens.accessToken;
    }

    // Add authorization header
    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  }

  const response = await fetch(`${apiURL}${endpoint}`, fetchOptions);

  // If we get 401 and have a refresh token, try to refresh and retry the request
  if (response.status === 401 && set) {
    const tokens = await getToken();
    if (tokens?.refreshToken) {
      const newTokens = await refreshToken(tokens.refreshToken, set);
      if (newTokens) {
        // Retry the original request with new token
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${newTokens.accessToken}`,
        };
        return fetch(`${apiURL}${endpoint}`, fetchOptions);
      }
    }
  }

  return response;
};
