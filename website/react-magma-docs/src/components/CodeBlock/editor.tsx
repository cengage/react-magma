import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { useContext, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { CodeBlockContext } from './context';
import { magma } from 'react-magma-dom';
import { magmaCode } from './magmaCode';

interface EditorProps {
  children: string;
  expanded: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Pre = styled.pre<{ expanded?: boolean }>`
  background: ${magma.colors.neutral07};
  border: 1px solid ${magma.colors.neutral06};
  border-top: 0;
  border-radius: 0;
  margin: 0 0 ${magma.spaceScale.spacing04};
  max-height: ${props => (props.expanded ? 'auto' : '7.5em')};
  overflow: hidden;
  position: relative;

  :after {
    background: linear-gradient(
      180deg,
      rgba(24, 28, 32, 0) 20%,
      ${magma.colors.neutral07}
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

  if (context.noCode) return null;

  return (
    <Highlight
      {...defaultProps}
      code={props.children}
      language={context.language}
      theme={magmaCode}
    >
      {highlight => {
        const { tokens, getLineProps, getTokenProps } = highlight;

        return (
          <Pre expanded={props.expanded}>
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
