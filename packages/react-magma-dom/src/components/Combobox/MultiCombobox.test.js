import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Combobox as MultiCombobox } from '.';
import { magma } from '../../theme/magma';

describe('Combobox', () => {
  it('should render a multi-combobox with items', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
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
      { label: 'Green', value: 'green' },
    ];
    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
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
      <MultiCombobox
        isMulti
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

  it('should render an items list with the default max height', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { container, getByLabelText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const maxHeight = '100px';
    const { container, getByLabelText } = render(
      <MultiCombobox
        isMulti
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      maxHeight
    );
  });

  it('should render an items list with the passed in max height as a number', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const maxHeight = 50;
    const { container, getByLabelText } = render(
      <MultiCombobox
        isMulti
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      `${maxHeight}px`
    );
  });

  it('should render custom item component', () => {
    const labelText = 'Label';
    const testId = 'test';
    const items = [
      { id: '0', label: 'Red', value: 'red' },
      { id: '1', label: 'Blue', value: 'blue' },
      { id: '2', label: 'Green', value: 'green' },
    ];
    const CustomItem = props => {
      const { itemRef, isFocused, item, itemString, ...other } = props;

      return (
        <li {...other} data-testid={item.id} ref={itemRef}>
          {itemString}
        </li>
      );
    };
    const { getByLabelText, getByText, getByTestId } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        components={{ Item: CustomItem }}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should allow for selection of multiple items', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    fireEvent.click(getByText(items[0]));

    fireEvent.click(renderedCombobox);

    fireEvent.click(getByText(items[1]));

    expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
    expect(getByText(items[1], { selector: 'button' })).toBeInTheDocument();
  });

  it('should allow for the removal of selected items with the keyboard', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const selectedItems = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, queryByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={selectedItems}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    renderedCombobox.focus();

    fireEvent.keyDown(renderedCombobox, { key: 'Backspace' });

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
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const selectedItems = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={selectedItems}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    renderedCombobox.focus();

    fireEvent.keyDown(renderedCombobox, { key: 'ArrowLeft' });

    expect(document.activeElement).toEqual(getByText(items[2]));

    fireEvent.keyDown(getByText(items[2]), { key: 'ArrowLeft' });

    expect(document.activeElement).toEqual(getByText(items[1]));

    fireEvent.keyDown(getByText(items[2]), { key: 'ArrowRight' });

    expect(document.activeElement).toEqual(getByText(items[2]));

    fireEvent.keyDown(getByText(items[2]), { key: 'ArrowRight' });

    expect(document.activeElement).toEqual(renderedCombobox);
  });

  it('should allow for a controlled multi-combobox', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    let [, ...selectedItems] = items;
    const { getByLabelText, getByText, queryByText, rerender } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={changes =>
          (selectedItems = changes.selectedItems)
        }
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(
      getByText(selectedItems[0], { selector: 'button' })
    ).toBeInTheDocument();
    expect(
      getByText(selectedItems[1], { selector: 'button' })
    ).toBeInTheDocument();

    fireEvent.click(renderedCombobox);

    fireEvent.click(getByText(items[0]));

    expect(selectedItems[2]).toEqual(items[0]);

    rerender(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={changes =>
          (selectedItems = changes.selectedItems)
        }
        onRemoveSelectedItem={removedItem => {
          selectedItems = selectedItems.filter(item => item !== removedItem);
        }}
      />
    );

    expect(
      getByText(selectedItems[2], { selector: 'button' })
    ).toBeInTheDocument();

    fireEvent.click(getByText(selectedItems[0], { selector: 'button' }));

    expect(selectedItems.includes(items[1])).not.toBeTruthy();

    rerender(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={changes =>
          (selectedItems = changes.selectedItems)
        }
        onRemoveSelectedItem={removedItem => {
          selectedItems = selectedItems.filter(item => item !== removedItem);
        }}
      />
    );

    expect(
      queryByText(items[1], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should call the passed in onIsOpenChange function on multi-combobox open', () => {
    const onIsOpenChange = jest.fn();
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        onIsOpenChange={onIsOpenChange}
      />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'input' }));

    expect(onIsOpenChange).toHaveBeenCalled();
  });

  it('should allow for the creation of an item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'Yellow' } });

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();
    fireEvent.click(createItem);

    expect(getByText('Yellow', { selector: 'button' })).toBeInTheDocument();
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
        representation: value.charAt(0).toUpperCase() + value.slice(1),
      };
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
      <MultiCombobox
        isMulti
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

    expect(getByText('Yellow', { selector: 'button' })).toBeInTheDocument();
  });

  it('should allow for creation of a custom item with controlled items', () => {
    let selectedItems = [];
    let items = [
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
    const labelText = 'Label';

    function itemToString(item) {
      return item ? item.representation : '';
    }

    function newItemTransform(item) {
      const { value } = item;

      return {
        id: 'abc123',
        name: value,
        representation: value.charAt(0).toUpperCase() + value.slice(1),
      };
    }

    function handleSelectedItemsChange(changes) {
      selectedItems = changes.selectedItems;
    }

    function handleItemCreated(newItem) {
      selectedItems = [...selectedItems, newItem];
      items = [...items, newItem];
    }

    const { getByLabelText, getByText, rerender } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
        onItemCreated={handleItemCreated}
        onSelectedItemsChange={handleSelectedItemsChange}
        selectedItems={selectedItems}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'Yellow' } });

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();
    fireEvent.click(createItem);

    expect(selectedItems[0].representation).toEqual('Yellow');

    rerender(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
        onItemCreated={handleItemCreated}
        onSelectedItemsChange={handleSelectedItemsChange}
        selectedItems={selectedItems}
        onRemoveSelectedItem={removedItem => {
          selectedItems = selectedItems.filter(item => item !== removedItem);
        }}
      />
    );

    expect(getByText('Yellow', { selector: 'button' })).toBeInTheDocument();
    fireEvent.click(getByText('Yellow', { selector: 'button' }));

    rerender(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
        onItemCreated={handleItemCreated}
        onSelectedItemsChange={handleSelectedItemsChange}
        selectedItems={selectedItems}
      />
    );

    fireEvent.change(renderedCombobox, { target: { value: 'Y' } });

    expect(getByText('Yellow', { selector: 'li' })).toBeInTheDocument();
  });

  it('should have an initial selected item', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
      />
    );

    expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
  });

  describe('isTypeahead', () => {
    describe('when isTypeahead is true,', () => {
      it('should be able to select an item that is not in the items list', () => {
        const labelText = 'Label';
        const items = ['Red', 'Blue', 'Green'];
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            selectedItems={['Red', 'Pink']}
            isTypeahead
          />
        );
    
        expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
        expect(queryByText('Pink', { selector: 'button' })).toBeInTheDocument();
      });
    
      it('should be able to use the initial selected item even if it is not in the items list', () => {
        const labelText = 'Label';
        const items = ['Red', 'Blue', 'Green'];
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            initialSelectedItems={['Red', 'Pink']}
            isTypeahead
          />
        );
    
        expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
        expect(queryByText('Pink', { selector: 'button' })).toBeInTheDocument();
      });
    });

    describe('when isTypeahead is false,', () => {
      it('should not select an item that is not in the items list', () => {
        const labelText = 'Label';
        const items = ['Red', 'Blue', 'Green'];
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            selectedItems={['Red', 'Pink']}
            isTypeahead={false}
          />
        );
    
        expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
        expect(queryByText('Pink', { selector: 'button' })).not.toBeInTheDocument();
      });
    
      it('should not use the initial selected item if it is not in the items list', () => {
        const labelText = 'Label';
        const items = ['Red', 'Blue', 'Green'];
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            initialSelectedItems={['Red', 'Pink']}
            isTypeahead={false}
          />
        );
    
        expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
        expect(queryByText('Pink', { selector: 'button' })).not.toBeInTheDocument();
      });
    });
  });

  it('should disable the combobox', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} disabled />
    );

    expect(getByLabelText(labelText, { selector: 'input' })).toHaveAttribute(
      'disabled'
    );
  });

  it('should allow a selection to be cleared', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText, queryByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
      />
    );

    const selectedItem = getByText('Red', { selector: 'button' });

    expect(selectedItem).toBeInTheDocument();

    fireEvent.click(selectedItem);

    expect(queryByText('Red', { selector: 'button' })).not.toBeInTheDocument();
  });

  it('should filter items based on text in the combobox', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, queryByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
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

  it('should filter out selected items', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, queryByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={['Red']}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    expect(queryByText('Red', { selector: 'li' })).not.toBeInTheDocument();
    expect(queryByText('Blue')).not.toBeInTheDocument();
    expect(queryByText('Green')).not.toBeInTheDocument();

    fireEvent.change(renderedCombobox, { target: { value: '' } });

    expect(queryByText('Red', { selector: 'li' })).not.toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
    expect(getByText('Green')).toBeInTheDocument();
  });

  it('should highlight the first item in the list after typing', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];

    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    expect(getByText('Red')).toHaveAttribute('aria-selected', 'true');
  });

  it('should select the first item highlighted in items list', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];

    const { getByText, getByLabelText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    fireEvent.keyDown(renderedCombobox, { key: 'Enter' });

    expect(getByText('Red')).toBeInTheDocument();
  });

  it('should not change the selected item if no item list after filter', () => {
    const labelText = 'Label';
    const items = ['Red', 'Blue', 'Green'];

    const { getByText, getByLabelText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={[items[0]]}
      />
    );

    expect(getByText('Red')).toBeInTheDocument();

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    fireEvent.keyDown(renderedCombobox, { key: 'Enter' });

    expect(getByText('Red')).toBeInTheDocument();
  });

  it('should show an error message', () => {
    const labelText = 'Label';
    const errorMessage = 'This is an error';
    const items = ['Red', 'Blue', 'Green'];
    const { getByText } = render(
      <MultiCombobox
        isMulti
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
      <MultiCombobox
        isMulti
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
    const LoadingIndicator = () => (
      <div data-testid="customLoadingIndicator">loading</div>
    );

    const { getByTestId } = render(
      <MultiCombobox
        isMulti
        isLoading
        labelText={labelText}
        isClearable
        items={items}
        selectedItem={items[0]}
        components={{
          LoadingIndicator,
        }}
      />
    );

    expect(getByTestId('customLoadingIndicator')).toBeInTheDocument();
  });

  describe('events', () => {
    it('onBlur', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onBlur = jest.fn();
      ``;

      const { getByLabelText } = render(
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputBlur={onBlur}
        />
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
        <MultiCombobox isMulti labelText={labelText} items={items} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      renderedCombobox.focus();
      fireEvent.change(renderedCombobox, { target: { value: 'yel' } });

      fireEvent.blur(renderedCombobox);

      expect(renderedCombobox.value).toEqual('');
    });

    it('onFocus', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onFocus = jest.fn();

      const { getByLabelText } = render(
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputFocus={onFocus}
        />
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
        <MultiCombobox
          isMulti
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
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputKeyUp={onKeyUp}
        />
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
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputValueChange={onInputValueChange}
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.change(renderedCombobox, { target: { value: 'Red' } });

      expect(onInputValueChange).toBeCalledWith(
        expect.objectContaining({
          inputValue: 'Red',
        }),
        expect.anything(Function)
      );
    });

    it('onInputChange', () => {
      const labelText = 'Label';
      const items = ['Red', 'Blue', 'Green'];
      const onInputChange = jest.fn();

      const { getByLabelText } = render(
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputChange={onInputChange}
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.change(renderedCombobox, { target: { value: 'Red' } });

      expect(onInputChange).toBeCalledWith(
        expect.objectContaining({
          inputValue: 'Red',
        })
      );
    });
  });
});
