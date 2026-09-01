import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { ErrorIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { Announce } from '../Announce';
import { InputSize } from '../InputBase';

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  errorColor?: string;
  errorIconColor?: string;
  hasError?: boolean;
  id?: string;
  /**
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  isInverse?: boolean;
  maxCount?: number;
  /**
   * @internal
   */
  messageColor?: string;
}

function BuildMessageColor(props) {
  const { errorColor, isInverse, hasError, messageColor, theme } = props;

  if (hasError && errorColor) {
    return errorColor;
  }

  if (hasError) {
    return isInverse ? theme.colors.danger200 : theme.colors.danger;
  }

  if (messageColor) {
    return messageColor;
  }

  if (isInverse) {
    return transparentize(0.3, props.theme.colors.neutral0);
  }

  return theme.colors.neutral500;
}

const Message = styled.div<InputMessageProps>`
  align-items: flex-start;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => BuildMessageColor(props)};
  display: flex;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-family: ${props => props.theme.bodyFont};
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
  errorColor,
  errorIconColor,
  id,
  isInverse,
  hasError,
  maxCount,
  messageColor,
  ...other
}: InputMessageProps) => {
  const theme = React.useContext(ThemeContext);

  //Conditional wrapper based on maxCount or hasError, allows Character Counter or hasError prop to render without the Announce component for accessibility purposes.
  function AnnounceWrapper(props) {
    if (maxCount || hasError) {
      return props.children;
    }

    return <Announce>{props.children}</Announce>;
  }

  return (
    <AnnounceWrapper>
      <Message
        {...other}
        data-testid="inputMessage"
        errorColor={errorColor}
        id={id}
        isInverse={isInverse}
        hasError={hasError}
        messageColor={messageColor}
        theme={theme}
      >
        {hasError && (
          <IconWrapper aria-label="Error" role="img" theme={theme}>
            <ErrorIcon
              size={theme.iconSizes.small}
              color={
                errorIconColor ||
                (isInverse ? theme.colors.danger300 : undefined)
              }
            />
          </IconWrapper>
        )}
        <div>{children}</div>
      </Message>
    </AnnounceWrapper>
  );
};
