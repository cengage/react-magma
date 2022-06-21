import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ErrorIcon } from 'react-magma-icons';
import { Announce } from '../Announce';
import { InputSize } from '../InputBase';
import { transparentize } from 'polished';

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hasError?: boolean;
  id?: string;
  /**
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  isInverse?: boolean;
}

function BuildMessageColor(props) {
  const { isInverse, hasError, theme } = props;
  if (isInverse) {
    return hasError
      ? theme.colors.danger200
      : transparentize(0.3, props.theme.colors.neutral100);
  }
  return hasError ? theme.colors.danger : theme.colors.neutral500;
}

const Message = styled.div<InputMessageProps>`
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => BuildMessageColor(props)};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-top: ${props =>
    props.inputSize === InputSize.large
      ? props.theme.spaceScale.spacing03
      : props.theme.spaceScale.spacing02};
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
          <IconWrapper aria-label="Error" role="img" theme={theme}>
            <ErrorIcon size={theme.iconSizes.small} />
          </IconWrapper>
        )}
        <div>{children}</div>
      </Message>
    </Announce>
  );
};
