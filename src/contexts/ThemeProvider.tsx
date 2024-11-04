import { DEFAULT_THEME } from '@constants';
import { useLocalStorage } from '@hooks';
import { Mode, Theme } from '@utils/types';
import React, { createContext, useContext } from 'react';

interface IThemeContext {
  theme: Theme;
  mode: Mode;

  changeTheme: (newTheme: Theme) => void;
  toggleMode: () => void;
}

interface IThemeProvider {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
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
