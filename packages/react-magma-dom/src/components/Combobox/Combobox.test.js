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

  it('should call the passed in onIsOpenChange function on combobox open', () => {
    const onIsOpenChange = jest.fn();
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        onIsOpenChange={onIsOpenChange}
      />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'input' }));

    expect(onIsOpenChange).toHaveBeenCalled();
  });

  it('should allow for a controlled combobox', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    let selectedItem = 'Red';
    const { getByLabelText, getByText, rerender } = render(
      <Combobox
        labelText={labelText}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={changes => (selectedItem = changes.selectedItem)}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox.value).toEqual('Red');

    fireEvent.click(renderedCombobox);

    fireEvent.click(getByText(items[1]));

    expect(selectedItem).toEqual(items[1]);

    rerender(
      <Combobox
        labelText={labelText}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={changes => (selectedItem = changes.selectedItem)}
      />
    );

    expect(renderedCombobox.value).toEqual(items[1]);
  });

  it('should allow for the creation of an item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} initialSelectedItem="Red" />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'Yellow' } });

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();
    fireEvent.click(createItem);

    expect(renderedCombobox.value).toEqual('Yellow');
  });

  it('should allow for creation of a custom item', () => {
    function itemToString(item) {
      return item ? item.representation : '';
    }

    function newItemTransform(item) {
      const { value } = item;

      return {
        id: 'abc123',
        name: value,
        representation: value.charAt(0).toUpperCase() + value.slice(1)
      };
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
        defaultItems={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'Yellow' } });

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();
    fireEvent.click(createItem);

    expect(renderedCombobox.value).toEqual('Yellow');
  });

  it('should allow for creation of a custom item with controlled items', () => {
    let selectedItem = '';
    let items = [
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
    const labelText = 'Label';

    function itemToString(item) {
      return item ? item.representation : '';
    }

    function newItemTransform(item) {
      const { value } = item;

      return {
        id: 'abc123',
        name: value,
        representation: value.charAt(0).toUpperCase() + value.slice(1)
      };
    }

    function handleSelectedItemChange(changes) {
      selectedItem = changes.selectedItem;
    }

    function handleItemCreated(newItem) {
      selectedItem = newItem;
      items = [...items, newItem];
    }

    const { getByLabelText, getByText, rerender } = render(
      <Combobox
        labelText={labelText}
        items={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
        onItemCreated={handleItemCreated}
        onSelectedItemChange={handleSelectedItemChange}
        selectedItem={selectedItem}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'Yellow' } });

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();
    fireEvent.click(createItem);

    expect(selectedItem.representation).toEqual('Yellow');

    rerender(
      <Combobox
        labelText={labelText}
        items={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
        onItemCreated={handleItemCreated}
        onSelectedItemChange={handleSelectedItemChange}
        selectedItem={selectedItem}
      />
    );

    expect(renderedCombobox.value).toEqual('Yellow');

    fireEvent.change(renderedCombobox, { target: { value: 'Y' } });

    expect(getByText('Yellow')).toBeInTheDocument();
  });

  it('should disable the creation of an item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, queryByText } = render(
      <Combobox
        disableCreateItem
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'Yellow' } });

    const createItem = queryByText('Create "Yellow"');

    expect(createItem).not.toBeInTheDocument();
  });

  it('should have an initial selected item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} initialSelectedItem="Red" />
    );

    expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
      'Red'
    );
  });

  it('should not select an item that is not in the items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} selectedItem="Pink" />
    );

    expect(
      getByLabelText(labelText, { selector: 'input' }).textContent
    ).not.toEqual('Pink');
  });

  it('should not use the initial selected item if it is not in the items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        initialSelectedItem="Pink"
      />
    );

    expect(
      getByLabelText(labelText, { selector: 'input' }).textContent
    ).not.toEqual('Pink');
  });

  it('should disable the combobox', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} isDisabled />
    );

    expect(getByLabelText(labelText, { selector: 'input' })).toHaveAttribute(
      'disabled'
    );
  });

  it('should allow a selection to be cleared', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        isClearable
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox.value).toEqual('Red');

    fireEvent.click(getByLabelText(/reset/i));

    expect(renderedCombobox.value).not.toEqual('Red');
  });

  it('should select the default selected item when cleared', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByTestId } = render(
      <Combobox
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        defaultSelectedItem="Blue"
        isClearable
      />
    );

    expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
      'Red'
    );

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
      'Blue'
    );
  });

  it('should not select the default selected item when cleared if it is not in the items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByTestId } = render(
      <Combobox
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        defaultSelectedItem="Pink"
        isClearable
      />
    );

    expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
      'Red'
    );

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByLabelText(labelText, { selector: 'input' }).value).not.toEqual(
      'Pink'
    );
  });

  it('should filter items based on text in the combobox', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, queryByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    expect(getByText('Red')).toBeInTheDocument();
    expect(queryByText('Blue')).not.toBeInTheDocument();
    expect(queryByText('Green')).not.toBeInTheDocument();

    fireEvent.change(renderedCombobox, { target: { value: '' } });

    expect(getByText('Red')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
    expect(getByText('Green')).toBeInTheDocument();
  });

  it('should highlight the first item in the list after typing', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];

    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    expect(getByText('Red')).toHaveAttribute('aria-selected', 'true');
  });

  it('should show an error message', () => {
    const labelText = 'Label';
    const errorMessage = 'This is an error';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        errorMessage={errorMessage}
      />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show an helper message', () => {
    const labelText = 'Label';
    const helperMessage = 'This is an error';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    expect(getByText(helperMessage)).toBeInTheDocument();
  });

  it('should show loading indicator', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByTestId } = render(
      <Combobox labelText={labelText} items={items} isLoading />
    );

    expect(getByTestId('loadingIndicator')).toBeInTheDocument();
  });

  it('should allow you to send in your own components', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const ClearIndicator = () => (
      <button data-testid="customClearIndicator">Clear</button>
    );
    const LoadingIndicator = () => (
      <div data-testid="customLoadingIndicator">loading</div>
    );

    const { getByTestId } = render(
      <Combobox
        labelText={labelText}
        isClearable
        isLoading
        items={items}
        selectedItem={items[0]}
        components={{
          ClearIndicator,
          LoadingIndicator
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
      ``;

      const { getByLabelText } = render(
        <Combobox labelText={labelText} items={items} onInputBlur={onBlur} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      renderedCombobox.focus();

      fireEvent.blur(renderedCombobox);

      expect(onBlur).toHaveBeenCalled();
    });

    it('onBlur should empty input if no selected item', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];

      const { getByLabelText } = render(
        <Combobox labelText={labelText} items={items} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      renderedCombobox.focus();
      fireEvent.change(renderedCombobox, { target: { value: 'yel' } });

      fireEvent.blur(renderedCombobox);

      expect(renderedCombobox.value).toEqual('');
    });

    it('onBlur should give input value of selected item  after input has been changed but nothing new selected', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];

      const { getByLabelText, getByText } = render(
        <Combobox labelText={labelText} items={items} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.click(renderedCombobox);

      fireEvent.click(getByText(items[0]));

      renderedCombobox.focus();
      fireEvent.change(renderedCombobox, { target: { value: 'yel' } });

      fireEvent.blur(renderedCombobox);

      expect(renderedCombobox.value).toEqual(items[0]);
    });

    it('onFocus', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onFocus = jest.fn();

      const { getByLabelText } = render(
        <Combobox labelText={labelText} items={items} onInputFocus={onFocus} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      renderedCombobox.focus();

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onKeyDown = jest.fn();

      const { getByLabelText } = render(
        <Combobox
          labelText={labelText}
          items={items}
          onInputKeyDown={onKeyDown}
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.keyDown(renderedCombobox, { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onKeyUp = jest.fn();

      const { getByLabelText } = render(
        <Combobox labelText={labelText} items={items} onInputKeyUp={onKeyUp} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.keyUp(renderedCombobox, { key: 'Enter' });

      expect(onKeyUp).toHaveBeenCalled();
    });

    it('onInputValueChange', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onInputValueChange = jest.fn();

      const { getByLabelText } = render(
        <Combobox
          labelText={labelText}
          items={items}
          onInputValueChange={onInputValueChange}
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.change(renderedCombobox, { target: { value: 'Red' } });

      expect(onInputValueChange).toBeCalledWith(
        expect.objectContaining({
          inputValue: 'Red'
        }),
        expect.anything(Function)
      );
    });

    it('onInputChange', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onInputChange = jest.fn();

      const { getByLabelText } = render(
        <Combobox
          labelText={labelText}
          items={items}
          onInputChange={onInputChange}
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.change(renderedCombobox, { target: { value: 'Red' } });

      expect(onInputChange).toBeCalledWith(
        expect.objectContaining({
          inputValue: 'Red'
        })
      );
    });
  });
});
