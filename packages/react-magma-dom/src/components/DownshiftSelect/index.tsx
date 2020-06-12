import * as React from 'react';
import {
  useSelect,
  useCombobox,
  UseSelectProps,
  UseComboboxProps
} from 'downshift';
import { XOR } from '../../utils';

export type DownshiftOption = string;

interface InternalSelectInterface {
  labelText: string;
}

export interface DownshiftSelectInterface
  extends UseSelectProps<DownshiftOption>,
    InternalSelectInterface {
  type?: 'select';
}

export interface DownshiftComboboxInterface
  extends UseComboboxProps<DownshiftOption>,
    InternalSelectInterface {
  type: 'combo';
}

export type SelectInterface = XOR<
  DownshiftSelectInterface,
  DownshiftComboboxInterface
>;

export function instanceOfCombobox(
  object: any
): object is DownshiftComboboxInterface {
  return 'type' in object && object.type === 'combo';
}

export const DownshiftSelect = (props: SelectInterface) => {
  const { items, labelText } = props;
  const [inputItems, setInputItems] = React.useState(items);

  function renderSelect() {
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps
    } = useSelect(props as DownshiftSelectInterface);
    return (
      <div>
        <label {...getLabelProps()}>{labelText}</label>
        <button {...getToggleButtonProps()}>
          {selectedItem || 'Select...'}
        </button>
        <ul {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#bde4ff' }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    );
  }

  function renderCombobox() {
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps
    } = useCombobox({
      items: inputItems,
      onInputValueChange: ({ inputValue }) => {
        setInputItems(
          items.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      }
    });
    return (
      <div>
        <label {...getLabelProps()}>Choose an element:</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps()} />
          <button {...getToggleButtonProps()} aria-label="toggle menu">
            &#8595;
          </button>
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#bde4ff' }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return instanceOfCombobox(props) ? renderCombobox() : renderSelect();
};
