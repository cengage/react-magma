import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { Announce } from '../Announce';
import { InputBase, InputSize, InputType } from '../InputBase';
import { Button, ButtonVariant, ButtonType } from '../Button';
import { HiddenLabelText } from '../Input';
import { InputMessage } from '../Input/InputMessage';
import { InverseContext, getIsInverse } from '../../inverse';
import { Label } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';

import { useGenerateId } from '../../utils';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the input will be styled as an error state and the error message will display
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message
   */
  helperMessage?: React.ReactNode;
  /**
   * Text read by screen reader when the password is hidden
   * @default "Password is now hidden"
   */
  hiddenPasswordAnnounceText?: string;
  /**
   * Aria-label for the "Hide Password" button
   * @default "Hide password"
   */
  hidePasswordButtonAriaLabel?: string;
  /**
   * Text displayed on screen for the "Hide Password" button
   * @default "Hide"
   */
  hidePasswordButtonText?: string;
  /**
   * Relative size of the component
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  /**
   * Style properties for the input element
   */
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isPasswordMaskButtonHidden?: boolean;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content of label; can be a node or a string
   */
  labelText: React.ReactNode;
  /**
   * Style properties for the helper or error message
   */
  messageStyle?: React.CSSProperties;
  /**
   * Text read by screen reader when the password is hidden
   * @default "Password is now hidden"
   */
  shownPasswordAnnounceText?: string;
  /**
   * Aria-label for the "Show Password" button
   * @default "Show password. Note: this will visually expose your password on the screen"
   */
  showPasswordButtonAriaLabel?: string;
  /**
   * Text displayed on screen for the "Show Password" button
   * @default "Show"
   */
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
  top: ${props => props.theme.spaceScale.spacing02};
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

  const inverseContext = React.useContext(InverseContext);
  const isInverse = getIsInverse(inverseContext, props.isInverse);

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
        autoCorrect="off"
        autoCapitalize="none"
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
              isInverse={false}
              onClick={togglePasswordShown}
              style={{
                borderRadius: theme.borderRadius,
                height:
                  inputSize == InputSize.large
                    ? theme.spaceScale.spacing10
                    : theme.spaceScale.spacing08,
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
