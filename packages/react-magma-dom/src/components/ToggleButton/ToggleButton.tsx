import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { XOR } from '../../utils';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { Button, ButtonProps, ButtonSize } from '../Button';
import { ButtonColor } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';
import {
  ToggleButtonGroupContext,
  setButtonStyles,
  setIconWidth,
} from '../ToggleButtonGroup/ToggleButtonGroup';

export interface ToggleButtonTextProps extends ButtonProps {
  /**
   * Enables a specified button to be active.
   */
  defaultChecked?: boolean;
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  isChecked?: boolean;
  isInverse?: boolean;

  /**
   * Changes the button size throughout the group between 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface ToggleButtonIconProps extends ButtonProps {
  /**
   * Sets the aria-label which is required for icon only buttons.
   */
  'aria-label'?: string;
  /**
   * Enables a specified button to be active.
   */
  defaultChecked?: boolean;
  /**
   * Sets a disabled state for a button.
   */
  disabled?: boolean;
  hasLabel?: boolean;
  /**
   * Icon which displays alongside text.
   */
  icon: React.ReactElement<IconProps>;
  isChecked?: boolean;
  isInverse?: boolean;
  /**
   * Changes the button size throughout the group between 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
}

export type ToggleButtonProps = XOR<
  ToggleButtonTextProps,
  ToggleButtonIconProps
>;

//Background colors for the different button states.
export const ToggleButtonStyles = props => css`
  ${setButtonStyles(props)};
`;
const StyledToggleButtonIcon = styled(IconButton)`
  ${ToggleButtonStyles}
  min-width: auto;
  width: ${props => (!props.hasLabel ? setIconWidth : '')};
  span {
    padding: ${props => (!props.hasLabel ? 0 : '')};
  }
`;

const StyledToggleButtonText = styled(Button)`
  ${ToggleButtonStyles}
`;

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const {
    'aria-label': ariaLabel,
    children,
    defaultChecked,
    disabled,
    icon,
    isInverse,
    testId,
  } = props;

  const context = React.useContext(ToggleButtonGroupContext);

  const theme = React.useContext(ThemeContext);

  const [isChecked, setChecked] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick &&
      typeof props.onClick === 'function' &&
      props.onClick(event);

    if (!context.singleSelect) {
      if (isChecked) {
        setChecked(false);
      } else if (!isChecked) {
        setChecked(true);
      }
    }
  };

  return (
    <>
      {icon ? (
        <StyledToggleButtonIcon
          aria-checked={isChecked}
          aria-label={ariaLabel}
          color={ButtonColor.subtle}
          defaultChecked={defaultChecked}
          disabled={disabled}
          enforcedSelect={context.enforcedSelect}
          theme={theme}
          hasLabel={children ? true : null}
          icon={icon}
          isChecked={isChecked}
          isDefault={context.isDefault}
          isInverse={context.isInverse || isInverse}
          onClick={handleClick}
          ref={ref}
          requiredSelect={context.requiredSelect}
          role="switch"
          singleSelect={context.singleSelect}
          size={context.size || props.size}
          testId={testId}
        >
          <>
            {children}
            {console.log(context.enforcedSelect)}
          </>
        </StyledToggleButtonIcon>
      ) : (
        <StyledToggleButtonText
          aria-checked={isChecked}
          color={ButtonColor.subtle}
          defaultChecked={defaultChecked}
          disabled={disabled}
          enforcedSelect={context.enforcedSelect}
          theme={theme}
          isChecked={isChecked}
          isDefault={context.isDefault}
          isInverse={context.isInverse || isInverse}
          onClick={handleClick}
          ref={ref}
          requiredSelect={context.requiredSelect}
          role="switch"
          singleSelect={context.singleSelect}
          size={context.size || props.size}
          testId={testId}
        >
          {children}
        </StyledToggleButtonText>
      )}
    </>
  );
});
