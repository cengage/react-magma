import * as React from 'react';

import { ButtonColor, ButtonSize } from '../Button';
import { ButtonGroup, ButtonGroupProps } from '../ButtonGroup';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { ToggleButton, ToggleButtonProps } from '../ToggleButton/ToggleButton';
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface ToggleButtonGroupProps extends ButtonGroupProps {
  /**
   * Description for aria-describedby
   */
  descriptionId?: string;
  /**
   * Enables a radio configuration throughout the group retaining an active selection at all times.
   * @default false
   */
  enforced?: boolean;
  /**
   * Sets the Toggle Button group to have only one active selection.
   * @default false
   */
  exclusive?: boolean;
  isInverse?: boolean;
  /**
   * The onChange handler for managing state of toggle buttons by your custom logic.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;
  /**
   * @internal
   */
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
  selectedValues?: string[];
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

  const defaultSelectedValues = value ? [value] : [];

  // Array of currently selected items
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    defaultSelectedValues
  );

  React.useEffect(() => {
    if (typeof value === 'string') {
      setSelectedValues([value]);
    }
  }, [value]);

  React.useEffect(() => {
    // TODO: remove
    console.log('SELECTED VALUE CHANGED', selectedValues);
  }, [selectedValues]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: newSelectedValue } = event.target;

    const oneBtnSelected = selectedValues.length === 1;
    const newValueAlreadySelected = selectedValues.includes(newSelectedValue);

    if (enforced) {
      if (exclusive) {
        // enforced and exclusive
        if (!newValueAlreadySelected) {
          setSelectedValues([newSelectedValue]);
        }
      } else {
        // enforced, not exclusive
        if (newValueAlreadySelected && !oneBtnSelected) {
          setSelectedValues(selectedValues.filter(i => i !== newSelectedValue));
        } else if (newValueAlreadySelected && oneBtnSelected) {
          setSelectedValues([newSelectedValue]);
        } else {
          setSelectedValues([...selectedValues, newSelectedValue]);
        }
      }
    } else if (exclusive) {
      // exclusive, not enfoced - can have 0 or 1 selected
      if (selectedValues.length === 0) {
        setSelectedValues([newSelectedValue]);
      } else if (newValueAlreadySelected && oneBtnSelected) {
        setSelectedValues(selectedValues.filter(i => i !== newSelectedValue));
      } else if (!newValueAlreadySelected && oneBtnSelected) {
        setSelectedValues([newSelectedValue]);
      }
    } else {
      // not enforced, not exclusive
      if (selectedValues.includes(newSelectedValue)) {
        setSelectedValues(selectedValues.filter(i => i !== newSelectedValue));
      } else {
        setSelectedValues([...selectedValues, newSelectedValue]);
      }
    }

    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event, newSelectedValue);
  }

  const ToggleButtons = React.Children.map(children, (child, index) => {
    const item = child as React.ReactElement<
      React.PropsWithChildren<ToggleButtonProps>
    >;
    if (item.type === ToggleButton && exclusive) {
      return React.cloneElement(item, {
        key: index,
        isChecked: selectedValues.includes(item.props.value?.toString()),
      });
    }
    return child;
  });

  const id = useGenerateId(defaultId);
  const descriptionId = props.descriptionId
    ? props.descriptionId
    : `${id}__desc`;

  return (
    <ButtonGroup
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
          descriptionId,
          selectedValues,
          isInverse,
          enforced,
          exclusive,
          onChange: handleChange,
          size,
        }}
      >
        {ToggleButtons}
      </ToggleButtonGroupContext.Provider>
    </ButtonGroup>
  );
});
