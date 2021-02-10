import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
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

const Message = styled.div<InputMessageProps>`
  align-items: center;
  background: ${props =>
    props.isInverse && props.hasError ? props.theme.colors.danger : 'none'};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.hasError
      ? props.theme.colors.danger
      : props.theme.colors.neutral03};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-top: ${props =>
    props.inputSize === InputSize.large
      ? props.theme.spaceScale.spacing03
      : props.theme.spaceScale.spacing02};
  min-height: ${props => props.theme.spaceScale.spacing06};
  padding: ${props =>
    props.isInverse && props.hasError
      ? `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing03}`
      : '0'};
  text-align: left;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  padding-right: ${props => props.theme.spaceScale.spacing02};
`;

export const InputMessage: React.FunctionComponent<InputMessageProps> = ({
  children,
  id,
  isInverse,
  hasError,
  ...other
}: InputMessageProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <Announce>
      <Message
        {...other}
        data-testid="inputMessage"
        id={id}
        isInverse={isInverse}
        hasError={hasError}
        theme={theme}
      >
        {hasError && (
          <IconWrapper theme={theme}>
            <ErrorIcon aria-label="Error" size={theme.iconSizes.small} />
          </IconWrapper>
        )}
        <div>{children}</div>
      </Message>
    </Announce>
  );
};
