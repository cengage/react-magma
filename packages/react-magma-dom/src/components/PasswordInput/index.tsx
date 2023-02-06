import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { Announce } from '../Announce';
import { InputBase, InputSize, InputType } from '../InputBase';
import { Button, ButtonVariant, ButtonType, ButtonSize } from '../Button';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';
import { useIsInverse } from '../../inverse';
import { VisuallyHidden } from '../VisuallyHidden';

import { useGenerateId } from '../../utils';

export interface PasswordInputProps
  extends Omit<FormFieldContainerBaseProps, 'fieldId'>,
    React.InputHTMLAttributes<HTMLInputElement> {
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
  isInverse?: boolean;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isPasswordMaskButtonHidden?: boolean;
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
  /**
   * @internal
   */
  testId?: string;
  /**
   * String to determine width of input, must be suffixed with "px", "rem", or "%""
   * @default "auto"
   */
  width?: string;
}

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
    disabled,
    errorMessage,
    helperMessage,
    hiddenPasswordAnnounceText,
    hidePasswordButtonAriaLabel,
    hidePasswordButtonText,
    isPasswordMaskButtonHidden,
    id: defaultId,
    inputSize = InputSize.medium,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
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

  const isInverse = useIsInverse(props.isInverse);

  return (
    <FormFieldContainer
      containerStyle={containerStyle}
      errorMessage={errorMessage}
      fieldId={id}
      helperMessage={helperMessage}
      inputSize={inputSize}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      isInverse={isInverse}
      labelPosition={labelPosition}
      labelStyle={labelStyle}
      labelText={labelText}
      labelWidth={labelWidth}
    >
      <InputBase
        autoCorrect="off"
        autoCapitalize="none"
        {...other}
        aria-describedby={
          descriptionId ? descriptionId : props['aria-describedby']
        }
        aria-invalid={!!errorMessage}
        disabled={disabled}
        hasError={!!errorMessage}
        id={id}
        inputSize={inputSize}
        inputStyle={{ width: 'calc(100% - 52px)' }}
        isInverse={isInverse}
        ref={ref}
        type={passwordShown ? InputType.text : InputType.password}
        isPasswordInput={true}
        width={props.width}
      >
        {!isPasswordMaskButtonHidden && (
          <>
            <Button
              aria-label={
                passwordShown
                  ? HIDE_PASSWORD_BUTTON_ARIA_LABEL
                  : SHOW_PASSWORD_BUTTON_ARIA_LABEL
              }
              disabled={disabled}
              isInverse={isInverse}
              onClick={togglePasswordShown}
              size={ButtonSize.small}
              style={{
                borderRadius: theme.borderRadius,
                height:
                  inputSize == InputSize.large
                    ? theme.spaceScale.spacing10
                    : theme.spaceScale.spacing08,
                margin: ' 0 3px 0 0 ',
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
          </>
        )}
      </InputBase>
    </FormFieldContainer>
  );
});
