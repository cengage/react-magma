import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Combobox } from '.';
import { magma } from '../../theme/magma';
import { Modal } from '../Modal';
import { Button } from '../Button';

describe('Combobox', () => {
  const labelText = 'Label';
  const items = ['Red', 'Blue', 'Green'];

  it('should render a combobox with items', () => {
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toBeInTheDocument();

    fireEvent.click(renderedCombobox);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should accept items in the default object format', () => {
    const items = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
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

  it('should render an items list with the default max height', () => {
    const { container, getByLabelText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', () => {
    const maxHeight = '100px';
    const { container, getByLabelText } = render(
      <Combobox
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
    const maxHeight = 50;
    const { container, getByLabelText } = render(
      <Combobox
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
      <Combobox
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

  it('should allow for selection of an item', () => {
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    fireEvent.click(getByText(items[0]));

    expect(renderedCombobox.value).toEqual(items[0]);
  });

  it('should allow for selection of an item using keyboard navigation', () => {
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    renderedCombobox.focus();

    fireEvent.keyDown(renderedCombobox, { key: 'ArrowDown' });
    fireEvent.keyDown(renderedCombobox, { key: 'ArrowDown' });
    fireEvent.keyDown(renderedCombobox, { key: 'Enter' });

    expect(renderedCombobox.value).toEqual(items[1]);

    renderedCombobox.blur();

    expect(renderedCombobox.value).toEqual(items[1]);
  });

  it('should call the passed in onIsOpenChange function on combobox open', () => {
    const onIsOpenChange = jest.fn();
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
        representation: value.charAt(0).toUpperCase() + value.slice(1),
      };
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

  it('should not break when passing null in for the items prop', () => {
    let items = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText, rerender } = render(
      <>
        <button onClick={() => (items = null)}>Clear items</button>
        <Combobox labelText={labelText} items={items} />
      </>
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.click(renderedCombobox);

    expect(getByText('Red')).toBeInTheDocument();

    fireEvent.click(getByText('Clear items'));

    rerender(
      <>
        <button onClick={() => (items = null)}>Clear items</button>
        <Combobox labelText={labelText} items={items} />
      </>
    );

    fireEvent.click(renderedCombobox);

    expect(getByText(/no options/i)).toBeInTheDocument();
  });

  it('should disable the creation of an item', () => {
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
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} initialSelectedItem="Red" />
    );

    expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
      'Red'
    );
  });

  describe('isTypeahead', () => {
    describe('when isTypeahead is true,', () => {
      it('should be able to select an item that is not in the items list', () => {
        const { getByLabelText } = render(
          <Combobox
            labelText={labelText}
            items={items}
            selectedItem="Pink"
            isTypeahead
          />
        );

        expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
          'Pink'
        );
      });

      it('should be able to use the initial selected item even if it is not in the items list', () => {
        const { getByLabelText } = render(
          <Combobox
            labelText={labelText}
            items={items}
            initialSelectedItem="Pink"
            isTypeahead
          />
        );

        expect(getByLabelText(labelText, { selector: 'input' }).value).toEqual(
          'Pink'
        );
      });

      it('and isLoading is true, list loading indicator is visible', () => {
        const { getByText, queryByTestId } = render(
          <Combobox
            labelText={labelText}
            items={items}
            isTypeahead
            isLoading
            disableCreateItem
          />
        );
        expect(getByText(/loading.../i)).toBeInTheDocument();
        expect(queryByTestId('loadingIndicator')).not.toBeInTheDocument();
      });

      it('and isLoading is false, no loading indicator is visible', () => {
        const { queryByText, queryByTestId } = render(
          <Combobox
            labelText={labelText}
            items={items}
            isTypeahead
            isLoading={false}
            disableCreateItem
          />
        );
        expect(queryByText(/loading.../i)).not.toBeInTheDocument();
        expect(queryByTestId('loadingIndicator')).not.toBeInTheDocument();
      });
    });

    describe('when isTypeahead is false,', () => {
      it('should not select an item that is not in the items list', () => {
        const { getByLabelText } = render(
          <Combobox
            labelText={labelText}
            items={items}
            selectedItem="Pink"
            isTypeahead={false}
          />
        );

        expect(
          getByLabelText(labelText, { selector: 'input' }).textContent
        ).not.toEqual('Pink');
      });

      it('should not use the initial selected item if it is not in the items list', () => {
        const { getByLabelText } = render(
          <Combobox
            labelText={labelText}
            items={items}
            initialSelectedItem="Pink"
            isTypeahead={false}
          />
        );

        expect(
          getByLabelText(labelText, { selector: 'input' }).textContent
        ).not.toEqual('Pink');
      });

      it('and isLoading is true, input loading indicator is visible', () => {
        const { queryByText, getByTestId } = render(
          <Combobox
            labelText={labelText}
            items={items}
            isTypeahead={false}
            isLoading
          />
        );
        expect(getByTestId('loadingIndicator')).toBeInTheDocument();
        expect(queryByText(/loading.../i)).not.toBeInTheDocument();
      });

      it('and isLoading is false, no loading indicator is visible', () => {
        const { queryByText, queryByTestId } = render(
          <Combobox
            labelText={labelText}
            items={items}
            isTypeahead={false}
            isLoading={false}
          />
        );
        expect(queryByText(/loading.../i)).not.toBeInTheDocument();
        expect(queryByTestId('loadingIndicator')).not.toBeInTheDocument();
      });
    });
  });

  it('should disable the combobox', () => {
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} disabled />
    );

    expect(getByLabelText(labelText, { selector: 'input' })).toHaveAttribute(
      'disabled'
    );
  });

  it('should allow a selection to be cleared', () => {
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
    const { getByLabelText, getByText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    expect(getByText('Red')).toHaveAttribute('aria-selected', 'true');
  });

  it('should select the first item highlighted in items list on enter', () => {
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    fireEvent.change(renderedCombobox, { target: { value: 'R' } });

    fireEvent.keyDown(renderedCombobox, { key: 'Enter' });

    expect(renderedCombobox.value).toEqual('Red');
  });

  it('should not change the selected item if no item list after filter', () => {
    const { getByLabelText } = render(
      <Combobox labelText={labelText} items={items} selectedItem="Red" />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox.value).toEqual('Red');

    fireEvent.change(renderedCombobox, { target: { value: 'P' } });

    fireEvent.keyDown(renderedCombobox, { key: 'Enter' });

    expect(renderedCombobox.value).toEqual('Red');
  });

  it('should show an error message', () => {
    const errorMessage = 'This is an error';
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
    const helperMessage = 'This is an error';
    const { getByText } = render(
      <Combobox
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    expect(getByText(helperMessage)).toBeInTheDocument();
  });

  it('should show a left aligned label', () => {
    const { getByTestId } = render(
      <Combobox labelText={labelText} items={items} labelPosition="left" />
    );

    expect(getByTestId('selectContainerElement')).toHaveStyleRule(
      'display',
      'flex'
    );
  });

  it('Should have a defined width for label when labelPosition is "left"', () => {
    const { getByText } = render(
      <Combobox
        items={items}
        labelPosition="left"
        labelText={labelText}
        labelWidth={20}
      />
    );
    expect(getByText(labelText)).toHaveStyle('flex-basis: 20%');
  });

  it('should show loading indicator', () => {
    const { getByTestId } = render(
      <Combobox labelText={labelText} items={items} isLoading />
    );

    expect(getByTestId('loadingIndicator')).toBeInTheDocument();
  });

  it('should allow you to send in your own components', () => {
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
          LoadingIndicator,
        }}
      />
    );

    expect(getByTestId('customClearIndicator')).toBeInTheDocument();
  });

  describe('events', () => {
    it('onBlur', () => {
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
      const onFocus = jest.fn();

      const { getByLabelText } = render(
        <Combobox labelText={labelText} items={items} onInputFocus={onFocus} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      renderedCombobox.focus();

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', () => {
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
      const onKeyUp = jest.fn();

      const { getByLabelText } = render(
        <Combobox labelText={labelText} items={items} onInputKeyUp={onKeyUp} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      fireEvent.keyUp(renderedCombobox, { key: 'Enter' });

      expect(onKeyUp).toHaveBeenCalled();
    });

    it('onInputValueChange', () => {
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
          inputValue: 'Red',
        }),
        expect.anything(Function)
      );
    });

    it('onInputChange', () => {
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
          inputValue: 'Red',
        })
      );
    });

    describe('inside a modal', () => {
      const items = [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ];

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
        jest.resetAllMocks();
      });

      it('should close the menu when escape key is pressed, and retain the active modal', () => {
        const { getByLabelText, queryByText, getByText } = render(
          <Modal testId="modal" isOpen>
            Modal Content
            <Combobox labelText={labelText} items={items} />
          </Modal>
        );

        const renderedCombobox = getByLabelText(labelText, {
          selector: 'input',
        });

        expect(renderedCombobox).toBeInTheDocument();

        fireEvent.click(renderedCombobox);

        expect(getByText(items[0].label)).toBeInTheDocument();

        fireEvent.keyDown(getByLabelText(labelText, { selector: 'input' }), {
          key: 'Escape',
          code: 27,
        });

        expect(
          queryByText(items[2], { selector: 'Red' })
        ).not.toBeInTheDocument();

        expect(getByText('Modal Content')).toBeInTheDocument();
      });

      it('should close the modal on escape after menu is closed on escape', async () => {
        const onEscKeyMock = jest.fn();
        const { getByLabelText, queryByText, getByText, debug } = render(
          <Modal testId="modal" isOpen onEscKeyDown={onEscKeyMock}>
            Modal Content
            <Combobox labelText={labelText} items={items} />
          </Modal>
        );
        const renderedCombobox = getByLabelText(labelText, {
          selector: 'input',
        });
        fireEvent.click(renderedCombobox);
        expect(getByText(items[0].label)).toBeInTheDocument();

        fireEvent.keyDown(getByLabelText(labelText, { selector: 'input' }), {
          key: 'Escape',
          code: 27,
        });

        expect(
          queryByText(items[2], { selector: 'Red' })
        ).not.toBeInTheDocument();

        expect(getByText('Modal Content')).toBeInTheDocument();

        fireEvent.keyDown(getByText('Modal Content'), {
          key: 'Escape',
          code: 27,
        });

        await act(async () => {
          jest.runAllTimers();
        });

        expect(onEscKeyMock).toHaveBeenCalled();
        expect(queryByText('Modal Content')).not.toBeInTheDocument();
      });
    });
  });
});
