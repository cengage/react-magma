import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Select as MultiSelect } from '.';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { Modal } from '../Modal';

describe('Select', () => {
  const items = ['Red', 'Blue', 'Green'];
  const labelText = 'Label';

  it('should render a multi-select with items', () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    fireEvent.click(renderedSelect);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should render a select with a passed in placeholder', () => {
    const placeholder = 'Test';

    const { getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        placeholder={placeholder}
      />
    );

    expect(getByText(placeholder)).toBeInTheDocument();
  });

  it('should render a select with the default i18n placeholder', () => {
    const { getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    expect(getByText(defaultI18n.multiSelect.placeholder)).toBeInTheDocument();
  });

  it('should accept items in the default object format', () => {
    const items = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ];
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
  });

  it('should accept items in a custom item format', () => {
    function itemToString(item) {
      return item ? item.representation : '';
    }

    const items = [
      {
        id: 1,
        actual: 'red',
        representation: 'Red',
      },
      {
        id: 2,
        actual: 'blue',
        representation: 'Blue',
      },
      {
        id: 3,
        actual: 'green',
        representation: 'Green',
      },
    ];

    const { getByLabelText, getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        itemToString={itemToString}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should render an items list with the default max height', () => {
    const { container, getByLabelText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', () => {
    const maxHeight = '100px';
    const { container, getByLabelText } = render(
      <MultiSelect
        isMulti
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      maxHeight
    );
  });

  it('Should have a defined width for label when labelPosition is "left"', () => {
    const { getByText } = render(
      <MultiSelect
        isMulti
        items={items}
        labelPosition="left"
        labelText={labelText}
        labelWidth={20}
      />
    );
    expect(getByText(labelText)).toHaveStyle('flex-basis: 20%');
  });

  it('should render an items list with the passed in max height as a number', () => {
    const maxHeight = 50;
    const { container, getByLabelText } = render(
      <MultiSelect
        isMulti
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      `${maxHeight}px`
    );
  });

  it('should render custom item component', () => {
    const items = [
      { id: '0', label: 'Red', value: 'red' },
      { id: '1', label: 'Blue', value: 'blue' },
      { id: '2', label: 'Green', value: 'green' },
    ];
    const CustomItem = props => {
      const { itemRef, item, itemString } = props;

      return (
        <li data-testid={item.id} ref={itemRef}>
          {itemString}
        </li>
      );
    };
    const { getByLabelText, getByText, getByTestId } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        components={{ Item: CustomItem }}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should not select an item when typing and select is closed', () => {
    // Use fake timers here for downshift's debounce on input change.
    jest.useFakeTimers();

    const { getByLabelText, queryByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, { key: 'r' });

    act(() => jest.runAllTimers());

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should allow for selection of multiple items', () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[0]));

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[1]));

    expect(getByText(items[0], { selector: 'button' }).textContent).toEqual(
      items[0]
    );
    expect(getByText(items[1], { selector: 'button' }).textContent).toEqual(
      items[1]
    );
  });

  it('should allow for the removal of a selected item', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[0]));

    fireEvent.click(getByText(items[0], { selector: 'button' }));

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should allow for the removal of selected items with the keyboard', () => {
    const selectedItems = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, queryByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={selectedItems}
      />
    );

    const renderedMultiSelect = getByLabelText(labelText, { selector: 'div' });

    renderedMultiSelect.focus();

    fireEvent.keyDown(renderedMultiSelect, { key: 'Backspace' });

    expect(
      queryByText(items[2], { selector: 'button' })
    ).not.toBeInTheDocument();

    const selectedItem1 = getByText(items[1]);

    selectedItem1.focus();

    fireEvent.keyDown(selectedItem1, { key: 'Backspace' });

    expect(
      queryByText(items[1], { selector: 'button' })
    ).not.toBeInTheDocument();

    const selectedItem2 = getByText(items[0]);

    selectedItem2.focus();

    fireEvent.keyDown(selectedItem2, { key: 'Delete' });

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should change the focused selected item using arrow keys', () => {
    const selectedItems = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={selectedItems}
      />
    );

    const renderedMultiSelect = getByLabelText(labelText, { selector: 'div' });

    renderedMultiSelect.focus();

    fireEvent.keyDown(renderedMultiSelect, { key: 'ArrowLeft' });

    expect(document.activeElement).toEqual(getByText(items[2]));

    fireEvent.keyDown(getByText(items[2]), { key: 'ArrowLeft' });

    expect(document.activeElement).toEqual(getByText(items[1]));

    fireEvent.keyDown(getByText(items[1]), { key: 'ArrowRight' });

    expect(document.activeElement).toEqual(getByText(items[2]));

    fireEvent.keyDown(getByText(items[2]), { key: 'ArrowRight' });

    expect(document.activeElement).toEqual(renderedMultiSelect);
  });

  it('should allow for a controlled multi-select', () => {
    let selectedItems = ['Red', 'Blue'];
    const { getByLabelText, getByText, queryByText, rerender } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={changes =>
          (selectedItems = changes.selectedItems)
        }
        onRemoveSelectedItem={removedItem =>
          (selectedItems = selectedItems.filter(item => item !== removedItem))
        }
      />
    );

    expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
    expect(getByText(items[1], { selector: 'button' })).toBeInTheDocument();

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[2]));

    expect(selectedItems).toEqual(items);

    rerender(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={changes =>
          (selectedItems = changes.selectedItems)
        }
        onRemoveSelectedItem={removedItem =>
          (selectedItems = selectedItems.filter(item => item !== removedItem))
        }
      />
    );

    expect(getByText(items[2], { selector: 'button' })).toBeInTheDocument();

    fireEvent.click(getByText(items[0], { selector: 'button' }));

    const [, ...restOfItems] = items;

    expect(selectedItems).toEqual(restOfItems);

    rerender(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={changes =>
          (selectedItems = changes.selectedItems)
        }
        onRemoveSelectedItem={removedItem =>
          (selectedItems = selectedItems.filter(item => item !== removedItem))
        }
      />
    );

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should have an initial selected items', () => {
    const { getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={items}
      />
    );

    expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
    expect(getByText(items[1], { selector: 'button' })).toBeInTheDocument();
    expect(getByText(items[2], { selector: 'button' })).toBeInTheDocument();
  });

  it('should disable the multi-select', () => {
    const { getByLabelText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} disabled />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toHaveAttribute('disabled');
  });

  it('should open select when clicking the enter key', () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: 'Enter',
    });

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should open select when clicking the spacebar', () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: ' ',
    });

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should close the menu when escape key is pressed, and retain the active modal', () => {
    const { getByLabelText, getByText, getByTestId, queryByText } = render(
      <Modal testId="modal" isOpen>
        <MultiSelect isMulti labelText={labelText} items={items} />
      </Modal>
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: ' ',
    });

    expect(getByText(items[0])).toBeInTheDocument();

    fireEvent.keyDown(getByLabelText(labelText, { selector: 'div' }), {
      key: 'Escape',
      code: 27,
    });

    expect(queryByText(items[0], { selector: 'Red' })).not.toBeInTheDocument();

    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should not open select when clicking another key other than the enter or spacebar', () => {
    // Use fake timers here for downshift's debounce on input change.
    jest.useFakeTimers();

    const { getByLabelText, queryByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: 'a',
    });

    act(() => jest.runAllTimers());

    expect(queryByText(items[0])).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should show an error message', () => {
    const errorMessage = 'This is an error';

    const { getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        errorMessage={errorMessage}
      />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show an helper message', () => {
    const helperMessage = 'This is an error';

    const { getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    expect(getByText(helperMessage)).toBeInTheDocument();
  });

  describe('events', () => {
    it('onBlur', () => {
      const onBlur = jest.fn();

      const { getByLabelText } = render(
        <MultiSelect
          isMulti
          labelText={labelText}
          items={items}
          onBlur={onBlur}
        />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      renderedSelect.focus();

      fireEvent.blur(renderedSelect);

      expect(onBlur).toHaveBeenCalled();
    });

    it('onFocus', () => {
      const onFocus = jest.fn();

      const { getByLabelText } = render(
        <MultiSelect
          isMulti
          labelText={labelText}
          items={items}
          onFocus={onFocus}
        />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      renderedSelect.focus();

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', () => {
      const onKeyDown = jest.fn();

      const { getByLabelText } = render(
        <MultiSelect
          isMulti
          labelText={labelText}
          items={items}
          onKeyDown={onKeyDown}
        />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      fireEvent.keyDown(renderedSelect, { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', () => {
      const onKeyUp = jest.fn();

      const { getByLabelText } = render(
        <MultiSelect
          isMulti
          labelText={labelText}
          items={items}
          onKeyUp={onKeyUp}
        />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      fireEvent.keyUp(renderedSelect, { key: 'Enter' });

      expect(onKeyUp).toHaveBeenCalled();
    });
  });
});
