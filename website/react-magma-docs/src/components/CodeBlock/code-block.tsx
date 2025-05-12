import React, { HTMLAttributes } from 'react';

import { Language } from 'prism-react-renderer';

import { CodeBlockContext } from './context';
import { Example } from './examples';

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  title?: string;
  noRender?: boolean;
  noCode?: boolean;
  switcher?: boolean;
  startExpanded?: boolean;
  themeName?: string;
  noCopy?: boolean;
  noCodeSandbox?: boolean;
  noBorder?: boolean;
}

export const CodeBlock = ({
  noCode = false,
  noRender = false,
  startExpanded = false,
  noCopy = false,
  noCodeSandbox = false,
  noBorder = false,
  title = 'Code Example',
  ...props
}: CodeBlockProps) => {
  const language = props.className?.replace(/language-/, '') as Language;

  return (
    <CodeBlockContext.Provider
      value={{
        language,
        noRender,
        noCode,
        noCopy,
        noCodeSandbox,
        noBorder,
        startExpanded,
        title,
        themeNameOverride: props.themeName,
      }}
    >
      <Example title={title} code={props.children} />
    </CodeBlockContext.Provider>
  );
};
