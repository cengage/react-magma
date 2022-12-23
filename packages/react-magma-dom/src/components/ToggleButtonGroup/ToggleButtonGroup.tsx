import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';

import { ButtonColor, ButtonSize } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { ToggleButton, ToggleButtonProps } from '../ToggleButton/ToggleButton';
import { transparentize } from 'polished';

/**
 * @children required
 */
export interface ToggleButtonGroupProps {
  isInverse?: boolean;
  /**
   * Removes margins between buttons and applies a uniform border around the group.
   */
  noSpace?: boolean;
  /**
   * Enables a radio configuration throughout the group retaining an active selection at all times.
   */

  requiredSelect?: boolean;
  /**
   * Sets the Toggle Button group to have only one active selection.
   */
  singleSelect?: boolean;
  /**
   * Changes the button sizes throughout the group between 'small', 'medium', and 'large'.
   */
  size?: ButtonSize;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface ToggleButtonGroupContextInterface {
  isDefault?: boolean;
  isInverse?: boolean;
  requiredSelect?: boolean;
  singleSelect?: boolean;
  size?: ButtonSize;
}

export const ToggleButtonGroupContext =
  React.createContext<ToggleButtonGroupContextInterface>({});

//Sets the icon width for icon only Toggle Buttons.
export function setIconWidth(props: ToggleButtonProps) {
  if (props.size === ButtonSize.small) {
    return props.theme.spaceScale.spacing07;
  }
  if (props.size === ButtonSize.medium) {
    return props.theme.spaceScale.spacing09;
  }
  if (props.size === ButtonSize.large) {
    return props.theme.spaceScale.spacing11;
  }
  return props.theme.spaceScale.spacing09;
}

//Sets the background colors for the Toggle Buttons.
function setBackgroundColor(props) {
  //Removes active background color.
  if (
    (props.isChecked && props.defaultChecked) ||
    (!props.isChecked && props.isDefault)
  ) {
    return '';
  }
  //Sets active background color.
  if (props.isChecked || props.defaultChecked || props.isDefault) {
    if (props.isInverse) {
      return transparentize(0.5, props.theme.colors.neutral900);
    }
    return transparentize(0.5, props.theme.colors.neutral300);
  }
}

export const setButtonStyles = props => css`
  background: ${setBackgroundColor(props)};
  &:not(:disabled):hover {
    background: ${setBackgroundColor(props)};
  }
  &:not(:disabled):focus {
    background: ${setBackgroundColor(props)};
    outline-offset: -2px;
  }
  &:hover {
    background: ${setBackgroundColor(props)};
  }
`;

const SingleSelectWrapper = styled.div<{
  isInverse?: boolean;
  requiredSelect?: boolean;
  isChecked?: boolean;
  singleSelect?: boolean;
  size?: ButtonSize;
}>`
  button {
    ${setButtonStyles};
  }
`;

export const ToggleButtonGroup = React.forwardRef<
  HTMLDivElement,
  ToggleButtonGroupProps
>((props, ref) => {
  const {
    children,
    isInverse,
    testId,
    noSpace,
    requiredSelect,
    singleSelect,
    size,
  } = props;
  const theme = React.useContext(ThemeContext);

  // Sets the active state for the Toggle Button
  const [isChecked, setChecked] = React.useState(null);

  // Checks if defaultChecked is active then toggles it off based on clicking other Toggle Buttons or the one with defaultChecked set.
  const [isDefault, setDefault] = React.useState(null);

  const ToggleButtons = React.Children.map(children, (child, index) => {
    const item = child as React.ReactElement<
      React.PropsWithChildren<ToggleButtonProps>
    >;

    const disabledButton = item.props.disabled;

    const handleClick = () => {
      if (requiredSelect && !disabledButton && singleSelect) {
        //Retains at least one selection for single select
        setChecked(s => (s === index ? index : index));
      } else if (!disabledButton) {
        //Allows single select to be deselected
        setChecked(s => (s === index ? null : index));
      }
      if (!disabledButton) {
        //Removes a default selection state on click
        setDefault(true);
      }
    };

    if (item.type === ToggleButton && props.singleSelect) {
      return (
        <SingleSelectWrapper
          key={index}
          onClick={handleClick}
          isInverse={isInverse}
          requiredSelect={singleSelect ? isChecked === index : null}
          isChecked={isChecked === index}
          singleSelect={singleSelect}
          size={size}
          theme={theme}
        >
          {item}
        </SingleSelectWrapper>
      );
    }
    return child;
  });

  return (
    <ButtonGroup
      aria-describedby="Toggle button group"
      color={ButtonColor.subtle}
      noSpace={noSpace}
      testId={testId}
      isInverse={isInverse}
      theme={theme}
      ref={ref}
      role="group"
      size={size}
    >
      <ToggleButtonGroupContext.Provider
        value={{
          isDefault,
          isInverse,
          requiredSelect,
          singleSelect,
          size,
        }}
      >
        {ToggleButtons}
      </ToggleButtonGroupContext.Provider>
    </ButtonGroup>
  );
});
