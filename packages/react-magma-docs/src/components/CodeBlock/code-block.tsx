import React, { HTMLAttributes } from 'react';
import { Language } from 'prism-react-renderer';
import { CodeBlockContext } from './context';
import { BasicExample, Example, parseCode } from './examples';

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  noRender?: boolean;
  switcher?: boolean;
  startExpanded?: boolean;
  themeName?: string;
}

export const CodeBlock = ({
  noRender = false,
  startExpanded = false,
  basic = false,
  ...props
}: CodeBlockProps) => {
  const language = props.className?.replace(/language-/, '') as Language;
  const examples = parseCode(props.children);
  const firstExample = examples[0];

  const ExampleComponent = basic ? BasicExample : Example;

  return (
    <CodeBlockContext.Provider
      value={{
        language,
        noRender: noRender,
        startExpanded: startExpanded,
        themeNameOverride: props.themeName,
      }}
    >
      <ExampleComponent
        description={firstExample.description}
        code={firstExample.code}
      />
    </CodeBlockContext.Provider>
  );
};
