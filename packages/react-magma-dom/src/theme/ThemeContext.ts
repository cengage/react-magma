import * as React from 'react';

import { magma, ThemeInterface } from './magma';

export const ThemeContext = React.createContext<ThemeInterface>(
  magma // default value
);
