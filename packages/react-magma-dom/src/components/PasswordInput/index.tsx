import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Announce } from '../Announce';
import { BaseInput, InputSize, InputType } from '../BaseInput';
import { Button, ButtonVariant, ButtonType } from '../Button';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';
import { VisuallyHidden } from '../VisuallyHidden';

import { useGenerateId } from '../utils';

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
  labelText: string;
  multiline?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  shownPasswordAnnounceText?: string;
  showPasswordButtonAriaLabel?: string;
  showPasswordButtonText?: string;
  testId?: string;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const PasswordMaskWrapper = styled.span`
  left: auto;
  right: 10px;
  position: absolute;
  margin-top: -23px;
  top: 50%;
`;

export const PasswordInput: React.FunctionComponent<
  PasswordInputProps
> = React.forwardRef(
  (props: PasswordInputProps, ref: React.Ref<HTMLInputElement>) => {
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
      shownPasswordAnnounceText,
      showPasswordButtonAriaLabel,
      showPasswordButtonText,
      type,
      ...other
    } = props;

    const id = useGenerateId(defaultId);

    const HIDDEN_PASSWORD_ANNOUNCE_TEXT = hiddenPasswordAnnounceText
        ? hiddenPasswordAnnounceText
        : 'Password is now hidden',
      HIDE_PASSWORD_BUTTON_ARIA_LABEL = hidePasswordButtonAriaLabel
        ? hidePasswordButtonAriaLabel
        : 'Hide password',
      HIDE_PASSWORD_BUTTON_TEXT = hidePasswordButtonText
        ? hidePasswordButtonText
        : 'Hide',
      SHOWN_PASSWORD_ANNOUNCE_TEXT = shownPasswordAnnounceText
        ? shownPasswordAnnounceText
        : 'Password is now visible',
      SHOW_PASSWORD_BUTTON_ARIA_LABEL = showPasswordButtonAriaLabel
        ? showPasswordButtonAriaLabel
        : 'Show password. Note: this will visually expose your password on the screen',
      SHOW_PASSWORD_BUTTON_TEXT = showPasswordButtonText
        ? showPasswordButtonText
        : 'Show';

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;
    const theme = React.useContext(ThemeContext);

    return (
      <Container style={containerStyle}>
        {!isLabelVisuallyHidden && (
          <Label
            isInverse={isInverse}
            htmlFor={id}
            size={inputSize ? inputSize : InputSize.medium}
            style={labelStyle}
          >
            {labelText}
          </Label>
        )}
        <BaseInput
          {...other}
          aria-describedby={
            descriptionId ? descriptionId : props['aria-describedby']
          }
          aria-invalid={!!errorMessage}
          aria-label={isLabelVisuallyHidden ? labelText : null}
          id={id}
          hasError={!!errorMessage}
          inputSize={inputSize ? inputSize : InputSize.medium}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
          type={passwordShown ? InputType.text : InputType.password}
        >
          {!isPasswordMaskButtonHidden && (
            <PasswordMaskWrapper>
              <Button
                aria-label={
                  passwordShown
                    ? HIDE_PASSWORD_BUTTON_ARIA_LABEL
                    : SHOW_PASSWORD_BUTTON_ARIA_LABEL
                }
                onClick={togglePasswordShown}
                style={{
                  height: '30px',
                  marginTop: '8px',
                  marginRight: '0',
                  left: '7px',
                  borderRadius: '3px'
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
        </BaseInput>
        <InputMessage
          isInverse={isInverse}
          id={descriptionId}
          isError={!!errorMessage}
        >
          {(errorMessage || helperMessage) && (
            <>{errorMessage ? errorMessage : helperMessage}</>
          )}
        </InputMessage>
      </Container>
    );
  }
);
