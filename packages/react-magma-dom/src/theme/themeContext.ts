import * as React from 'react';
import { amgam } from './amgam';
import { amgamDark } from './amgamDark';
import { magma } from './magma';

export const themes = {
  amgam,
  amgamDark,
  magma
};

export const ThemeContext = React.createContext(
  themes.magma // default value
);
