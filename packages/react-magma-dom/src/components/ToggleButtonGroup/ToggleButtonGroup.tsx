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
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface ToggleButtonGroupProps extends ButtonGroupProps {
  descriptionId?: string;
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
   * The onChange handler for managing state of toggle buttons by your custom logic.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Value of the toggle button that is the default selected value for the group
   */
  value?: string;
}

export interface ToggleButtonGroupContextInterface {
  ariaChecked?: boolean;
  descriptionId?: string;
  selectedValue?: string;
  isInverse?: boolean;
  enforced?: boolean;
  exclusive?: boolean;
  selected?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;
  size?: ButtonSize;
}

export const ToggleButtonGroupContext =
  React.createContext<ToggleButtonGroupContextInterface>({});

export const StyledToggleButtonGroup = styled(ButtonGroup)<{
  descriptionId?: string;
  onChange?: (event: React.ChangeEvent<HTMLDivElement>) => void;
}>``;

const StyledWrapper = styled.div<{
  ariaChecked?: boolean;
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
    id: defaultId,
    isInverse,
    noSpace,
    onChange,
    size,
    value,
    testId,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);

  // Sets the active state for the Toggle Button
  const [selected, setSelected] = React.useState(null);

  // Sets a specific selected state with the value prop.
  const [selectedValue, setSelectedValue] = React.useState<string>(value);

  // const [checkedActiveIndex, setCheckedActiveIndex] = React.useState(false);
  let checkedActiveIndex;

  React.useEffect(() => {
    console.log('.... selectedValue changed', selectedValue);
    setSelectedValue(value);
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: newSelectedValue } = event.target;
    console.log('value from handle change', newSelectedValue);

    // setSelectedValue(newSelectedValue);
    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event, newSelectedValue);
  }

  const ToggleButtons = React.Children.map(children, (child, index) => {
    const item = child as React.ReactElement<
      React.PropsWithChildren<ToggleButtonProps>
    >;

    const disabledButton = item.props.disabled;

    const handleClickExclusive = () => {
      console.log('selected', selected);
      console.log('selectedValue', selectedValue);

      if (enforced && !disabledButton && exclusive) {
        //Retains at least one selection for single select
        setSelected(prevSelection => (prevSelection === index && index));
      } else if (!disabledButton) {
        //Allows single select to be deselected
        setSelected(prevSelection => {
          console.log('!!!!!!', prevSelection, index);

          return prevSelection === index ? null : index;
        });
      }
      if (!disabledButton) {
        //Removes the specific selected state
        setSelectedValue(null);
      }
    };

    // const activeIndex = selected === index;
    checkedActiveIndex = selected === index;

    if (item.type === ToggleButton && exclusive) {
      return (
        <StyledWrapper
          // aria-checked={activeIndex}
          key={index}
          onClick={handleClickExclusive}
          isInverse={isInverse}
          enforced={exclusive ? checkedActiveIndex : false}
          selected={checkedActiveIndex}
          exclusive={exclusive}
          size={size}
          theme={theme}
        >
          {item}
        </StyledWrapper>
      );
    }
    return child;
  });

  const id = useGenerateId(defaultId);

  const descriptionId = props.descriptionId
    ? props.descriptionId
    : `${id}__desc`;

    // TODO: fix aria checked

  return (
    <StyledToggleButtonGroup
      aria-describedby={descriptionId}
      color={ButtonColor.subtle}
      isInverse={isInverse}
      noSpace={noSpace}
      ref={ref}
      role="group"
      size={size}
      testId={testId}
      theme={theme}
      {...rest}
    >
      <ToggleButtonGroupContext.Provider
        value={{
          ariaChecked: checkedActiveIndex,
          descriptionId,
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
