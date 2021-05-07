import * as React from 'react';

export const DarkModeContext = React.createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
});
