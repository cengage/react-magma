import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Select } from '.';

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

  it('should not select an item when typing and select is closed', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, { key: 'r' });

    expect(getByTestId('selectedItemText').textContent).not.toEqual(items[0]);
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
      <Select labelText={labelText} items={items} isDisabled />
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

    expect(queryByText(items[0])).not.toBeInTheDocument();
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
