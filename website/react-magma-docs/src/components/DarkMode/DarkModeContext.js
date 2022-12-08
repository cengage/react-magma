import { createContext } from 'react';

export const DarkModeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
});
