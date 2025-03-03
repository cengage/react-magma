import React, { HTMLAttributes, useContext } from 'react';

import { transform } from '@babel/core';
import * as HEADER from '@cengage-patterns/header';
import styled from '@emotion/styled';
import * as CHARTS from '@react-magma/charts';
import * as DROPZONE from '@react-magma/dropzone';
import * as SCHEMA from '@react-magma/schema-renderer';
import { es, zhCN } from 'date-fns/locale';
import { Language } from 'prism-react-renderer';
import { LiveError, LiveProvider, LivePreview } from 'react-live';
import * as MAGMA from 'react-magma-dom';
import * as ICONS from 'react-magma-icons';

import { CodeBlockContext } from './context';

const SUPPORTED_LANGUAGES: Language[] = [
  'javascript',
  'jsx',
  'tsx',
  'typescript',
];

interface PreviewData {
  code: string;
  scope: Record<string, unknown>;
}

interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  noBorder?: boolean;
}

const PreviewContainer = styled.div<{
  noBorder?: boolean;
  isInverse?: boolean;
}>`
  border: ${props =>
    props.noBorder
      ? 0
      : `1px solid ${
          props.isInverse
            ? MAGMA.magma.colors.borderInverse
            : MAGMA.magma.colors.border
        }`};
  border-bottom: 0;
  padding: ${props => (props.noBorder ? 0 : MAGMA.magma.spaceScale.spacing04)};
`;

export const Preview = ({ ...props }: PreviewProps) => {
  const context = useContext(CodeBlockContext);
  const supported = SUPPORTED_LANGUAGES.includes(context.language);
  const isInverse = MAGMA.useIsInverse();

  if (context.noRender || !supported) return null;

  const preview = formatPreview(props.code);

  return (
    <PreviewContainer isInverse={isInverse} noBorder={props.noBorder}>
      <LiveProvider
        code={preview.code}
        scope={{
          es,
          zhCN,
          ...MAGMA,
          ...ICONS,
          ICONS,
          ...HEADER,
          ...SCHEMA,
          ...DROPZONE,
          ...CHARTS,
        }}
        noInline
        transformCode={transformCode}
      >
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </PreviewContainer>
  );
};

export function formatPreview(code: string): PreviewData {
  return moveImportsToScope(replaceExport({ code, scope: {} }));
}

function moveImportsToScope(data: PreviewData): PreviewData {
  const findAllImports = /import [a-zA-Z0-9,{} \n]+ from '.+';?/g;
  let singleImportMatch = null;
  const newData = { ...data };

  const imports = [];
  while ((singleImportMatch = findAllImports.exec(data.code)) !== null) {
    const singleImportString = singleImportMatch[0];
    const findPackageName = /.*'(.+)'.*/;
    const packageName = singleImportString.replace(findPackageName, '$1');

    imports.push({
      start: singleImportMatch.index,
      end: singleImportMatch.index + singleImportMatch[0].length,
      packageName,
    });
  }

  imports.reverse().forEach(range => {
    const codeWithoutImport =
      newData.code.slice(0, range.start) + newData.code.slice(range.end);

    newData.code = codeWithoutImport;
    newData.scope = {
      ...newData.scope,
    };
  });

  return newData;
}

function replaceExport(data: PreviewData): PreviewData {
  return {
    ...data,
    code: data.code.replace(/export /, '').concat('\nrender(<Example />)'),
  };
}

function transformCode(code: string) {
  const transformed = transform(code, {
    filename: 'example.tsx',
    presets: [require('@babel/preset-typescript')],
  });

  return transformed!.code || code;
}
