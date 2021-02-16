import React from 'react';
import { Language } from 'prism-react-renderer';

interface CodeBlockContextValue {
  language: Language;
  noRender: boolean;
  startExpanded: boolean;
  themeNameOverride?: string;
  title: string;
}
export const CodeBlockContext = React.createContext<CodeBlockContextValue>({
  language: 'typescript',
  title: 'Code Example',
  noRender: false,
  startExpanded: false,
  themeNameOverride: undefined,
});
