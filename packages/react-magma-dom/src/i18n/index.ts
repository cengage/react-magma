import { createContext } from 'react';
import { defaultI18n } from './default';
import { I18nInterface } from './interface';

export const I18nContext = createContext<I18nInterface>(defaultI18n);
