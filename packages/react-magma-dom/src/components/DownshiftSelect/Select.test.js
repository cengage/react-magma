import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Select } from './Select';

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

  it('should allow a selection to be cleared', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    fireEvent.click(getByLabelText('reset'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Red');
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
      key: 'Enter'
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
      key: ' '
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
      key: 'a'
    });

    expect(queryByText(items[0])).not.toBeInTheDocument();
  });
});
