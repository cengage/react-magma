import React from 'react';

import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Combobox } from '../Combobox';

import { Select } from '.';

const colors = ['Red', 'Blue', 'Green'];
const objectColors = colors.map(value => ({ value, label: value }));

// These are consumer-level guards for the Downshift upgrade. Hook-specific
// compatibility and event translation are covered by utils/downshift tests.
describe('Downshift migration: Select integration', () => {
  it.each([
    ['strings', ['Red', 'Blue', 'Green'], 'Red'],
    [
      'a disabled first item',
      [
        { label: 'Red', value: 'red', disabled: true },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ],
      'Blue',
    ],
  ])(
    'opens on the first enabled item with ArrowUp for %s',
    async (_description, items, expected) => {
      const { getByRole } = render(<Select labelText="Color" items={items} />);
      const trigger = getByRole('combobox');

      await userEvent.tab();
      expect(trigger).toHaveFocus();
      await userEvent.keyboard('{ArrowUp}');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(
        getByRole('option', { name: expected, exact: true })
      ).toHaveAttribute('data-highlighted', 'true');
      expect(
        getByRole('option', { name: 'Green', exact: true })
      ).toHaveAttribute('data-highlighted', 'false');
    }
  );

  it('opens on a recreated custom selected item without requiring itemToKey', async () => {
    const { getByRole } = render(
      <Select
        labelText="Custom color"
        items={[{ name: 'Red' }, { name: 'Blue' }, { name: 'Green' }]}
        itemToString={item => item?.name || ''}
        selectedItem={{ name: 'Blue' }}
      />
    );

    await userEvent.click(getByRole('combobox'));
    expect(getByRole('option', { name: 'Blue is selected' })).toHaveAttribute(
      'data-highlighted',
      'true'
    );
  });

  it('provides the selected state of a recreated item to custom renderers', async () => {
    function CustomItem(props) {
      return (
        <li
          ref={props.itemRef}
          role={props.role}
          aria-label={props['aria-label']}
          aria-selected={props['aria-selected']}
        >
          {props.itemString}
        </li>
      );
    }

    const { getByRole, getAllByRole } = render(
      <Select
        labelText="Custom color"
        items={[{ name: 'Red' }, { name: 'Blue' }, { name: 'Green' }]}
        itemToString={item => item?.name || ''}
        selectedItem={{ name: 'Blue' }}
        components={{ Item: CustomItem }}
      />
    );

    await userEvent.click(getByRole('combobox'));
    expect(getByRole('option', { name: 'Blue is selected' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(getAllByRole('option', { selected: true })).toHaveLength(1);
  });

  it('preserves the first-item opening behavior for an empty selected string', async () => {
    const { getByRole } = render(
      <Select labelText="Color" items={['Red', '', 'Green']} selectedItem="" />
    );

    await userEvent.click(getByRole('combobox'));
    expect(getByRole('option', { name: 'Red', exact: true })).toHaveAttribute(
      'data-highlighted',
      'true'
    );
  });

  it.each([false, true])(
    'preserves an inherited single-selection opening item in multi mode (disabled=%s)',
    async disabled => {
      const items = [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue', disabled },
        { label: 'Green', value: 'green' },
      ];
      const { getByRole, getByLabelText, queryAllByRole } = render(
        <Select
          labelText="Color"
          items={items}
          isMulti
          initialSelectedItems={[items[2]]}
          initialSelectedItem={items[1]}
        />
      );

      await userEvent.click(getByRole('combobox'));
      expect(getByLabelText('clear item Green')).toBeInTheDocument();
      expect(
        getByRole('option', { name: 'Blue', exact: true })
      ).toHaveAttribute('data-highlighted', String(!disabled));
      if (disabled) {
        expect(
          queryAllByRole('option').filter(
            option => option.getAttribute('data-highlighted') === 'true'
          )
        ).toHaveLength(0);
      }
    }
  );

  it.each([
    ['string', colors],
    ['object', objectColors],
  ])(
    'supports controlled null, selection and reselection with %s items',
    async (_shape, items) => {
      let clearSelection;

      function ControlledSelect() {
        const [selectedItem, setSelectedItem] = React.useState(null);

        clearSelection = () => setSelectedItem(null);

        return (
          <Select
            labelText="Color"
            items={items}
            selectedItem={selectedItem}
            onSelectionChange={setSelectedItem}
          />
        );
      }

      const { getByRole, getByTestId } = render(<ControlledSelect />);
      const trigger = getByRole('combobox');

      await userEvent.click(trigger);
      await userEvent.click(getByRole('option', { name: 'Blue' }));
      expect(getByTestId('selectedItemText')).toHaveTextContent('Blue');

      act(() => clearSelection());
      expect(getByTestId('selectedItemText')).not.toHaveTextContent('Blue');

      await userEvent.click(trigger);
      await userEvent.click(getByRole('option', { name: 'Green' }));
      expect(getByTestId('selectedItemText')).toHaveTextContent('Green');
    }
  );

  it('keeps custom keyed items distinct when async data recreates duplicate labels', async () => {
    const onSelectionChange = jest.fn();
    const initialItems = [
      { id: 'first', text: 'Same' },
      { id: 'second', text: 'Same' },
    ];
    const props = {
      labelText: 'Custom color',
      itemToString: item => item?.text || '',
      itemToKey: item => item?.id,
      onSelectionChange,
    };
    const { getByRole, getAllByRole, rerender } = render(
      <Select
        {...props}
        items={initialItems}
        selectedItem={{ ...initialItems[1] }}
      />
    );

    await userEvent.click(getByRole('combobox'));
    expect(getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'false');
    expect(getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    expect(getAllByRole('option')[1]).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    const reloadedItems = initialItems.map(item => ({
      ...item,
      text: 'Renamed',
    }));

    rerender(
      <Select
        {...props}
        items={reloadedItems}
        selectedItem={{ ...reloadedItems[1] }}
      />
    );

    expect(getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'false');
    expect(getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(getAllByRole('option')[0]);
    expect(onSelectionChange).toHaveBeenCalledWith(reloadedItems[0]);
  });

  it.each([false, true])(
    'uses the disabled predicate for interaction and rendering (multi=%s)',
    async isMulti => {
      const { getByRole, getByText } = render(
        <Select
          labelText="Color"
          items={objectColors}
          isMulti={isMulti}
          isItemDisabled={item => item.value === 'Red'}
        />
      );

      await userEvent.click(getByRole('combobox'));

      expect(getByRole('option', { name: 'Red' })).toHaveAttribute(
        'aria-disabled',
        'true'
      );
      expect(getByText('Blue')).toHaveAttribute('data-highlighted', 'true');
      expect(getByText('Red')).toHaveStyleRule('cursor', 'not-allowed', {
        target: ':hover',
      });
    }
  );

  it('applies a consumer stateReducer after the component reducer', async () => {
    const { getByRole, getByTestId } = render(
      <Select
        labelText="Color"
        items={colors}
        stateReducer={(state, { changes }) => ({
          ...changes,
          selectedItem: changes.selectedItem ? 'Green' : state.selectedItem,
        })}
      />
    );

    await userEvent.click(getByRole('combobox'));
    await userEvent.click(getByRole('option', { name: 'Blue' }));

    expect(getByTestId('selectedItemText')).toHaveTextContent('Green');
  });

  it.each([
    ['legacy bounded', { circularNavigation: false }, 'Green'],
    ['bounded', { navigationMode: 'bounded' }, 'Green'],
    ['circular', { navigationMode: 'circular' }, 'Red'],
  ])(
    'honors %s navigation across disabled items',
    async (_mode, navigationProps, expected) => {
      const { getByRole } = render(
        <Select
          labelText="Color"
          items={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue', disabled: true },
            { label: 'Green', value: 'green' },
          ]}
          {...navigationProps}
        />
      );
      const trigger = getByRole('combobox');

      await userEvent.click(trigger);
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');

      expect(getByRole('option', { name: expected })).toHaveAttribute(
        'data-highlighted',
        'true'
      );
      expect(getByRole('option', { name: 'Blue' })).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    }
  );

  it.each([
    ['empty', []],
    ['all disabled', [{ label: 'Red', value: 'red', disabled: true }]],
  ])(
    'does not select or highlight an item in an %s list',
    async (_state, items) => {
      const onSelectionChange = jest.fn();
      const { getByRole } = render(
        <Select
          labelText="Color"
          items={items}
          onSelectionChange={onSelectionChange}
        />
      );
      const trigger = getByRole('combobox');

      await userEvent.click(trigger);
      await userEvent.keyboard('{ArrowDown}{ArrowUp}');
      expect(trigger).toHaveAttribute('aria-activedescendant', '');

      await userEvent.keyboard('{Enter}');
      expect(onSelectionChange).not.toHaveBeenCalled();
      expect(trigger).toHaveFocus();
    }
  );

  it.each([
    ['Tab', '{Tab}', 'After'],
    ['Shift+Tab', '{Shift>}{Tab}{/Shift}', 'Before'],
    ['outside click', null, 'After'],
  ])(
    'does not add a highlighted multi item on %s',
    async (_event, key, destination) => {
      const onSelectedItemsChange = jest.fn();
      const { getByRole, queryByRole } = render(
        <>
          <button>Before</button>
          <Select
            isMulti
            labelText="Color"
            items={colors}
            initialSelectedItems={['Red']}
            onSelectedItemsChange={onSelectedItemsChange}
          />
          <button>After</button>
        </>
      );
      const trigger = getByRole('combobox');

      await userEvent.click(trigger);
      await userEvent.keyboard('{ArrowDown}');

      if (key) {
        await userEvent.keyboard(key);
      } else {
        await userEvent.click(getByRole('button', { name: destination }));
      }

      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      );
      expect(queryByRole('button', { name: /Green/ })).not.toBeInTheDocument();
      expect(onSelectedItemsChange).not.toHaveBeenCalled();
    }
  );

  it.each([
    ['Tab', '{Tab}', 'After'],
    ['Shift+Tab', '{Shift>}{Tab}{/Shift}', 'Before'],
    ['outside click', null, 'After'],
  ])(
    'keeps the previous selection on %s without trapping focus',
    async (_event, key, destination) => {
      const { getByRole, getByTestId } = render(
        <>
          <button>Before</button>
          <Select labelText="Color" items={colors} initialSelectedItem="Red" />
          <button>After</button>
        </>
      );
      const trigger = getByRole('combobox');
      const next = getByRole('button', { name: destination });

      await userEvent.click(trigger);
      await userEvent.keyboard('{ArrowDown}');

      if (key) {
        await userEvent.keyboard(key);
      } else {
        await userEvent.click(next);
      }

      expect(next).toHaveFocus();
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      );
      expect(getByTestId('selectedItemText')).toHaveTextContent('Red');
    }
  );
});

describe('opening a prehighlighted menu', () => {
  it('scrolls an unchanged highlighted index through the supplied override', async () => {
    const scrollIntoView = jest.fn();
    const items = Array.from({ length: 30 }, (_, index) => `Item ${index}`);
    const { getByRole } = render(
      <Select
        labelText="Long list"
        items={items}
        initialHighlightedIndex={20}
        scrollIntoView={scrollIntoView}
      />
    );

    await userEvent.click(getByRole('combobox'));
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenCalledWith(
      getByRole('option', { name: 'Item 20', exact: true }),
      getByRole('listbox')
    );
  });
});

describe.each([
  ['Select', Select, false],
  ['MultiSelect', Select, true],
  ['Combobox', Combobox, false],
  ['MultiCombobox', Combobox, true],
])('%s modified arrow compatibility', (_name, Component, isMulti) => {
  it.each([
    ['End', 'A', undefined],
    ['Home', 'C', undefined],
    ['Home', 'A', 'bounded'],
  ])(
    'Alt+ArrowUp after %s navigates without selecting or closing',
    async (start, expected, navigationMode) => {
      const onSelectedItemChange = jest.fn();
      const onSelectedItemsChange = jest.fn();
      const items = [
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b', disabled: true },
        { label: 'C', value: 'c' },
      ];
      const { getByRole } = render(
        <Component
          labelText="Modified arrows"
          items={items}
          isMulti={isMulti}
          navigationMode={navigationMode}
          onSelectedItemChange={onSelectedItemChange}
          onSelectedItemsChange={onSelectedItemsChange}
        />
      );

      const control = getByRole('combobox');

      await userEvent.click(control);
      await userEvent.keyboard(`{${start}}{Alt>}{ArrowUp}{/Alt}`);
      expect(onSelectedItemChange).not.toHaveBeenCalled();
      expect(onSelectedItemsChange).not.toHaveBeenCalled();
      expect(control).toHaveAttribute('aria-expanded', 'true');
      expect(
        getByRole('option', { name: expected, exact: true })
      ).toHaveAttribute('data-highlighted', 'true');
    }
  );
});
