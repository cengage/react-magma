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

const flagKeys = [
  'noRender',
  'noCode',
  'startExpanded',
  'noCopy',
  'noCodeSandbox',
  'noBorder',
];

type FlagKey = (typeof flagKeys)[number];

const parseFlags = (values: string[]): Partial<Record<FlagKey, boolean>> => {
  const normalized = values?.map(v => v.trim());

  return flagKeys.reduce(
    (acc, key) => {
      if (normalized?.includes(key)) {
        acc[key] = true;
      }

      return acc;
    },
    {} as Partial<Record<FlagKey, boolean>>
  );
};

export const CodeBlock = ({
  noCode = false,
  noRender = false,
  startExpanded = false,
  noCopy = false,
  noCodeSandbox = false,
  noBorder = false,
  children,
  themeName,
  title = 'Code Example',
  ...props
}: CodeBlockProps) => {
  const language = props.className?.split('-')[1] as Language;
  const values: string[] = props.className?.split('-').slice(2);
  const flags = parseFlags(values);

  return (
    <CodeBlockContext.Provider
      value={{
        language,
        noRender: flags.noRender ?? noRender,
        noCode: flags.noCode ?? noCode,
        noCopy: flags.noCopy ?? noCopy,
        noCodeSandbox: flags.noCodeSandbox ?? noCodeSandbox,
        noBorder: flags.noBorder ?? noBorder,
        startExpanded: flags.startExpanded ?? startExpanded,
        title,
        themeNameOverride: themeName,
      }}
    >
      <Example title={title} code={children} />
    </CodeBlockContext.Provider>
  );
};
