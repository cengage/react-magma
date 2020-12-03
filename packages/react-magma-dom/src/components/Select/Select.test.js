import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Select } from '.';
import { defaultI18n } from '../../i18n/default';

describe('Select', () => {
  it('should render a select with items', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    fireEvent.click(renderedSelect);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should render a select with a passed in placeholder', () => {
    const labelText = 'Label';
    const placeholder = 'Test';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <Select labelText={labelText} items={items} placeholder={placeholder} />
    );

    expect(getByText(placeholder)).toBeInTheDocument();
  });

  it('should render a select with the default i18n placeholder', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    expect(getByText(defaultI18n.select.placeholder)).toBeInTheDocument();
  });

  it('should accept items in the default object format', () => {
    const labelText = 'Label';
    const items = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ];
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
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

    const labelText = 'Label';
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
      <Select labelText={labelText} items={items} itemToString={itemToString} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should render custom item component', () => {
    const labelText = 'Label';
    const testId = 'test';
    const items = [
      { id: '0', label: 'Red', value: 'red' },
      { id: '1', label: 'Blue', value: 'blue' },
      { id: '2', label: 'Green', value: 'green' },
    ];
    const renderItem = props => {
      const { isFocused, item, itemString, ...other } = props;

      return (
        <li {...other} data-testid={item.id}>
          {itemString}
        </li>
      );
    };
    const { getByLabelText, getByText, getByTestId } = render(
      <Select labelText={labelText} items={items} renderItem={renderItem} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should not select an item when typing and select is closed', () => {
    // Use fake timers here for downshift's debounce on input change.
    jest.useFakeTimers();
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, { key: 'r' });

    act(() => jest.runAllTimers());

    expect(getByTestId('selectedItemText').textContent).not.toEqual(items[0]);

    jest.useRealTimers();
  });

  it('should allow for selection of an item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[0]));

    expect(getByTestId('selectedItemText').textContent).toEqual(items[0]);
  });

  it('should call the passed in onIsOpenChange function on select open', () => {
    const onIsOpenChange = jest.fn();
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Select
        labelText={labelText}
        items={items}
        onIsOpenChange={onIsOpenChange}
      />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    expect(onIsOpenChange).toHaveBeenCalled();
  });

  it('should allow for a controlled select', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    let selectedItem = 'Red';
    const { getByLabelText, getByText, getByTestId, rerender } = render(
      <Select
        labelText={labelText}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={changes => (selectedItem = changes.selectedItem)}
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[1]));

    expect(selectedItem).toEqual(items[1]);

    rerender(
      <Select
        labelText={labelText}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={changes => (selectedItem = changes.selectedItem)}
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual(items[1]);
  });

  it('should have an initial selected item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} initialSelectedItem="Red" />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');
  });

  it('should not select an item that is not in the items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} selectedItem="Pink" />
    );

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should not use the initial selected item if it is not in the items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} initialSelectedItem="Pink" />
    );

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should disable the select', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Select labelText={labelText} items={items} disabled />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toHaveAttribute('disabled');
  });

  it('should allow a selection to be cleared', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Red');

    expect(getByTestId('selectTriggerButton')).toHaveFocus();
  });

  it('should select the default selected item when cleared', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        defaultSelectedItem="Blue"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).toEqual('Blue');
  });

  it('should not select the default selected item when cleared if it is not in the items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        defaultSelectedItem="Pink"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should open select when clicking the enter key', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: 'Enter',
    });

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should open select when clicking the spacebar', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: ' ',
    });

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should not open select when clicking another key other than the enter or spacebar', () => {
    // Use fake timers here for downshift's debounce on input change.
    jest.useFakeTimers();
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, queryByText } = render(
      <Select labelText={labelText} items={items} />
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
    const labelText = 'Label';
    const errorMessage = 'This is an error';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <Select labelText={labelText} items={items} errorMessage={errorMessage} />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show an helper message', () => {
    const labelText = 'Label';
    const helperMessage = 'This is an error';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <Select
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    expect(getByText(helperMessage)).toBeInTheDocument();
  });

  it('should allow you to send in your own components', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const ClearIndicator = () => (
      <button data-testid="customClearIndicator">Clear</button>
    );

    const { getByTestId } = render(
      <Select
        labelText={labelText}
        isClearable
        items={items}
        selectedItem={items[0]}
        components={{
          ClearIndicator,
        }}
      />
    );

    expect(getByTestId('customClearIndicator')).toBeInTheDocument();
  });

  describe('events', () => {
    it('onBlur', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onBlur = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onBlur={onBlur} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      renderedSelect.focus();

      fireEvent.blur(renderedSelect);

      expect(onBlur).toHaveBeenCalled();
    });

    it('onFocus', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onFocus = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onFocus={onFocus} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      renderedSelect.focus();

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onKeyDown = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onKeyDown={onKeyDown} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      fireEvent.keyDown(renderedSelect, { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onKeyUp = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onKeyUp={onKeyUp} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      fireEvent.keyUp(renderedSelect, { key: 'Enter' });

      expect(onKeyUp).toHaveBeenCalled();
    });
  });
});
