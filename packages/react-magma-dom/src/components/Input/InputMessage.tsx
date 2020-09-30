import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Notification2Icon } from 'react-magma-icons';
import { Announce } from '../Announce';

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  isInverse?: boolean;
  hasError?: boolean;
}

const Message = styled.div<InputMessageProps>`
  align-items: center;
  background: ${props =>
    props.isInverse && props.hasError ? props.theme.colors.danger : 'none'};
  border-radius: 5px;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.hasError
      ? props.theme.colors.danger
      : props.theme.colors.neutral03};
  display: flex;
  font-size: 13px;
  line-height: 1.3;
  margin-top: 5px;
  min-height: 20px;
  padding: ${props => (props.isInverse && props.hasError ? '5px 10px' : '0')};
  text-align: left;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  padding-right: 5px;
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
          <IconWrapper>
            <Notification2Icon aria-label="Error" size={18} />
          </IconWrapper>
        )}
        <div>{children}</div>
      </Message>
    </Announce>
  );
};
