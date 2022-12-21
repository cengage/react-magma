import * as React from 'react';
import styled from '../../theme/styled';

import { ButtonColor, ButtonSize } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import {
  ToggleButtonStyles,
  ToggleButton,
  ToggleButtonProps,
} from './ToggleButton';

/**
 * @children required
 */
export interface ToggleButtonGroupProps
  extends Omit<
    React.HTMLAttributes<HTMLButtonElement>,
    'isDefault' | 'isChecked'
  > {
  isChecked?: boolean;
  isDefault?: boolean;
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
  isChecked?: boolean;
  singleSelect?: boolean;
  size?: ButtonSize;
}

export const ToggleButtonGroupContext =
  React.createContext<ToggleButtonGroupContextInterface>({});

const SingleSelectWrapper = styled.div<{
  isDefault?: boolean;
  isInverse?: boolean;
  requiredSelect?: boolean;
  isChecked?: boolean;
  singleSelect?: boolean;
  size?: ButtonSize;
  value?: any;
}>`
  button {
    ${ToggleButtonStyles};
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

  const [isSelected, setSelected] = React.useState(null);

  const [isDefault, setDefault] = React.useState(null);

  const ToggleButtons = React.Children.map(children, (child, index) => {
    const item = child as React.ReactElement<
      React.PropsWithChildren<ToggleButtonProps>
    >;

    const disabledButton = item.props.disabled;

    // const checkedButton = item.props.isChecked;

    const handleClick = () => {
      if (requiredSelect && !disabledButton && singleSelect) {
        //Retains at least one selection for single select
        setSelected(s => (s === index ? index : index));
      } else if (!disabledButton) {
        //Allows single select to be deselected
        setSelected(s => (s === index ? null : index));
      }
      if (handleClick && !disabledButton) {
        //Removes a default selection state on click
        setDefault(true);
      }
    };

    if (item.type === ToggleButton && props.singleSelect) {
      return (
        <SingleSelectWrapper
          key={index}
          onClick={handleClick}
          isDefault={isDefault}
          isInverse={isInverse}
          requiredSelect={singleSelect ? isSelected === index : null}
          isChecked={isSelected === index}
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
