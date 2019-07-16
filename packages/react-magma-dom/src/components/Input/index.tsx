import * as React from 'react';
import { InputCore } from 'react-magma-core';
import styled from '@emotion/styled';
import { IconProps } from '../Icon/utils';
import { ThemeContext } from '../../theme/ThemeContext';

import { Announce } from '../Announce';
import { Button, EnumButtonVariant, EnumButtonType } from '../Button';
import { InputMessage } from './InputMessage';
import { Label } from '../Label';
import { QuestionCircleIcon } from '../Icon/types/QuestionCircleIcon';
import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';

export enum EnumInputIconPosition {
  left = 'left',
  right = 'right'
}

export enum EnumInputSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export enum EnumInputType {
  text = 'text',
  password = 'password',
  number = 'number'
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
  iconPosition?: EnumInputIconPosition;
  inputSize?: EnumInputSize;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  labelVisuallyHidden?: boolean;
  multiline?: boolean;
  onHelpLinkClick?: () => void;
  ref?: any;
  shownPasswordAnnounceText?: string;
  showPasswordButtonAriaLabel?: string;
  showPasswordButtonText?: string;
  testId?: string;
  type?: EnumInputType;
}

interface IconWrapperProps {
  iconPosition?: EnumInputIconPosition;
}

const Container = styled.div`
  margin-bottom: 10px;
  min-height: 7em;
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
      : props.theme.colors.neutral05};
  border-radius: 5px;
  box-shadow: ${props =>
    props.errorMessage ? `0 0 0 1px ${props.theme.colors.danger}` : '0 0 0'};
  color: ${props => props.theme.colors.neutral02};
  display: block;
  font-size: ${props => {
    switch (props.inputSize) {
      case 'large':
        return '1.125rem';
      case 'small':
        return '.875rem';
      default:
        return '1rem';
    }
  }};
  height: ${props => {
    if (props.multiline) {
      return '4.5em';
    }
    switch (props.inputSize) {
      case 'large':
        return '45px';
      case 'small':
        return '29px';
      default:
        return '37px';
    }
  }};
  line-height: 1.25rem;
  padding: 0;
  padding-left: ${props => (props.iconPosition === 'left' ? '35px' : '8px')};
  padding-right: ${props => (props.iconPosition === 'right' ? '35px' : '8px')};
  padding-top: ${props => (props.multiline ? '5px' : '0')};
  width: 100%;

  &::placeholder {
    color: ${props => props.theme.colors.neutral04};
    opacity: 1;
  }

  &:focus {
    border-color: ${props => props.theme.colors.pop03};
    box-shadow: 0 0 0 1px ${props => props.theme.colors.pop03};
    outline: 0;
  }

  &[disabled] {
    background: ${props => props.theme.colors.neutral07};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span<IconWrapperProps>`
  left: ${props => (props.iconPosition === 'left' ? '10px' : 'auto')};
  right: ${props => (props.iconPosition === 'right' ? '10px' : 'auto')};
  color: ${props => props.theme.colors.neutral02};
  position: absolute;
  margin-top: -9px;
  top: 50%;
`;

const PasswordMaskWrapper = styled.span`
  left: auto;
  right: 10px;
  position: absolute;
  margin-top: -23px;
  top: 50%;
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 19;
    case 'small':
      return 15;
    default:
      return 17;
  }
}

export const Input: React.FunctionComponent<InputProps> = React.forwardRef(
  (props: InputProps, ref: any) => (
    <InputCore
      id={props.id}
      value={props.value}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
    >
      {({
        id,
        onBlur,
        onChange,
        onFocus,
        value,
        togglePasswordShown,
        passwordShown
      }) => {
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
          iconPosition,
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
          ...other
        } = props;

        const HIDDEN_PASSWORD_ANNOUCNE_TEXT = hiddenPasswordAnnounceText
            ? hiddenPasswordAnnounceText
            : 'Password is now hidden',
          HIDE_PASSWORD_BUTTON_ARIA_LABEL = hidePasswordButtonAriaLabel
            ? hidePasswordButtonAriaLabel
            : 'Hide password',
          HIDE_PASSWORD_BUTTON_TEXT = hidePasswordButtonText
            ? hidePasswordButtonText
            : 'Hide',
          SHOWN_PASSWORD_ANNOUCNE_TEXT = shownPasswordAnnounceText
            ? shownPasswordAnnounceText
            : 'Password is now visible',
          SHOW_PASSWORD_BUTTON_ARIA_LABEL = showPasswordButtonAriaLabel
            ? showPasswordButtonAriaLabel
            : 'Show password. Note: this will visually expose your password on the screen',
          SHOW_PASSWORD_BUTTON_TEXT = showPasswordButtonText
            ? showPasswordButtonText
            : 'Show',
          HELP_LINK_TEXT = helpLinkText ? helpLinkText : "What's this?";

        const descriptionId =
          errorMessage || helperMessage ? `${id}__desc` : null;

        return (
          <ThemeContext.Consumer>
            {theme => (
              <Container style={containerStyle}>
                {!labelVisuallyHidden && (
                  <Label inverse={inverse} htmlFor={id} style={labelStyle}>
                    {labelText}
                  </Label>
                )}
                <InputWrapper>
                  <StyledInput
                    {...other}
                    aria-describedby={descriptionId}
                    aria-label={labelVisuallyHidden ? labelText : null}
                    as={multiline ? 'textarea' : null}
                    id={id}
                    data-testid={testId}
                    errorMessage={errorMessage}
                    iconPosition={iconPosition}
                    inputSize={inputSize ? inputSize : EnumInputSize.medium}
                    labelText={labelText}
                    multiline={multiline}
                    ref={ref}
                    style={inputStyle}
                    theme={theme}
                    type={
                      type
                        ? type === EnumInputType.password && passwordShown
                          ? EnumInputType.text
                          : type
                        : EnumInputType.text
                    }
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                  />
                  {icon && (
                    <IconWrapper iconPosition={iconPosition} theme={theme}>
                      {React.Children.only(
                        React.cloneElement(icon, {
                          size: getIconSize(inputSize)
                        })
                      )}
                    </IconWrapper>
                  )}
                  {type === EnumInputType.password && !hidePasswordMaskButton && (
                    <PasswordMaskWrapper>
                      <Button
                        ariaLabel={
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
                        type={EnumButtonType.button}
                        variant={EnumButtonVariant.link}
                      >
                        {passwordShown
                          ? HIDE_PASSWORD_BUTTON_TEXT
                          : SHOW_PASSWORD_BUTTON_TEXT}
                      </Button>
                      <VisuallyHidden>
                        <Announce>
                          {passwordShown
                            ? SHOWN_PASSWORD_ANNOUCNE_TEXT
                            : HIDDEN_PASSWORD_ANNOUCNE_TEXT}
                        </Announce>
                      </VisuallyHidden>
                    </PasswordMaskWrapper>
                  )}
                  {onHelpLinkClick && (
                    <Tooltip
                      content={HELP_LINK_TEXT}
                      trigger={
                        <Button
                          ariaLabel={HELP_LINK_TEXT}
                          icon={<QuestionCircleIcon />}
                          inverse={inverse}
                          onClick={onHelpLinkClick}
                          style={{ margin: '0 0 0 7px' }}
                          title={HELP_LINK_TEXT}
                          variant={EnumButtonVariant.link}
                        />
                      }
                    />
                  )}
                </InputWrapper>

                {(errorMessage || helperMessage) && (
                  <InputMessage
                    inverse={inverse}
                    id={descriptionId}
                    isError={!!errorMessage}
                  >
                    {errorMessage ? errorMessage : helperMessage}
                  </InputMessage>
                )}
              </Container>
            )}
          </ThemeContext.Consumer>
        );
      }}
    </InputCore>
  )
);
