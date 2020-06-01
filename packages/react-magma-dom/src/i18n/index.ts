import * as React from 'react';
import { defaultI18n, I18nInterface } from './default';

export const I18nContext = React.createContext<I18nInterface>(defaultI18n);
