import { Label, Paragraph } from 'react-magma-dom';

import frontmatter from '@github-docs/frontmatter';
import React, { useContext, useState } from 'react';

import { Actions, CopyAction, CodeSandboxAction } from './actions';
import { CodeBlockContext } from './context';
import { Editor } from './editor';
import { Preview } from './preview';

export interface ExampleData {
  code: string;
  description: string;
  id: string;
  title: string;
  value: string;
}

function calculateStartExpanded(code: string, startExpanded: boolean) {
  if (startExpanded) return startExpanded;
  const AUTO_EXPAND_LINE_COUNT_THRESHOLD = 5;
  const lineCount = code.split(/\r\n|\r|\n/).length;
  return lineCount <= AUTO_EXPAND_LINE_COUNT_THRESHOLD;
}

interface ExampleProps {
  title?: string;
  description?: string;
  code: string;
}
export const Example = ({ ...props }: ExampleProps) => {
  const context = useContext(CodeBlockContext);
  const [expanded, setExpanded] = useState<boolean>(
    calculateStartExpanded(props.code, context.startExpanded)
  );
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div>
      {props.description && <Paragraph>{props.description}</Paragraph>}
      <Actions>
        <Label style={{ flexGrow: 1 }}>{props.title}</Label>
        <CopyAction code={props.code} />
        <CodeSandboxAction code={props.code} />
      </Actions>
      <Editor expanded={expanded} onClick={toggleExpanded}>
        {props.code}
      </Editor>
      <Preview code={props.code} />
    </div>
  );
};

export const BasicExample = ({ ...props }: ExampleProps) => {
  return (
    <div>
      {props.description && <Paragraph>{props.description}</Paragraph>}
      <Actions>
        <Label style={{ flexGrow: 1 }}>{props.title}</Label>
        <CopyAction code={props.code} />
      </Actions>
      <Editor expanded={true} onClick={() => {}}>
        {props.code}
      </Editor>
      <Preview code={props.code} />
    </div>
  );
};

export function parseCode(
  code: string,
  delimiter = '\n\n===\n\n'
): ExampleData[] {
  return code.split(delimiter).map((str: string, index) => {
    const { content = '', data = {} } = frontmatter(str);
    const code = content.trim();

    const description = data.description || '';
    const title = data.title || `Example #${index}`;
    const value = `value ${index}`;

    return { id: `${index}`, code, description, title, value };
  });
}
