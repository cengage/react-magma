import React, { useContext, useState } from 'react';

import {
  Actions,
  ActionsLeft,
  CopyAction,
  CodeSandboxAction,
  ExpandAction,
} from './actions';
import { CodeBlockContext } from './context';
import { Editor } from './editor';
import { Preview } from './preview';

function calculateStartExpanded(code: string, startExpanded: boolean) {
  if (startExpanded) return startExpanded;
  const AUTO_EXPAND_LINE_COUNT_THRESHOLD = 5;
  const lineCount = code.split(/\r\n|\r|\n/).length;

  return lineCount <= AUTO_EXPAND_LINE_COUNT_THRESHOLD;
}

interface ExampleProps {
  title?: string;
  code: string;
  noBorder?: boolean;
}
export const Example = ({ ...props }: ExampleProps) => {
  const context = useContext(CodeBlockContext);
  const [expanded, setExpanded] = useState<boolean>(
    calculateStartExpanded(props.code, context.startExpanded)
  );
  const toggleExpanded = () => setExpanded(!expanded);
  const isJSON = context.language === 'json';
  const isShScript = (context.language as string) === 'sh';

  return (
    <div>
      <Preview code={props.code} noBorder={context.noBorder} />
      <Actions>
        <ActionsLeft>
          {!context.noCode && (
            <ExpandAction expanded={expanded} onClick={toggleExpanded} />
          )}
        </ActionsLeft>
        {!context.noCopy && <CopyAction code={props.code} />}
        {!context.noCodeSandbox && !isJSON && !isShScript && (
          <CodeSandboxAction code={props.code} />
        )}
      </Actions>
      <Editor expanded={expanded} onClick={toggleExpanded}>
        {props.code}
      </Editor>
    </div>
  );
};
