import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { Notification2Icon } from '../Icon/types/Notification2Icon';

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  inverse?: boolean;
  isError?: boolean;
}

const Message = styled.div<InputMessageProps>`
  align-items: center;
  background: ${props =>
    props.inverse && props.isError ? props.theme.colors.danger : 'none'};
  border-radius: 5px;
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.isError
      ? props.theme.colors.danger
      : props.theme.colors.neutral04};
  display: flex;
  font-size: 13px;
  margin-top: 5px;
  padding: ${props => (props.inverse && props.isError ? '5px 10px' : '0')};
  text-align: left;
`;

export const InputMessage: React.FunctionComponent<
  InputMessageProps
> = React.forwardRef(
  ({ children, id, inverse, isError, ...other }: InputMessageProps) => {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Message
            {...other}
            id={id}
            inverse={inverse}
            isError={isError}
            theme={theme}
          >
            {isError && (
              <>
                <Notification2Icon aria-label="Error" size={18} /> &nbsp;
              </>
            )}
            {children}
          </Message>
        )}
      </ThemeContext.Consumer>
    );
  }
);
