import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Notification2Icon } from '../Icon/types/Notification2Icon';

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  isInverse?: boolean;
  isError?: boolean;
}

const Message = styled.div<InputMessageProps>`
  align-items: center;
  background: ${props =>
    props.isInverse && props.isError ? props.theme.colors.danger : 'none'};
  border-radius: 5px;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.isError
      ? props.theme.colors.danger
      : props.theme.colors.neutral03};
  display: flex;
  font-size: 13px;
  line-height: 1.3;
  margin-top: 5px;
  min-height: 20px;
  padding: ${props => (props.isInverse && props.isError ? '5px 10px' : '0')};
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
  isError,
  ...other
}: InputMessageProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <Message
      {...other}
      data-testid="inputMessage"
      id={id}
      isInverse={isInverse}
      isError={isError}
      theme={theme}
    >
      {isError && (
        <IconWrapper>
          <Notification2Icon aria-label="Error" size={18} />
        </IconWrapper>
      )}
      <div>{children}</div>
    </Message>
  );
};
