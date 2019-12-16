import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { IconProps } from '../Icon/utils';
import { Spinner } from '../Spinner';
import { ThemeContext } from '../../theme/ThemeContext';
import { Announce } from '../Announce';
import {
  Button,
  ButtonVariant,
  ButtonType,
  ButtonSize,
  ButtonShape
} from '../Button';
import { InputMessage } from './InputMessage';
import { Label } from '../Label';
import { QuestionCircleIcon } from '../Icon/types/QuestionCircleIcon';
import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import { useGenerateId } from '../utils';

export enum InputIconPosition {
  left = 'left',
  right = 'right'
}

export enum InputSize {
  large = 'large',
  medium = 'medium' //default
}

export enum InputType {
  email = 'email',
  number = 'number',
  password = 'password',
  search = 'search',
  text = 'text' // default
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  as?: string;
  containerStyle?: React.CSSProperties;
  errorMessage?: string;
  helpLinkText?: string;
  helperMessage?: string;
  hiddenPasswordAnnounceText?: string;
  hidePasswordButtonAriaLabel?: string;
  hidePasswordButtonText?: string;
  hidePasswordMaskButton?: boolean;
  icon?: React.ReactElement<IconProps>;
  iconAriaLabel?: string;
  iconPosition?: InputIconPosition;
  innerRef?: React.Ref<HTMLInputElement>;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  isLoading?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  labelVisuallyHidden?: boolean;
  multiline?: boolean;
  onHelpLinkClick?: () => void;
  onIconClick?: () => void;
  onIconKeyDown?: (event) => void;
  ref?: any;
  shownPasswordAnnounceText?: string;
  showPasswordButtonAriaLabel?: string;
  showPasswordButtonText?: string;
  testId?: string;
  type?: InputType;
  value?: string;
}

interface IconWrapperProps {
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

const StyledInput = styled.input<InputProps>`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.errorMessage
      ? props.theme.colors.danger
      : props.inverse
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
  padding: 0;
  padding-left: ${props => (props.iconPosition === 'left' ? '35px' : '8px')};
  padding-right: ${props => (props.iconPosition === 'right' ? '35px' : '8px')};
  padding-top: ${props => (props.multiline ? '5px' : '0')};
  width: 100%;

  ${props =>
    props.inputSize === 'large' &&
    !props.multiline &&
    css`
      font-size: 22px;
      height: 58px;
      line-height: 33px;
      padding-left: ${props.iconPosition === 'left' ? '50px' : '15px'};
      padding-right: ${props.iconPosition === 'right' ? '50px' : '15px'};
    `}

  &::placeholder {
    color: ${props => props.theme.colors.neutral03};
    opacity: 1;
  }

  &:focus {
    outline: 2px dotted
      ${props =>
        props.inverse
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

const IconWrapper = styled.span<IconWrapperProps>`
  left: ${props => (props.iconPosition === 'left' ? '10px' : 'auto')};
  right: ${props => (props.iconPosition === 'right' ? '10px' : 'auto')};
  color: ${props => props.theme.colors.neutral01};
  position: absolute;
  margin-top: -9px;
  top: 50%;

  ${props =>
    props.inputSize === 'large' &&
    css`
      left: ${props.iconPosition === 'left' ? '15px' : 'auto'};
      right: ${props.iconPosition === 'right' ? '15px' : 'auto'};
      margin-top: -10px;
    `}
`;

const IconButton = styled(Button)<{ size: ButtonSize }>`
  position: absolute;
  bottom: 0;
  right: 0;

  ${props =>
    props.size === 'large' &&
    css`
      bottom: 2px;

      svg {
        height: 21px;
        width: 21px;
      }
    `}
`;

const PasswordMaskWrapper = styled.span`
  left: auto;
  right: 10px;
  position: absolute;
  margin-top: -23px;
  top: 50%;
`;

const SpinnerWrapper = styled.span`
  align-items: center;
  bottom: 0;
  display: flex;
  position: absolute;
  right: 10px;
  top: 0;
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 21;
    default:
      return 17;
  }
}

export const Input: React.FunctionComponent<InputProps> = React.forwardRef(
  (props: InputProps, ref: any) => {
    const id = useGenerateId(props.id);
    const [value, setValue] = React.useState<string>(props.value);
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
      helpLinkText,
      hidePasswordMaskButton,
      hiddenPasswordAnnounceText,
      hidePasswordButtonAriaLabel,
      hidePasswordButtonText,
      icon,
      iconAriaLabel,
      isLoading,
      onIconClick,
      onIconKeyDown,
      inputSize,
      inputStyle,
      inverse,
      labelStyle,
      labelText,
      labelVisuallyHidden,
      multiline,
      onHelpLinkClick,
      shownPasswordAnnounceText,
      showPasswordButtonAriaLabel,
      showPasswordButtonText,
      type,
      testId,
      innerRef,
      ...other
    } = props;

    const iconPosition =
      icon && onIconClick
        ? InputIconPosition.right
        : icon && !props.iconPosition
        ? InputIconPosition.left
        : props.iconPosition;

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
        : 'Show',
      HELP_LINK_TEXT = helpLinkText ? helpLinkText : "What's this?";

    const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;
    const theme = React.useContext(ThemeContext);

    return (
      <Container style={containerStyle}>
        {!labelVisuallyHidden && (
          <Label
            inverse={inverse}
            htmlFor={id}
            size={inputSize && !multiline ? inputSize : InputSize.medium}
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
            aria-label={labelVisuallyHidden ? labelText : null}
            as={multiline ? 'textarea' : null}
            id={id}
            data-testid={testId}
            errorMessage={errorMessage}
            iconPosition={iconPosition}
            inputSize={inputSize && !multiline ? inputSize : InputSize.medium}
            inverse={inverse}
            labelText={labelText}
            multiline={multiline}
            ref={ref}
            style={inputStyle}
            theme={theme}
            type={
              type
                ? type === InputType.password && passwordShown
                  ? InputType.text
                  : type
                : InputType.text
            }
            value={value}
            onBlur={props.onBlur}
            onChange={handleChange}
            onFocus={props.onFocus}
          />
          {icon && !onIconClick && !isLoading && (
            <IconWrapper
              aria-label={iconAriaLabel}
              iconPosition={iconPosition}
              inputSize={inputSize && !multiline ? inputSize : InputSize.medium}
              theme={theme}
            >
              {React.Children.only(
                React.cloneElement(icon, {
                  size: getIconSize(
                    inputSize && !multiline ? inputSize : InputSize.medium
                  )
                })
              )}
            </IconWrapper>
          )}

          {isLoading && (
            <SpinnerWrapper data-testid="spinnerWrapper">
              <Spinner size={19} />
            </SpinnerWrapper>
          )}

          {type === InputType.password && !hidePasswordMaskButton && (
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

          {onHelpLinkClick && (
            <Tooltip
              content={HELP_LINK_TEXT}
              inverse={inverse}
              trigger={
                <Button
                  aria-label={HELP_LINK_TEXT}
                  icon={<QuestionCircleIcon />}
                  inverse={inverse}
                  onClick={onHelpLinkClick}
                  size={
                    inputSize === InputSize.large && !multiline
                      ? ButtonSize.large
                      : ButtonSize.medium
                  }
                  style={{ margin: '0 0 0 7px' }}
                  type={ButtonType.button}
                  title={HELP_LINK_TEXT}
                  variant={ButtonVariant.link}
                />
              }
            />
          )}

          {onIconClick && !isLoading && (
            <IconButton
              aria-label={iconAriaLabel}
              icon={icon}
              onClick={onIconClick}
              onKeyDown={onIconKeyDown}
              shape={ButtonShape.fill}
              size={
                inputSize === InputSize.large && !multiline
                  ? ButtonSize.large
                  : ButtonSize.small
              }
              theme={theme}
              type={ButtonType.button}
              variant={ButtonVariant.link}
            />
          )}
        </InputWrapper>
        <InputMessage
          inverse={inverse}
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
