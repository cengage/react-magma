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

const Pre = styled.pre`
  background: ${magma.colors.neutral07};
  border: 1px solid ${magma.colors.neutral06};
  border-radius: 0;
  margin: 0;
`;

export const Editor = ({ ...props }: EditorProps) => {
  const context = useContext(CodeBlockContext);

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
          <Pre>
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
