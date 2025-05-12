import React, { useContext, MouseEvent } from 'react';

import styled from '@emotion/styled';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { magma, useIsInverse } from 'react-magma-dom';

import { CodeBlockContext } from './context';
import { magmaCode } from './magmaCode';
import { magmaCodeDark } from './magmaCodeDark';

interface EditorProps {
  children: string;
  expanded: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Pre = styled.pre<{ expanded?: boolean; isInverse?: boolean }>`
  background: ${props =>
    props.isInverse ? magma.colors.primary700 : magma.colors.neutral200};
  border: 1px solid
    ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  border-top: 0;
  border-radius: 0;
  margin: 0 0 ${magma.spaceScale.spacing04};
  max-height: ${props => (props.expanded ? 'auto' : '7.5em')};
  overflow: hidden;
  position: relative;

  :after {
    background: linear-gradient(
      180deg,
      transparent 20%,
      ${props =>
        props.isInverse ? magma.colors.primary700 : magma.colors.neutral200}
    );

    bottom: 0;
    content: '';
    height: ${magma.spaceScale.spacing09};
    left: 0;
    right: 0;
    position: absolute;
  }
`;

export const Editor = ({ ...props }: EditorProps) => {
  const context = useContext(CodeBlockContext);
  const isInverse = useIsInverse();

  if (context.noCode) return null;

  return (
    <Highlight
      {...defaultProps}
      code={props.children}
      language={context.language}
      theme={isInverse ? magmaCodeDark : magmaCode}
    >
      {highlight => {
        const { tokens, getLineProps, getTokenProps } = highlight;

        return (
          <Pre expanded={props.expanded} isInverse={isInverse}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        );
      }}
    </Highlight>
  );
};
