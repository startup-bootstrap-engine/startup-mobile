const apiURL = import.meta.env.VITE_API_URL;

export const getGoogleOAuthUrl = async (): Promise<string> => {
  const response = await fetch(`${apiURL}/auth/google/url`, {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data.googleOAuthUrl;
};
