import React from 'react';
import { Language } from 'prism-react-renderer';

interface CodeBlockContextValue {
  language: Language;
  noRender: boolean;
  startExpanded: boolean;
  themeNameOverride?: string;
}
export const CodeBlockContext = React.createContext<CodeBlockContextValue>({
  language: 'typescript',
  noRender: false,
  startExpanded: false,
  themeNameOverride: undefined,
});
