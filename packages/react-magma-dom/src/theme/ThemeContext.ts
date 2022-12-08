import { createContext } from 'react';
import { magma } from './magma';

export const ThemeContext = createContext(
  magma // default value
);
