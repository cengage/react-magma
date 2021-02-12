import React, { HTMLAttributes } from 'react';
import { Language } from 'prism-react-renderer';
import { CodeBlockContext } from './context';
import { Example, parseCode } from './examples';

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  noRender?: boolean;
  switcher?: boolean;
  startExpanded?: boolean;
  themeName?: string;
}
export const CodeBlock: React.FC<CodeBlockProps> = ({
  noRender = false,
  startExpanded = false,
  ...props
}) => {
  const language = props.className?.replace(/language-/, '') as Language;
  const examples = parseCode(props.children);
  const firstExample = examples[0];

  return (
    <CodeBlockContext.Provider
      value={{
        language,
        noRender: noRender,
        startExpanded: startExpanded,
        themeNameOverride: props.themeName,
      }}
    >
      <Example
        description={firstExample.description}
        code={firstExample.code}
      />
    </CodeBlockContext.Provider>
  );
};
