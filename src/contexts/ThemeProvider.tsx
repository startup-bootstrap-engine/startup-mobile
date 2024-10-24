import { Theme } from '@utils/types';
import React, { useEffect } from 'react';
import config from '@config/themeconfig.json';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const theme = config.theme as Theme;

const ThemeContext = React.createContext<Theme>(theme);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
