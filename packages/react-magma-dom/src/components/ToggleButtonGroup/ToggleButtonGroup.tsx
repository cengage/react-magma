import * as React from 'react';
import styled from '../../theme/styled';

import { ButtonColor, ButtonSize } from '../Button';
import { ButtonGroup, ButtonGroupProps } from '../ButtonGroup';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import {
  setBackgroundColor,
  ToggleButton,
  ToggleButtonProps,
} from '../ToggleButton/ToggleButton';

/**
 * @children required
 */
export interface ToggleButtonGroupProps extends ButtonGroupProps {
  isInverse?: boolean;
  /**
   * Enables a radio configuration throughout the group retaining an active selection at all times.
   */
  enforced?: boolean;
  /**
   * Sets the Toggle Button group to have only one active selection.
   */
  exclusive?: boolean;
  /**
   * @internal
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;

  value?: string;
}

export interface ToggleButtonGroupContextInterface {
  selectedValue?: string;
  isInverse?: boolean;
  enforced?: boolean;
  exclusive?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: ButtonSize;
}

export const ToggleButtonGroupContext =
  React.createContext<ToggleButtonGroupContextInterface>({});

export const StyledToggleButtonGroup = styled(ButtonGroup)<{
  onChange?: (event: React.ChangeEvent<HTMLDivElement>) => void;
}>``;

const StyledWrapper = styled.div<{
  isInverse?: boolean;
  enforced?: boolean;
  selected?: boolean;
  exclusive?: boolean;
  size?: ButtonSize;
  value?: string;
}>`
  button {
    background: ${props => (props.selected ? setBackgroundColor : '')};
    &:not(:disabled):hover {
      background: ${props => (props.selected ? setBackgroundColor : '')};
    }
    &:not(:disabled):focus {
      background: ${props => (props.selected ? setBackgroundColor : '')};
      outline-offset: -2px;
    }
    &:hover {
      background: ${setBackgroundColor};
    }
  }
`;

export const ToggleButtonGroup = React.forwardRef<
  HTMLDivElement,
  ToggleButtonGroupProps
>((props, ref) => {
  const {
    children,
    enforced,
    exclusive,
    isInverse,
    noSpace,
    size,
    value,
    testId,
  } = props;
  const theme = React.useContext(ThemeContext);

  // Sets the active state for the Toggle Button
  const [selected, setSelected] = React.useState(null);

  // Sets a specific selected state with the value prop.
  const [selectedValue, setSelectedValue] = React.useState<string>(props.value);

  React.useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: newSelectedValue } = event.target;
    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);
    setSelectedValue(newSelectedValue);
  }

  const ToggleButtons = React.Children.map(children, (child, index) => {
    const item = child as React.ReactElement<
      React.PropsWithChildren<ToggleButtonProps>
    >;

    const disabledButton = item.props.disabled;

    const handleClick = () => {
      if (enforced && !disabledButton && exclusive) {
        //Retains at least one selection for single select
        setSelected(s => (s === index ? index : index));
      } else if (!disabledButton) {
        //Allows single select to be deselected
        setSelected(s => (s === index ? null : index));
      }
      if (!disabledButton) {
        //Removes the specific selected state
        setSelectedValue(null);
      }
    };

    if (item.type === ToggleButton && props.exclusive) {
      return (
        <StyledWrapper
          key={index}
          onChange={handleChange}
          onClick={handleClick}
          isInverse={isInverse}
          enforced={exclusive ? selected === index : null}
          selected={selected === index}
          exclusive={exclusive}
          size={size}
          theme={theme}
          value={value}
        >
          {item}
        </StyledWrapper>
      );
    }
    return child;
  });

  return (
    <StyledToggleButtonGroup
      aria-describedby="Toggle button group"
      color={ButtonColor.subtle}
      isInverse={isInverse}
      noSpace={noSpace}
      onChange={handleChange}
      ref={ref}
      role="group"
      size={size}
      testId={testId}
      theme={theme}
    >
      <ToggleButtonGroupContext.Provider
        value={{
          selectedValue,
          isInverse,
          enforced,
          exclusive,
          onChange: handleChange,
          size,
        }}
      >
        {ToggleButtons}
      </ToggleButtonGroupContext.Provider>
    </StyledToggleButtonGroup>
  );
});
