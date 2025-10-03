import React from 'react';

import { act, render, waitFor } from '@testing-library/react';

import { magma } from '../../theme/magma';
import { Modal } from '../Modal';

import { Combobox as MultiCombobox } from '.';
import userEvent from '@testing-library/user-event';

describe('MultiCombobox', () => {
  const labelText = 'Label';
  const items = ['Red', 'Blue', 'Green'];

  it('should render a multi-combobox with items', async () => {
    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toBeInTheDocument();

    await userEvent.click(renderedCombobox);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should accept items in the default object format', async () => {
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

    await userEvent.click(renderedCombobox);

    expect(getByText(items[0].label)).toBeInTheDocument();
  });

  it('should accept items in a custom item format', async () => {
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
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        itemToString={itemToString}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toBeInTheDocument();

    await userEvent.click(renderedCombobox);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should render an items list with the default max height', async () => {
    const { container, getByLabelText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', async () => {
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

    await userEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      maxHeight
    );
  });

  it('should render an items list with the passed in max height as a number', async () => {
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

    await userEvent.click(renderedCombobox);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      `${maxHeight}px`
    );
  });

  it('should render custom item component', async () => {
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
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        components={{ Item: CustomItem }}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.click(renderedCombobox);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should allow for selection of multiple items', async () => {
    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.click(renderedCombobox);
    await userEvent.click(getByText(items[0]));
    await userEvent.click(renderedCombobox);
    await userEvent.click(getByText(items[1]));

    expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
    expect(getByText(items[1], { selector: 'button' })).toBeInTheDocument();
  });

  it('should allow for the removal of selected items with the keyboard', async () => {
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

    act(() => {
      renderedCombobox.focus();
    });

    await userEvent.keyboard('{Backspace}');

    expect(
      queryByText(items[2], { selector: 'button' })
    ).not.toBeInTheDocument();

    const selectedItem1 = getByText(items[1]);

    act(() => {
      selectedItem1.focus();
    });

    await userEvent.keyboard('{Backspace}');

    expect(
      queryByText(items[1], { selector: 'button' })
    ).not.toBeInTheDocument();

    const selectedItem2 = getByText(items[0]);

    act(() => {
      selectedItem2.focus();
    });

    await userEvent.keyboard('{Delete}');

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should change the focused selected item using arrow keys', async () => {
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

    act(() => {
      renderedCombobox.focus();
    });

    await userEvent.keyboard('{ArrowLeft}');

    expect(document.activeElement).toEqual(getByText(items[2]));

    await userEvent.keyboard('{ArrowLeft}');

    expect(document.activeElement).toEqual(getByText(items[1]));

    await userEvent.keyboard('{ArrowRight}');

    expect(document.activeElement).toEqual(getByText(items[2]));

    await userEvent.keyboard('{ArrowRight}');

    expect(document.activeElement).toEqual(renderedCombobox);
  });

  it('should allow for a controlled multi-combobox', async () => {
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

    await userEvent.click(renderedCombobox);
    await userEvent.click(getByText(items[0]));

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

    await userEvent.click(getByText(selectedItems[0], { selector: 'button' }));

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

  it('should call the passed in onIsOpenChange function on multi-combobox open', async () => {
    const onIsOpenChange = jest.fn();

    const { getByLabelText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        onIsOpenChange={onIsOpenChange}
      />
    );

    await userEvent.click(getByLabelText(labelText, { selector: 'input' }));

    expect(onIsOpenChange).toHaveBeenCalled();
  });

  it('should allow for the creation of an item', async () => {
    const { getByLabelText, getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.type(renderedCombobox, 'Yellow');

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();

    await userEvent.click(createItem);

    expect(getByText('Yellow', { selector: 'button' })).toBeInTheDocument();
  });

  it('should allow for creation of a custom item', async () => {
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
      <MultiCombobox
        isMulti
        labelText={labelText}
        defaultItems={items}
        newItemTransform={newItemTransform}
        itemToString={itemToString}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.type(renderedCombobox, 'Yellow');

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();

    await userEvent.click(createItem);

    expect(getByText('Yellow', { selector: 'button' })).toBeInTheDocument();
  });

  it('should allow for creation of a custom item with controlled items', async () => {
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

    await userEvent.type(renderedCombobox, 'Yellow');

    const createItem = getByText('Create "Yellow"');

    expect(createItem).toBeInTheDocument();

    await userEvent.click(createItem);

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

    await userEvent.click(getByText('Yellow', { selector: 'button' }));

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

    await userEvent.type(renderedCombobox, 'Y');

    expect(getByText('Yellow', { selector: 'li' })).toBeInTheDocument();
  });

  it('should have an initial selected item', async () => {
    const { getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
      />
    );

    await waitFor(() => {
      expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
    });
  });

  it('should render items with button type button', async () => {
    const { getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
      />
    );

    await waitFor(() => {
      expect(getByText('Red', { selector: 'button' })).toHaveAttribute(
        'type',
        'button'
      );
    });
  });

  describe('isTypeahead', () => {
    describe('when isTypeahead is true,', () => {
      it('should be able to select an item that is not in the items list', async () => {
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            selectedItems={['Red', 'Pink']}
            isTypeahead
          />
        );

        await waitFor(() => {
          expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
          expect(
            queryByText('Pink', { selector: 'button' })
          ).toBeInTheDocument();
        });
      });

      it('should be able to use the initial selected item even if it is not in the items list', async () => {
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            initialSelectedItems={['Red', 'Pink']}
            isTypeahead
          />
        );

        await waitFor(() => {
          expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
          expect(
            queryByText('Pink', { selector: 'button' })
          ).toBeInTheDocument();
        });
      });

      it('and isLoading is true, list loading indicator is visible', async () => {
        const { getByText, queryByTestId } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            isTypeahead
            isLoading
            disableCreateItem
          />
        );

        await waitFor(() => {
          expect(getByText(/loading.../i)).toBeInTheDocument();
          expect(queryByTestId('loadingIndicator')).not.toBeInTheDocument();
        });
      });

      it('and isLoading is false, no loading indicator is visible', async () => {
        const { queryByText, queryByTestId } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            isTypeahead
            isLoading={false}
          />
        );

        await waitFor(() => {
          expect(queryByText(/loading.../i)).not.toBeInTheDocument();
          expect(queryByTestId('loadingIndicator')).not.toBeInTheDocument();
        });
      });
    });

    describe('when isTypeahead is false,', () => {
      it('should not select an item that is not in the items list', async () => {
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            selectedItems={['Red', 'Pink']}
            isTypeahead={false}
          />
        );

        await waitFor(() => {
          expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
          expect(
            queryByText('Pink', { selector: 'button' })
          ).not.toBeInTheDocument();
        });
      });

      it('should not use the initial selected item if it is not in the items list', async () => {
        const { getByText, queryByText } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            initialSelectedItems={['Red', 'Pink']}
            isTypeahead={false}
          />
        );

        await waitFor(() => {
          expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
          expect(
            queryByText('Pink', { selector: 'button' })
          ).not.toBeInTheDocument();
        });
      });

      it('and isLoading is true, input loading indicator is visible', async () => {
        const { queryByText, getByTestId } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            isTypeahead={false}
            isLoading
          />
        );

        await waitFor(() => {
          expect(getByTestId('loadingIndicator')).toBeInTheDocument();
          expect(queryByText(/loading.../i)).not.toBeInTheDocument();
        });
      });

      it('and isLoading is false, no loading indicator is visible', async () => {
        const { queryByText, queryByTestId } = render(
          <MultiCombobox
            isMulti
            labelText={labelText}
            items={items}
            isTypeahead={false}
            isLoading={false}
          />
        );

        await waitFor(() => {
          expect(queryByText(/loading.../i)).not.toBeInTheDocument();
          expect(queryByTestId('loadingIndicator')).not.toBeInTheDocument();
        });
      });
    });
  });

  it('should disable the combobox', async () => {
    const { getByLabelText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} disabled />
    );

    await waitFor(() => {
      expect(getByLabelText(labelText, { selector: 'input' })).toHaveAttribute(
        'disabled'
      );
    });
  });

  it('when disabled, selected items should not be removable', async () => {
    const { getByLabelText, getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        disabled
        initialSelectedItems={['Red']}
      />
    );

    expect(getByLabelText(labelText, { selector: 'input' })).toHaveAttribute(
      'disabled'
    );

    const selectedItem = getByText('Red', { selector: 'button' });

    expect(selectedItem).toBeInTheDocument();

    await userEvent.click(selectedItem);

    expect(selectedItem).toBeInTheDocument();
  });

  it('when disabled, isClearable button should not be clickable', async () => {
    const { getByLabelText, getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        disabled
        isClearable
        initialSelectedItems={['Red']}
      />
    );

    expect(getByLabelText(labelText, { selector: 'input' })).toHaveAttribute(
      'disabled'
    );

    await userEvent.click(getByLabelText(/reset selection/i));

    expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();
  });

  it('should allow a selection to be cleared with isClearable prop', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={['Red']}
        isClearable
      />
    );

    expect(getByText('Red', { selector: 'button' })).toBeInTheDocument();

    await userEvent.click(getByLabelText(/reset selection/i));

    expect(queryByText('Red', { selector: 'button' })).not.toBeInTheDocument();
  });

  it('should allow a selection to be removed by clicking on it', async () => {
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

    await userEvent.click(selectedItem);

    expect(queryByText('Red', { selector: 'button' })).not.toBeInTheDocument();
  });

  it('should filter items based on text in the combobox', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.type(renderedCombobox, 'R');

    expect(getByText('Red')).toBeInTheDocument();
    expect(queryByText('Blue')).not.toBeInTheDocument();
    expect(queryByText('Green')).not.toBeInTheDocument();

    await userEvent.clear(renderedCombobox);

    expect(getByText('Red')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
    expect(getByText('Green')).toBeInTheDocument();
  });

  it('should filter out selected items', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        selectedItems={['Red']}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.type(renderedCombobox, 'R');

    expect(queryByText('Red', { selector: 'li' })).not.toBeInTheDocument();
    expect(queryByText('Blue')).not.toBeInTheDocument();
    expect(queryByText('Green')).not.toBeInTheDocument();

    await userEvent.clear(renderedCombobox);

    expect(queryByText('Red', { selector: 'li' })).not.toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
    expect(getByText('Green')).toBeInTheDocument();
  });

  it('should highlight the first item in the list after typing', async () => {
    const { getByLabelText, getByText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.type(renderedCombobox, 'R');

    expect(getByText('Red')).toHaveAttribute('aria-selected', 'true');
  });

  it('should select the first item highlighted in items list', async () => {
    const { getByText, getByLabelText } = render(
      <MultiCombobox isMulti labelText={labelText} items={items} />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    await userEvent.type(renderedCombobox, 'R');
    await userEvent.keyboard('{Enter}');

    expect(getByText('Red')).toBeInTheDocument();
  });

  it('should not change the selected item if no item list after filter', async () => {
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

    await userEvent.type(renderedCombobox, 'R');
    await userEvent.keyboard('{Enter}');

    expect(getByText('Red')).toBeInTheDocument();
  });

  it('should show an error message', async () => {
    const errorMessage = 'This is an error';

    const { getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        errorMessage={errorMessage}
      />
    );

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show an helper message', async () => {
    const helperMessage = 'This is an error';

    const { getByText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    await waitFor(() => {
      expect(getByText(helperMessage)).toBeInTheDocument();
    });
  });

  it('should allow you to send in your own components', async () => {
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

    await waitFor(() => {
      expect(getByTestId('customLoadingIndicator')).toBeInTheDocument();
    });
  });

  it('should show placeholder text until an item is selected', async () => {
    const placeholder = 'Select item';
    const { getByText, getByLabelText } = render(
      <MultiCombobox
        isMulti
        labelText={labelText}
        items={items}
        placeholder={placeholder}
      />
    );

    const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

    expect(renderedCombobox).toHaveAttribute('placeholder', placeholder);

    await userEvent.click(renderedCombobox);
    await userEvent.click(getByText(items[0]));

    expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
    expect(renderedCombobox).not.toHaveAttribute('placeholder');
  });

  describe('hasPersistentMenu', () => {
    it('should keep the items list open', async () => {
      const { getByLabelText, getByText } = render(
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          hasPersistentMenu
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      await userEvent.click(renderedCombobox);
      await userEvent.click(getByText(items[0]));
      await userEvent.click(getByText(items[1]));

      expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
      expect(getByText(items[1], { selector: 'button' })).toBeInTheDocument();
    });

    it('should allow for the removal of selected items with the keyboard', async () => {
      const selectedItems = ['Red', 'Blue', 'Green'];

      const { getByLabelText, getByText, queryByText } = render(
        <MultiCombobox
          isMulti
          hasPersistentMenu
          labelText={labelText}
          items={items}
          initialSelectedItems={selectedItems}
        />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });
      const selectedItem1 = getByText(items[1]);
      const selectedItem2 = getByText(items[0]);

      act(() => {
        renderedCombobox.focus();
      });

      await userEvent.keyboard('{Backspace}');

      expect(
        queryByText(items[2], { selector: 'button' })
      ).not.toBeInTheDocument();

      act(() => {
        selectedItem1.focus();
      });

      await userEvent.keyboard('{Backspace}');

      expect(
        queryByText(items[1], { selector: 'button' })
      ).not.toBeInTheDocument();

      act(() => {
        selectedItem2.focus();
      });

      await userEvent.keyboard('{Delete}');

      expect(
        queryByText(items[0], { selector: 'button' })
      ).not.toBeInTheDocument();
    });
  });

  describe('events', () => {
    it('onBlur', async () => {
      const onBlur = jest.fn();

      const { findByLabelText } = render(
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputBlur={onBlur}
        />
      );

      const renderedCombobox = await findByLabelText(labelText, {
        selector: 'input',
      });

      act(() => {
        renderedCombobox.focus();
        renderedCombobox.blur();
      });

      expect(onBlur).toHaveBeenCalled();
    });

    it('onBlur should empty input if no selected item', async () => {
      const { getByLabelText } = render(
        <MultiCombobox isMulti labelText={labelText} items={items} />
      );

      const renderedCombobox = getByLabelText(labelText, { selector: 'input' });

      act(() => {
        renderedCombobox.focus();
      });

      await userEvent.type(renderedCombobox, 'yel');

      act(() => {
        renderedCombobox.blur();
      });

      expect(renderedCombobox.value).toEqual('');
    });

    it('onFocus', async () => {
      const onFocus = jest.fn();

      const { findByLabelText } = render(
        <MultiCombobox
          isMulti
          labelText={labelText}
          items={items}
          onInputFocus={onFocus}
        />
      );

      const renderedCombobox = await findByLabelText(labelText, {
        selector: 'input',
      });

      act(() => {
        renderedCombobox.focus();
      });

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', async () => {
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

      await userEvent.type(renderedCombobox, '{Enter}');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', async () => {
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

      await userEvent.type(renderedCombobox, '{Enter}');

      expect(onKeyUp).toHaveBeenCalled();
    });

    it('onInputValueChange', async () => {
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

      await userEvent.type(renderedCombobox, 'Red');

      expect(onInputValueChange).toHaveBeenCalledWith(
        expect.objectContaining({
          inputValue: 'Red',
        }),
        expect.anything(Function)
      );
    });

    it('onInputChange', async () => {
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

      await userEvent.type(renderedCombobox, 'Red');

      expect(onInputChange).toHaveBeenCalledWith(
        expect.objectContaining({
          inputValue: 'Red',
        })
      );
    });
  });

  describe('inside a modal', () => {
    const items = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ];

    it('should close the menu when escape key is pressed, and retain the active modal', async () => {
      const { getByLabelText, queryByText, getByText } = render(
        <Modal testId="modal" isOpen>
          Modal Content
          <MultiCombobox isMulti labelText={labelText} items={items} />
        </Modal>
      );

      const renderedCombobox = getByLabelText(labelText, {
        selector: 'input',
      });

      expect(renderedCombobox).toBeInTheDocument();

      await userEvent.click(renderedCombobox);

      expect(getByText(items[0].label)).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      expect(
        queryByText(items[2], { selector: 'Red' })
      ).not.toBeInTheDocument();
      expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('should close the modal on escape after menu is closed on escape', async () => {
      const onEscKeyMock = jest.fn();

      const { getByLabelText, queryByText, getByText } = render(
        <Modal testId="modal" isOpen onEscKeyDown={onEscKeyMock}>
          Modal Content
          <MultiCombobox isMulti labelText={labelText} items={items} />
        </Modal>
      );

      const renderedCombobox = getByLabelText(labelText, {
        selector: 'input',
      });

      await userEvent.click(renderedCombobox);

      expect(getByText(items[0].label)).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      expect(
        queryByText(items[2], { selector: 'Red' })
      ).not.toBeInTheDocument();

      expect(getByText('Modal Content')).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      expect(onEscKeyMock).toHaveBeenCalled();
      await waitFor(() => {
        expect(queryByText('Modal Content')).not.toBeInTheDocument();
      });
    });
  });
});
