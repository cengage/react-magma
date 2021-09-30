import * as React from 'react';
import styled from '@emotion/styled';
import { ErrorIcon } from 'react-magma-icons';
import { Announce } from '../Announce';
import { InputSize } from '../InputBase';

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hasError?: boolean;
  id?: string;
  inputSize?: InputSize;
  isInverse?: boolean;
}

function BuildMessageColor(props) {
  const { isInverse, hasError } = props;
  if (isInverse) {
    return hasError ? 'var(--colors-dangerInverse)' : 'var(--colors-neutral08)';
  }
  return hasError ? 'var(--colors-danger)' : 'var(--colors-neutral03)';
}

const Message = styled.div<InputMessageProps>`
  align-items: center;
  border-radius: var(--borderRadius);
  color: ${props => BuildMessageColor(props)};
  display: flex;
  font-size: var(typeScale-size02-fontSize);
  line-height: var(typeScale-size02-lineHeight);
  margin-top: ${props =>
    props.inputSize === InputSize.large
      ? 'var(--spaceScale-spacing03)'
      : 'var(--spaceScale-spacing02)'};
  min-height: var(--spaceScale-spacing06);
  text-align: left;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  padding-right: var(--spaceScale-spacing02);
`;

export const InputMessage: React.FunctionComponent<InputMessageProps> = ({
  children,
  id,
  isInverse,
  hasError,
  ...other
}: InputMessageProps) => {

  return (
    <Announce>
      <Message
        {...other}
        data-testid="inputMessage"
        id={id}
        isInverse={isInverse}
        hasError={hasError}
      >
        {hasError && (
          <IconWrapper aria-label="Error" role="img">
            <ErrorIcon size={20} />
          </IconWrapper>
        )}
        <div>{children}</div>
      </Message>
    </Announce>
  );
};
