import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { Announce } from '../Announce';
import { InputBase, InputSize, InputType } from '../InputBase';
import { Button, ButtonVariant, ButtonType } from '../Button';
import { HiddenLabelText } from '../Input';
import { InputMessage } from '../Input/InputMessage';
import { Label } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';

import { useGenerateId } from '../../utils';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  hiddenPasswordAnnounceText?: string;
  hidePasswordButtonAriaLabel?: string;
  hidePasswordButtonText?: string;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  isPasswordMaskButtonHidden?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: React.ReactNode;
  messageStyle?: React.CSSProperties;
  shownPasswordAnnounceText?: string;
  showPasswordButtonAriaLabel?: string;
  showPasswordButtonText?: string;
  testId?: string;
}

const Container = styled.div`
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
`;

const PasswordMaskWrapper = styled.span`
  margin: 0;
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing02};
  top: ${props => props.theme.spaceScale.spacing03};
`;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props, ref) => {
  const [passwordShown, setPasswordShown] = React.useState<boolean>(false);

  function togglePasswordShown() {
    setPasswordShown(prevPasswordShown => !prevPasswordShown);
  }

  const {
    containerStyle,
    errorMessage,
    helperMessage,
    hiddenPasswordAnnounceText,
    hidePasswordButtonAriaLabel,
    hidePasswordButtonText,
    isPasswordMaskButtonHidden,
    id: defaultId,
    inputSize,
    isInverse,
    labelStyle,
    labelText,
    isLabelVisuallyHidden,
    messageStyle,
    shownPasswordAnnounceText,
    showPasswordButtonAriaLabel,
    showPasswordButtonText,
    type,
    ...other
  } = props;

  const i18n = React.useContext(I18nContext);

  const id = useGenerateId(defaultId);

  const HIDDEN_PASSWORD_ANNOUNCE_TEXT = hiddenPasswordAnnounceText
    ? hiddenPasswordAnnounceText
    : i18n.password.hidden.announce;
  const HIDE_PASSWORD_BUTTON_ARIA_LABEL = hidePasswordButtonAriaLabel
    ? hidePasswordButtonAriaLabel
    : i18n.password.hidden.ariaLabel;
  const HIDE_PASSWORD_BUTTON_TEXT = hidePasswordButtonText
    ? hidePasswordButtonText
    : i18n.password.hidden.buttonText;
  const SHOWN_PASSWORD_ANNOUNCE_TEXT = shownPasswordAnnounceText
    ? shownPasswordAnnounceText
    : i18n.password.shown.announce;
  const SHOW_PASSWORD_BUTTON_ARIA_LABEL = showPasswordButtonAriaLabel
    ? showPasswordButtonAriaLabel
    : i18n.password.shown.ariaLabel;
  const SHOW_PASSWORD_BUTTON_TEXT = showPasswordButtonText
    ? showPasswordButtonText
    : i18n.password.shown.buttonText;

  const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;
  const theme = React.useContext(ThemeContext);

  return (
    <Container style={containerStyle} theme={theme}>
      <Label
        isInverse={isInverse}
        htmlFor={id}
        size={inputSize ? inputSize : InputSize.medium}
        style={labelStyle}
      >
        {isLabelVisuallyHidden ? (
          <HiddenLabelText>{labelText}</HiddenLabelText>
        ) : (
          labelText
        )}
      </Label>
      <InputBase
        {...other}
        aria-describedby={
          descriptionId ? descriptionId : props['aria-describedby']
        }
        aria-invalid={!!errorMessage}
        id={id}
        hasError={!!errorMessage}
        inputSize={inputSize ? inputSize : InputSize.medium}
        isInverse={isInverse}
        ref={ref}
        theme={theme}
        type={passwordShown ? InputType.text : InputType.password}
      >
        {!isPasswordMaskButtonHidden && (
          <PasswordMaskWrapper theme={theme}>
            <Button
              aria-label={
                passwordShown
                  ? HIDE_PASSWORD_BUTTON_ARIA_LABEL
                  : SHOW_PASSWORD_BUTTON_ARIA_LABEL
              }
              onClick={togglePasswordShown}
              style={{
                borderRadius: theme.borderRadius,
                height:
                  inputSize == InputSize.large
                    ? theme.spaceScale.spacing08
                    : theme.spaceScale.spacing07,
                margin: 0,
              }}
              type={ButtonType.button}
              variant={ButtonVariant.link}
            >
              {passwordShown
                ? HIDE_PASSWORD_BUTTON_TEXT
                : SHOW_PASSWORD_BUTTON_TEXT}
            </Button>
            <VisuallyHidden>
              <Announce>
                {passwordShown
                  ? SHOWN_PASSWORD_ANNOUNCE_TEXT
                  : HIDDEN_PASSWORD_ANNOUNCE_TEXT}
              </Announce>
            </VisuallyHidden>
          </PasswordMaskWrapper>
        )}
      </InputBase>
      <InputMessage
        isInverse={isInverse}
        id={descriptionId}
        hasError={!!errorMessage}
        style={messageStyle}
      >
        {(errorMessage || helperMessage) && (
          <>{errorMessage ? errorMessage : helperMessage}</>
        )}
      </InputMessage>
    </Container>
  );
});
