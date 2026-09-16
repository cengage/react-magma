import React, { useContext, useState } from 'react';

import styled from '@emotion/styled';
import { magma, useIsInverse } from 'react-magma-dom';

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

const ExampleContainer = styled.div<{
  isInverse?: boolean;
  noBorder?: boolean;
}>`
  border: ${props =>
    props.noBorder
      ? 0
      : `1px solid ${
          props.isInverse ? magma.colors.borderInverse : magma.colors.border
        }`};
  border-radius: 16px;
  margin-bottom: ${magma.spaceScale.spacing04};
  overflow: visible;

  > :first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  > :last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
`;

export const Example = ({ ...props }: ExampleProps) => {
  const context = useContext(CodeBlockContext);
  const isInverse = useIsInverse();
  const [expanded, setExpanded] = useState<boolean>(
    calculateStartExpanded(props.code, context.startExpanded)
  );
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <ExampleContainer isInverse={isInverse} noBorder={context.noBorder}>
      <Preview code={props.code} noBorder={context.noBorder} />
      <Actions>
        <ActionsLeft>
          {!context.noCode && (
            <ExpandAction expanded={expanded} onClick={toggleExpanded} />
          )}
        </ActionsLeft>
        {!context.noCopy && <CopyAction code={props.code} />}
        {!context.noCodeSandbox && <CodeSandboxAction code={props.code} />}
      </Actions>
      <Editor expanded={expanded} onClick={toggleExpanded}>
        {props.code}
      </Editor>
    </ExampleContainer>
  );
};
