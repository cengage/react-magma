import React from 'react';

import { act, render, waitFor } from '@testing-library/react';

import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { Modal } from '../Modal';

import { Select as MultiSelect } from '.';
import userEvent from '@testing-library/user-event';

describe('Select', () => {
  const items = ['Red', 'Blue', 'Green'];
  const labelText = 'Label';

  beforeAll(() => {
    window.addEventListener('submit', e => {
      e.preventDefault();
    });
  });

  it('should render a multi-select with items', async () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    await userEvent.click(renderedSelect);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should render a select with a passed in placeholder', async () => {
    const placeholder = 'Test';

    const { getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        placeholder={placeholder}
      />
    );

    await waitFor(() => {
      expect(getByText(placeholder)).toBeInTheDocument();
    });
  });

  it('should render a select with the default i18n placeholder', async () => {
    const { getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    await waitFor(() => {
      expect(
        getByText(defaultI18n.multiSelect.placeholder)
      ).toBeInTheDocument();
    });
  });

  it('should accept items in the default object format', async () => {
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

    await userEvent.click(renderedSelect);

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
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        itemToString={itemToString}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    await userEvent.click(renderedSelect);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should render an items list with the default max height', async () => {
    const { container, getByLabelText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', async () => {
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

    await userEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      maxHeight
    );
  });

  it('Should have a defined width for label when labelPosition is "left"', async () => {
    const { getByText } = render(
      <MultiSelect
        isMulti
        items={items}
        labelPosition="left"
        labelText={labelText}
        labelWidth={20}
      />
    );

    await waitFor(() => {
      expect(getByText(labelText)).toHaveStyle('flex-basis: 20%');
    });
  });

  it('should render an items list with the passed in max height as a number', async () => {
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

    await userEvent.click(renderedSelect);

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
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        components={{ Item: CustomItem }}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should not select an item when typing and select is closed', async () => {
    const { getByLabelText, queryByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard('r');

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should allow for selection of multiple items', async () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));
    await userEvent.click(getByText(items[0]));
    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));
    await userEvent.click(getByText(items[1]));

    expect(getByText(items[0], { selector: 'button' }).textContent).toEqual(
      items[0]
    );
    expect(getByText(items[1], { selector: 'button' }).textContent).toEqual(
      items[1]
    );
  });

  it('should allow for the removal of a selected item', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));
    await userEvent.click(getByText(items[0]));
    await userEvent.click(getByText(items[0], { selector: 'button' }));

    expect(
      queryByText(items[0], { selector: 'button' })
    ).not.toBeInTheDocument();
  });

  it('should allow for the removal of selected items with the keyboard', async () => {
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

    act(() => {
      renderedMultiSelect.focus();
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
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={selectedItems}
      />
    );

    const renderedMultiSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedMultiSelect.focus();
    });

    await userEvent.keyboard('{ArrowLeft}');

    expect(document.activeElement).toEqual(getByText(items[2]));

    await userEvent.keyboard('{ArrowLeft}');

    expect(document.activeElement).toEqual(getByText(items[1]));

    await userEvent.keyboard('{ArrowRight}');

    expect(document.activeElement).toEqual(getByText(items[2]));

    await userEvent.keyboard('{ArrowRight}');

    expect(document.activeElement).toEqual(renderedMultiSelect);
  });

  it('should allow for a controlled multi-select', async () => {
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

    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));
    await userEvent.click(getByText(items[2]));

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

    await userEvent.click(getByText(items[0], { selector: 'button' }));

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

  it('should have an initial selected items', async () => {
    const { getByText } = render(
      <MultiSelect
        isMulti
        labelText={labelText}
        items={items}
        initialSelectedItems={items}
      />
    );

    await waitFor(() => {
      expect(getByText(items[0], { selector: 'button' })).toBeInTheDocument();
      expect(getByText(items[1], { selector: 'button' })).toBeInTheDocument();
      expect(getByText(items[2], { selector: 'button' })).toBeInTheDocument();
    });
  });

  it('should disable the multi-select', async () => {
    const { getByLabelText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} disabled />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await waitFor(() => {
      expect(renderedSelect).toHaveAttribute('disabled');
    });
  });

  it('should open select when clicking the enter key', async () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard('{Enter}');

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should open select when clicking the spacebar', async () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard(' ');

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should close the menu when escape key is pressed, and retain the active modal', async () => {
    const { getByLabelText, getByText, getByTestId, queryByText } = render(
      <Modal testId="modal" isOpen>
        <MultiSelect isMulti labelText={labelText} items={items} />
      </Modal>
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard(' ');

    expect(getByText(items[0])).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(queryByText(items[0], { selector: 'Red' })).not.toBeInTheDocument();
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should not open select when clicking another key other than the enter or spacebar', async () => {
    const { getByLabelText, queryByText } = render(
      <MultiSelect isMulti labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard('a');

    expect(queryByText(items[0])).not.toBeInTheDocument();
  });

  it('should show an error message', async () => {
    const errorMessage = 'This is an error';

    const { getByText } = render(
      <MultiSelect
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
      <MultiSelect
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

  it('should handle disabled items', async () => {
    const items = [
      { label: 'Red', value: 'red', disabled: true },
      { label: 'Blue', value: 'blue', disabled: false },
      { label: 'Green', value: 'green' },
    ];

    const { getByLabelText, getByText } = render(
      <MultiSelect labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(getByText('Red')).toHaveAttribute('aria-disabled', 'true');
    expect(getByText('Blue')).toHaveAttribute('aria-disabled', 'false');
    expect(getByText('Green')).toHaveAttribute('aria-disabled', 'false');
  });

  describe('events', () => {
    it('onBlur', async () => {
      const onBlur = jest.fn();

      const { findByLabelText } = render(
        <MultiSelect
          isMulti
          labelText={labelText}
          items={items}
          onBlur={onBlur}
        />
      );

      const renderedSelect = await findByLabelText(labelText, {
        selector: 'div',
      });

      act(() => {
        renderedSelect.focus();
        renderedSelect.blur();
      });

      expect(onBlur).toHaveBeenCalled();
    });

    it('onFocus', async () => {
      const onFocus = jest.fn();

      const { findByLabelText } = render(
        <MultiSelect
          isMulti
          labelText={labelText}
          items={items}
          onFocus={onFocus}
        />
      );

      const renderedSelect = await findByLabelText(labelText, {
        selector: 'div',
      });

      act(() => {
        renderedSelect.focus();
      });

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', async () => {
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

      act(() => {
        renderedSelect.focus();
      });

      await userEvent.keyboard('{Enter}');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', async () => {
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

      act(() => {
        renderedSelect.focus();
      });

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard('{Enter}');

      expect(onKeyUp).toHaveBeenCalled();
    });
  });
});
