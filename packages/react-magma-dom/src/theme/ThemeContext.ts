import * as React from 'react';
import { magma } from './magma';

export const ThemeContext = React.createContext({
  theme: magma,
  setTheme: () => {},
});
