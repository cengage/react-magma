import React from 'react';

import { fireEvent, render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { LabelPosition } from '../Label';

import { MultiSelect, MultiSelectSelectionBehavior } from '.';

describe('MultiSelect', () => {
  const items = [
    { label: 'Editor', value: 'editor' },
    { label: 'Owner', value: 'owner' },
    { disabled: true, label: 'Reader', value: 'reader' },
    { label: 'Uploader', value: 'uploader' },
  ];

  it('renders a labeled multiselect and opens its options', async () => {
    const { getByRole } = render(
      <MultiSelect items={items} labelText="Roles" />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('option', { name: 'Editor' })).toBeInTheDocument();
  });

  it('groups options beneath accessible group labels', async () => {
    const groupedItems = [
      { group: 'Design', label: 'Product Designer', value: 'designer' },
      { group: 'Design', label: 'UX Researcher', value: 'researcher' },
      { group: 'Engineering', label: 'Engineer', value: 'engineer' },
    ];
    const { container, getAllByTestId, getByRole } = render(
      <MultiSelect
        itemToGroup={item => item.group}
        items={groupedItems}
        labelText="Project collaborators"
      />
    );

    await userEvent.click(
      getByRole('combobox', { name: 'Project collaborators' })
    );

    const designGroup = getByRole('group', { name: 'Design' });
    const engineeringGroup = getByRole('group', { name: 'Engineering' });

    expect(
      within(designGroup).getByRole('option', { name: 'Product Designer' })
    ).toBeInTheDocument();
    expect(
      within(engineeringGroup).getByRole('option', { name: 'Engineer' })
    ).toBeInTheDocument();
    expect(getAllByTestId('multiSelect-groupDivider')).toHaveLength(1);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('uses the shared placeholder colors', () => {
    const { getByRole, rerender } = render(
      <MultiSelect items={items} labelText="Roles" placeholder="Choose roles" />
    );

    expect(getByRole('combobox', { name: 'Roles' })).toHaveStyle(
      'color: #56667A'
    );

    rerender(
      <MultiSelect
        isInverse
        items={items}
        labelText="Roles"
        placeholder="Choose roles"
      />
    );

    expect(getByRole('combobox', { name: 'Roles' })).toHaveStyle(
      'color: #8B99AA'
    );
  });

  it('uses disabled solid-button styles for the selection badge', () => {
    const { getByText } = render(
      <MultiSelect
        defaultSelectedItems={[items[0]]}
        disabled
        items={items}
        labelText="Roles"
      />
    );
    const badge = getByText('1 selected', {
      selector: 'span[aria-disabled="true"]',
    });

    expect(badge).toHaveStyleRule('background', magma.colors.neutral200);
    expect(badge).toHaveStyleRule('color', magma.colors.neutral500);
  });

  it('keeps selected items visible so they can be toggled', async () => {
    const { getByRole } = render(
      <MultiSelect items={items} labelText="Roles" />
    );

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));
    const editorOption = getByRole('option', { name: 'Editor' });

    await userEvent.click(editorOption);

    expect(editorOption).toHaveAttribute('aria-selected', 'true');
    expect(
      getByRole('button', { name: /Clear all selections/ })
    ).toHaveTextContent('1 selected');

    await userEvent.click(editorOption);

    expect(editorOption).toHaveAttribute('aria-selected', 'false');
  });

  it('clears all selections when the summary badge is dismissed', async () => {
    const onSelectedItemsChange = jest.fn();
    const { getByRole, queryByRole } = render(
      <MultiSelect
        defaultSelectedItems={items.slice(0, 2)}
        items={items}
        labelText="Roles"
        onSelectedItemsChange={onSelectedItemsChange}
        placeholder="Choose roles"
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(
      getByRole('button', { name: '2 selected. Clear all selections' })
    );

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([]);
    expect(
      queryByRole('button', { name: /Clear all selections/ })
    ).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent('Choose roles');
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('uses separate tab stops for the selection badge and field', async () => {
    const { getByRole } = render(
      <>
        <button type="button">Before</button>
        <MultiSelect
          defaultSelectedItems={[items[0]]}
          items={items}
          labelText="Roles"
        />
      </>
    );
    const field = getByRole('combobox', { name: 'Roles' });
    const selectionBadge = getByRole('button', {
      name: '1 selected. Clear all selections',
    });
    const fieldContainer = field.closest('[data-multiselect-field]');

    getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();

    expect(selectionBadge).toHaveFocus();
    expect(field).not.toHaveFocus();
    expect(fieldContainer).toHaveAttribute('data-badge-focused', 'true');

    await userEvent.tab();

    expect(field).toHaveFocus();
    expect(fieldContainer).toHaveAttribute('data-badge-focused', 'false');
  });

  it('tabs directly to the field when there is no selection badge', async () => {
    const { getByRole } = render(
      <>
        <button type="button">Before</button>
        <MultiSelect items={items} labelText="Roles" />
      </>
    );

    getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();

    expect(getByRole('combobox', { name: 'Roles' })).toHaveFocus();
  });

  it('restores the field focus indicator after clearing and applying filterable selections', async () => {
    const { getByRole } = render(
      <>
        <button type="button">Before</button>
        <MultiSelect
          defaultSelectedItems={[items[0]]}
          isFilterable
          items={items}
          labelText="Roles"
          selectionBehavior={MultiSelectSelectionBehavior.deferred}
        />
      </>
    );
    const trigger = getByRole('combobox', { name: 'Roles' });
    const fieldContainer = trigger.closest('[data-multiselect-field]');

    getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();

    expect(fieldContainer).toHaveAttribute('data-badge-focused', 'true');

    await userEvent.keyboard('{Enter}');

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(fieldContainer).toHaveAttribute('data-badge-focused', 'false');

    await userEvent.click(trigger);
    await userEvent.click(getByRole('option', { name: 'Owner' }));
    await userEvent.click(getByRole('button', { name: 'Apply' }));

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(fieldContainer).toHaveAttribute('data-badge-focused', 'false');
  });

  it('selects and deselects all enabled items', async () => {
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        hasSelectAll
        items={items}
        labelText="Roles"
        onSelectedItemsChange={onSelectedItemsChange}
      />
    );

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));
    const selectAllOption = getByRole('option', { name: 'Select all' });

    await userEvent.click(selectAllOption);

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([
      items[0],
      items[1],
      items[3],
    ]);
    expect(selectAllOption).toHaveAttribute('aria-selected', 'true');
    expect(getByRole('option', { name: 'Reader' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );

    await userEvent.click(selectAllOption);

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([]);
  });

  it('automatically selects required items and prevents them from being changed', async () => {
    const requiredItems = [
      { label: 'Current school', required: true, value: 'current-school' },
      { label: 'Optional school', value: 'optional-school' },
    ];
    const onSelectedItemsChange = jest.fn();
    const { getByRole, getByText } = render(
      <MultiSelect
        isItemRequired={item => item.required}
        items={requiredItems}
        labelText="Schools"
        onSelectedItemsChange={onSelectedItemsChange}
      />
    );

    expect(getByText('1 selected', { selector: 'span' })).toBeInTheDocument();

    await userEvent.click(getByRole('combobox', { name: 'Schools' }));

    const requiredOption = getByRole('option', { name: 'Current school' });

    expect(requiredOption).toHaveAttribute('aria-selected', 'true');
    expect(requiredOption).toHaveAttribute('aria-disabled', 'true');
    expect(requiredOption.querySelector('svg')).toBeInTheDocument();

    await userEvent.click(requiredOption);

    expect(onSelectedItemsChange).not.toHaveBeenCalled();
  });

  it('preserves required items when optional selections are cleared', async () => {
    const requiredItems = [
      { label: 'Current school', required: true, value: 'current-school' },
      { label: 'Optional school', value: 'optional-school' },
    ];
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        isItemRequired={item => item.required}
        items={requiredItems}
        labelText="Schools"
        onSelectedItemsChange={onSelectedItemsChange}
      />
    );

    await userEvent.click(getByRole('combobox', { name: 'Schools' }));
    await userEvent.click(getByRole('option', { name: 'Optional school' }));
    await userEvent.click(
      getByRole('button', { name: /Clear all selections/ })
    );

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([requiredItems[0]]);
    expect(
      getByRole('combobox', { name: 'Schools' })
    ).toHaveAccessibleDescription('1 selected');
  });

  it('preserves required items when Select all is deselected', async () => {
    const requiredItems = [
      { label: 'Current school', required: true, value: 'current-school' },
      { label: 'Optional school', value: 'optional-school' },
    ];
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        hasSelectAll
        isItemRequired={item => item.required}
        items={requiredItems}
        labelText="Schools"
        onSelectedItemsChange={onSelectedItemsChange}
      />
    );

    await userEvent.click(getByRole('combobox', { name: 'Schools' }));
    const selectAllOption = getByRole('option', { name: 'Select all' });

    await userEvent.click(selectAllOption);
    await userEvent.click(selectAllOption);

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([requiredItems[0]]);
    expect(getByRole('option', { name: 'Current school' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('preserves required items in deferred selection', async () => {
    const requiredItems = [
      { label: 'Current school', required: true, value: 'current-school' },
      { label: 'Optional school', value: 'optional-school' },
    ];
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        isItemRequired={item => item.required}
        items={requiredItems}
        labelText="Schools"
        onSelectedItemsChange={onSelectedItemsChange}
        selectionBehavior={MultiSelectSelectionBehavior.deferred}
      />
    );

    await userEvent.click(getByRole('combobox', { name: 'Schools' }));
    await userEvent.click(getByRole('option', { name: 'Optional school' }));
    await userEvent.click(getByRole('button', { name: 'Apply' }));

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith(requiredItems);
  });

  it('separates and indents items beneath the Select all option', async () => {
    const { getByRole, getByTestId } = render(
      <MultiSelect hasSelectAll items={items} labelText="Roles" />
    );

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));

    expect(getByTestId('multiSelect-selectAllDivider')).toHaveStyle(
      'height: 1px'
    );
    expect(getByRole('option', { name: 'Editor' })).toHaveStyle(
      'padding-left: 32px'
    );
  });

  it('filters options without removing selected options from the source', async () => {
    const { getByRole, queryByRole } = render(
      <MultiSelect isFilterable items={items} labelText="Roles" />
    );
    const input = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(input);
    await userEvent.type(input, 'own');

    expect(getByRole('option', { name: 'Owner' })).toBeInTheDocument();
    expect(queryByRole('option', { name: 'Editor' })).not.toBeInTheDocument();
  });

  it('supports a custom filter placeholder', async () => {
    const { getByRole } = render(
      <MultiSelect
        filterPlaceholder="Search roles"
        isFilterable
        items={items}
        labelText="Roles"
      />
    );
    const input = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(input);

    expect(input).toHaveAttribute('placeholder', 'Search roles');
  });

  it('announces when filtering returns no options', async () => {
    const { getByRole, getByText, queryByText } = render(
      <MultiSelect isFilterable items={items} labelText="Roles" />
    );
    const input = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(input);
    await userEvent.type(input, 'No matching role');

    expect(getByRole('listbox')).toHaveTextContent('No options available');
    await waitFor(() =>
      expect(
        getByText('No options available', {
          selector: '[aria-live="polite"]',
        })
      ).toBeInTheDocument()
    );

    await userEvent.clear(input);

    await waitFor(() =>
      expect(
        queryByText('No options available', {
          selector: '[aria-live="polite"]',
        })
      ).not.toBeInTheDocument()
    );

    await userEvent.type(input, 'Still no matching role');

    await waitFor(() =>
      expect(
        getByText('No options available', {
          selector: '[aria-live="polite"]',
        })
      ).toBeInTheDocument()
    );
  });

  it('selects only the enabled filtered results', async () => {
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        hasSelectAll
        isFilterable
        items={items}
        labelText="Roles"
        onSelectedItemsChange={onSelectedItemsChange}
      />
    );
    const input = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(input);
    await userEvent.type(input, 'own');
    await userEvent.click(getByRole('option', { name: 'Select all' }));

    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([items[1]]);
  });

  it('supports a controlled selection', async () => {
    function ControlledExample() {
      const [selectedItems, setSelectedItems] = React.useState([]);

      return (
        <MultiSelect
          items={items}
          labelText="Roles"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      );
    }

    const { getByRole } = render(<ControlledExample />);

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));
    await userEvent.click(getByRole('option', { name: 'Uploader' }));

    expect(
      getByRole('button', { name: /Clear all selections/ })
    ).toHaveTextContent('1 selected');
  });

  it('defers selection changes until they are applied', async () => {
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        defaultSelectedItems={[items[0]]}
        items={items}
        labelText="Roles"
        onSelectedItemsChange={onSelectedItemsChange}
        selectionBehavior={MultiSelectSelectionBehavior.deferred}
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(trigger);

    const applyButton = getByRole('button', { name: 'Apply' });
    expect(applyButton).toBeDisabled();

    await userEvent.click(getByRole('option', { name: 'Owner' }));

    expect(onSelectedItemsChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAccessibleDescription('1 selected');
    expect(applyButton).toBeEnabled();

    await userEvent.click(applyButton);

    expect(onSelectedItemsChange).toHaveBeenCalledTimes(1);
    expect(onSelectedItemsChange).toHaveBeenLastCalledWith([
      items[0],
      items[1],
    ]);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAccessibleDescription('2 selected');
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('discards deferred changes when they are canceled', async () => {
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        items={items}
        labelText="Roles"
        onSelectedItemsChange={onSelectedItemsChange}
        selectionBehavior={MultiSelectSelectionBehavior.deferred}
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(trigger);
    await userEvent.click(getByRole('option', { name: 'Owner' }));
    await userEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(onSelectedItemsChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    expect(getByRole('option', { name: 'Owner' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('discards deferred changes when Escape is pressed', async () => {
    const onSelectedItemsChange = jest.fn();
    const { getByRole } = render(
      <MultiSelect
        items={items}
        labelText="Roles"
        onSelectedItemsChange={onSelectedItemsChange}
        selectionBehavior={MultiSelectSelectionBehavior.deferred}
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{Enter}{Escape}');

    expect(onSelectedItemsChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.keyboard('{ArrowDown}');

    expect(getByRole('option', { name: 'Editor' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('moves focus from the active option to Cancel and restores it', async () => {
    const { getByRole } = render(
      <MultiSelect
        items={items}
        labelText="Roles"
        selectionBehavior={MultiSelectSelectionBehavior.deferred}
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    const ownerOption = getByRole('option', { name: 'Owner' });
    const cancelButton = getByRole('button', { name: 'Cancel' });
    const root = trigger.closest('[data-trigger-focused]');

    expect(root).toHaveAttribute('data-trigger-focused', 'true');

    await userEvent.tab();

    expect(cancelButton).toHaveFocus();
    expect(root).toHaveAttribute('data-trigger-focused', 'false');

    await userEvent.tab({ shift: true });

    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-activedescendant', ownerOption.id);
    expect(root).toHaveAttribute('data-trigger-focused', 'true');
  });

  it('supports a custom selection summary', () => {
    const { getByRole } = render(
      <MultiSelect
        defaultSelectedItems={items.slice(0, 2)}
        items={items}
        labelText="Roles"
        renderSelectedItems={selectedItems =>
          `${selectedItems.length} custom selections`
        }
      />
    );

    expect(
      getByRole('button', { name: /Clear all selections/ })
    ).toHaveTextContent('2 custom selections');
  });

  it('supports keyboard selection while leaving the menu open', async () => {
    const { getByRole } = render(
      <MultiSelect items={items} labelText="Roles" />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('option', { name: 'Editor' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('does not move keyboard focus when an option is hovered', async () => {
    const { getByRole } = render(
      <MultiSelect items={items} labelText="Roles" />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(trigger);
    const activeDescendant = trigger.getAttribute('aria-activedescendant');

    fireEvent.mouseMove(getByRole('option', { name: 'Owner' }));

    expect(trigger).toHaveAttribute('aria-activedescendant', activeDescendant);
  });

  it('moves the active option when an option is clicked', async () => {
    const { getByRole } = render(
      <MultiSelect isFilterable items={items} labelText="Roles" />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(trigger);
    const ownerOption = getByRole('option', { name: 'Owner' });
    await userEvent.click(ownerOption);

    expect(trigger).toHaveAttribute('aria-activedescendant', ownerOption.id);
    expect(ownerOption).toHaveAttribute('aria-selected', 'true');
  });

  it('continues keyboard navigation after an option is clicked', async () => {
    const { getByRole } = render(
      <MultiSelect isFilterable items={items} labelText="Roles" />
    );

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));
    await userEvent.click(getByRole('option', { name: 'Owner' }));

    const trigger = getByRole('combobox', { name: 'Roles' });
    const uploaderOption = getByRole('option', { name: 'Uploader' });

    expect(trigger).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');

    expect(trigger).toHaveAttribute('aria-activedescendant', uploaderOption.id);
  });

  it('scrolls the highlighted option into view during keyboard navigation', async () => {
    const scrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    const { getByRole } = render(
      <MultiSelect items={items} labelText="Roles" />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
  });

  it('skips disabled options during keyboard navigation', async () => {
    const disabledFirstItems = [
      { disabled: true, label: 'Unavailable', value: 'unavailable' },
      { label: 'Available', value: 'available' },
    ];
    const { getByRole } = render(
      <MultiSelect items={disabledFirstItems} labelText="Roles" />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(getByRole('option', { name: 'Available' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('leaves Home and End available for editing in filterable mode', async () => {
    const { getByRole } = render(
      <MultiSelect isFilterable items={items} labelText="Roles" />
    );
    const input = getByRole('combobox', { name: 'Roles' });

    await userEvent.click(input);

    expect(fireEvent.keyDown(input, { key: 'Home' })).toBe(true);
    expect(fireEvent.keyDown(input, { key: 'End' })).toBe(true);
  });

  it('exposes its selection summary and error state', () => {
    const { getByRole } = render(
      <MultiSelect
        defaultSelectedItems={[items[0]]}
        errorMessage="Choose a valid combination"
        items={items}
        labelText="Roles"
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    expect(trigger).toHaveAccessibleDescription(
      'Choose a valid combination 1 selected'
    );
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports standard form-field content and accessibility props', () => {
    const triggerRef = React.createRef();
    const onFocus = jest.fn();
    const { getByRole, getByText } = render(
      <>
        <p id="external-guidance">External guidance</p>
        <MultiSelect
          additionalContent={<button type="button">Role help</button>}
          ariaDescribedBy="external-guidance"
          ariaLabel="Role choices"
          helperMessage="Choose every role that applies."
          innerRef={triggerRef}
          items={items}
          labelText="Roles"
          onFocus={onFocus}
        />
      </>
    );
    const trigger = getByRole('combobox', { name: 'Role choices' });

    trigger.focus();

    expect(triggerRef.current).toBe(trigger);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAccessibleDescription(
      'External guidance Choose every role that applies.'
    );
    expect(getByText('Role help')).toBeInTheDocument();
  });

  it('keeps additional content visible with a left-positioned label', () => {
    const { getByText } = render(
      <MultiSelect
        additionalContent={<button type="button">Role help</button>}
        items={items}
        labelPosition={LabelPosition.left}
        labelText="Roles"
      />
    );

    expect(getByText('Role help')).toBeInTheDocument();
  });

  it('describes a partially selected Select all option', async () => {
    const { getByRole } = render(
      <MultiSelect hasSelectAll items={items} labelText="Roles" />
    );

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));
    await userEvent.click(getByRole('option', { name: 'Editor' }));

    expect(
      getByRole('option', {
        name: 'Select all, Some subitems are selected',
      })
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('allows consumers to prevent internal keyboard handling', async () => {
    const { getByRole } = render(
      <MultiSelect
        items={items}
        labelText="Roles"
        onKeyDown={event => event.preventDefault()}
      />
    );
    const trigger = getByRole('combobox', { name: 'Roles' });

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not violate accessibility standards', async () => {
    const { container, getByRole } = render(
      <MultiSelect hasSelectAll items={items} labelText="Roles" />
    );

    await userEvent.click(getByRole('combobox', { name: 'Roles' }));

    const result = await axe(container.innerHTML);

    expect(result).toHaveNoViolations();
  });
});
