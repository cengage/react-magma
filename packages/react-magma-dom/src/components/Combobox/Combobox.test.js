import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Combobox } from '.';

describe('Combobox', () => {
  it('should render a combobox with items', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toBeInTheDocument();

    fireEvent.click(renderedCombobox);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should accept items in the default object format', () => {
    const labelText = 'Label';
    const items = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' }
    ];
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toBeInTheDocument();

    fireEvent.click(renderedCombobox);

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
        representation: 'Red'
      },
      {
        id: 2,
        actual: 'blue',
        representation: 'Blue'
      },
      {
        id: 3,
        actual: 'green',
        representation: 'Green'
      }
    ];

    const { getByLabelText, getByText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        itemToString={itemToString}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toBeInTheDocument();

    fireEvent.click(renderedCombobox);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should allow for selection of an item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    fireEvent.click(getByText(items[0]));

    expect(renderedCombobox.value).toEqual(items[0]);
  });
});
