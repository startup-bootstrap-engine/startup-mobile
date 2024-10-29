import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@hooks';
import { Mode, Theme } from '@utils/types';
import { DEFAULT_THEME } from '@constants';

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  // eslint-disable-next-line no-unused-vars
  changeTheme: (newTheme: Theme) => void;
  toggleMode: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    'theme',
    DEFAULT_THEME as Theme,
  );
  const [mode, setMode] = useLocalStorage<Mode>('mode', 'dark');

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    updateBodyClasses(newTheme, mode);
  };

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    updateBodyClasses(theme, newMode);
  };

  const updateBodyClasses = (currentTheme: Theme, currentMode: Mode) => {
    const allThemes: Theme[] = ['lara', 'sakai', 'vela', 'soho'];
    const allModes: Mode[] = ['light', 'dark'];

    // Remove all theme and mode classes
    allThemes.forEach((t) => document.body.classList.remove(t));
    allModes.forEach((m) => document.body.classList.remove(m));

    // Add current theme and mode classes
    document.body.classList.add(currentTheme, currentMode);
  };

  // Initial class setup
  React.useEffect(() => {
    updateBodyClasses(theme, mode);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mode, changeTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
