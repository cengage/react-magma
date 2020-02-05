import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { Announce } from '../Announce';
import { Button, ButtonVariant, ButtonType } from '../Button';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';
import { VisuallyHidden } from '../VisuallyHidden';

import { useGenerateId } from '../utils';

export enum InputSize {
  large = 'large',
  medium = 'medium' //default
}

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  errorMessage?: string;
  helperMessage?: string;
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

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

const StyledInput = styled.input<PasswordInputProps>`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.errorMessage
      ? props.theme.colors.danger
      : props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};
  border-radius: 5px;
  box-shadow: ${props =>
    props.errorMessage ? `0 0 0 1px ${props.theme.colors.neutral08}` : '0 0 0'};
  color: ${props => props.theme.colors.neutral01};
  display: block;
  font-size: 1rem;
  height: ${props => (props.multiline ? '4.5em' : '37px')};
  line-height: 1.25rem;
  padding: 0 8px;
  padding-top: ${props => (props.multiline ? '5px' : '0')};
  width: 100%;

  ${props =>
    props.inputSize === 'large' &&
    !props.multiline &&
    css`
      font-size: 22px;
      height: 58px;
      line-height: 33px;
      padding 0 15px;
    `}

  &::placeholder {
    color: ${props => props.theme.colors.neutral03};
    opacity: 1;
  }

  &:focus {
    outline: 2px dotted
      ${props =>
        props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.pop02};
    outline-offset: 2px;
  }

  &[disabled] {
    background: ${props => props.theme.colors.neutral07};
    border-color: ${props => props.theme.colors.neutral05};
    color: ${props => props.theme.colors.disabledText};
    cursor: not-allowed;

    &::placeholder {
      color: ${props => props.theme.colors.disabledText};
  }
`;

const PasswordMaskWrapper = styled.span`
  left: auto;
  right: 10px;
  position: absolute;
  margin-top: -23px;
  top: 50%;
`;

export const PasswordInput: React.FunctionComponent<PasswordInputProps> = React.forwardRef(
  (props: PasswordInputProps, ref: React.Ref<HTMLInputElement>) => {
    const [value, setValue] = React.useState<string | string[] | number>(
      props.defaultValue || props.value
    );
    const [passwordShown, setPasswordShown] = React.useState<boolean>(false);

    React.useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);
      setValue(event.target.value);
    }

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
      inputStyle,
      isInverse,
      labelStyle,
      labelText,
      isLabelVisuallyHidden,
      shownPasswordAnnounceText,
      showPasswordButtonAriaLabel,
      showPasswordButtonText,
      type,
      testId,
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
        <InputWrapper>
          <StyledInput
            {...other}
            aria-describedby={
              descriptionId ? descriptionId : props['aria-describedby']
            }
            aria-invalid={!!errorMessage}
            aria-label={isLabelVisuallyHidden ? labelText : null}
            id={id}
            data-testid={testId}
            errorMessage={errorMessage}
            inputSize={inputSize ? inputSize : InputSize.medium}
            isInverse={isInverse}
            labelText={labelText}
            ref={ref}
            style={inputStyle}
            theme={theme}
            type={passwordShown ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
          />

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
        </InputWrapper>
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
