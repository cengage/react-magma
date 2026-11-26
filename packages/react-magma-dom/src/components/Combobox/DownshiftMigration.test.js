import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Combobox } from '.';

describe('legacy Combobox keyboard behavior', () => {
  it.each([false, true])(
    'clears the selected item on the first open-menu Escape (controlled=%s)',
    async controlled => {
      const onSelectedItemChange = jest.fn();

      function Consumer() {
        const [selectedItem, setSelectedItem] = React.useState('Red');

        return (
          <Combobox
            labelText="Colors"
            items={['Red', 'Blue']}
            {...(controlled
              ? { selectedItem }
              : { initialSelectedItem: 'Red' })}
            onSelectedItemChange={changes => {
              onSelectedItemChange(changes);
              setSelectedItem(changes.selectedItem);
            }}
          />
        );
      }

      render(<Consumer />);
      const input = screen.getByRole('combobox');

      await userEvent.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
      await userEvent.keyboard('{Escape}');
      expect(input).toHaveValue('');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(onSelectedItemChange).toHaveBeenCalledWith(
        expect.objectContaining({ selectedItem: null })
      );
    }
  );

  it('clears the query on open-menu Escape while retaining selected chips', async () => {
    render(
      <Combobox
        labelText="Colors"
        items={['Red', 'Blue', 'Green']}
        initialSelectedItems={['Red']}
        isMulti
      />
    );
    const input = screen.getByRole('combobox');

    await userEvent.type(input, 'G');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.getByRole('button', { name: 'clear item Red' })
    ).toBeInTheDocument();
  });

  it('allows Enter to submit the form when the open menu has no highlight', async () => {
    const onSubmit = jest.fn(event => event.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Combobox labelText="Colors" items={['Red', 'Blue']} />
        <button type="submit">Submit</button>
      </form>
    );
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input.getAttribute('aria-activedescendant') || '').toBe('');
    await userEvent.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('MultiCombobox chip removal from the input', () => {
  it.each([true, false])(
    'removes selected items with Backspace when the menu is open=%s',
    async isOpen => {
      render(
        <Combobox
          labelText="Colors"
          items={['Red', 'Blue', 'Green']}
          initialSelectedItems={['Red', 'Blue']}
          isMulti
          hasPersistentMenu
        />
      );

      const input = screen.getByRole('combobox');

      await userEvent.click(input);
      if (!isOpen) {
        await userEvent.keyboard('{Escape}');
      }
      expect(input).toHaveAttribute('aria-expanded', String(isOpen));
      expect(input).toHaveFocus();
      expect(input).toHaveValue('');

      await userEvent.keyboard('{Backspace}');
      expect(
        screen.queryByRole('button', { name: 'clear item Blue' })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'clear item Red' })
      ).toBeInTheDocument();
      expect(input).toHaveFocus();

      await userEvent.keyboard('{Backspace}');
      expect(
        screen.queryByRole('button', { name: 'clear item Red' })
      ).not.toBeInTheDocument();
      expect(input).toHaveAttribute('aria-expanded', String(isOpen));
      expect(input).toHaveFocus();
    }
  );

  it.each([true, false])(
    'removes a chip from a nonempty query only at a collapsed start caret (open=%s)',
    async isOpen => {
      render(
        <Combobox
          labelText="Colors"
          items={['Red', 'Blue', 'Green']}
          initialSelectedItems={['Red', 'Blue']}
          isMulti
          hasPersistentMenu
          isOpen={isOpen}
        />
      );
      const input = screen.getByRole('combobox');

      await userEvent.type(input, 'Green');
      expect(input).toHaveAttribute('aria-expanded', String(isOpen));

      input.setSelectionRange(1, 1);
      await userEvent.keyboard('{Backspace}');
      expect(input).toHaveValue('reen');
      expect(
        screen.getByRole('button', { name: 'clear item Blue' })
      ).toBeInTheDocument();

      input.setSelectionRange(0, 1);
      await userEvent.keyboard('{Backspace}');
      expect(input).toHaveValue('een');
      expect(
        screen.getByRole('button', { name: 'clear item Blue' })
      ).toBeInTheDocument();

      input.setSelectionRange(0, 0);
      await userEvent.keyboard('{Backspace}');
      expect(input).toHaveValue('een');
      expect(
        screen.queryByRole('button', { name: 'clear item Blue' })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'clear item Red' })
      ).toBeInTheDocument();
    }
  );

  it('edits a nonempty query without removing selected items', async () => {
    render(
      <Combobox
        labelText="Colors"
        items={['Red', 'Blue', 'Green']}
        initialSelectedItems={['Red', 'Blue']}
        isMulti
        hasPersistentMenu
      />
    );

    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.type(input, 'G');
    expect(input).toHaveValue('G');
    await userEvent.keyboard('{Backspace}');
    expect(input).toHaveValue('');
    expect(
      screen.getByRole('button', { name: 'clear item Blue' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'clear item Red' })
    ).toBeInTheDocument();
  });
});

// These exercise the consumer-visible integration, including native input refs.
describe.each([false, true])('Combobox migration (isMulti=%s)', isMulti => {
  it('calls the keyboard callback once per key and forwards the input ref', async () => {
    const onInputKeyDown = jest.fn();
    const innerRef = React.createRef();

    render(
      <Combobox
        labelText="Colors"
        items={['Red', 'Blue']}
        isMulti={isMulti}
        innerRef={innerRef}
        onInputKeyDown={onInputKeyDown}
      />
    );

    const input = screen.getByRole('combobox');

    expect(innerRef.current).toBe(input);
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    expect(onInputKeyDown).toHaveBeenCalledTimes(1);
  });

  it('keeps disabled-only and empty menus unselected when pressing Enter', async () => {
    const onSelectedItemsChange = jest.fn();
    const onSelectedItemChange = jest.fn();

    const { rerender } = render(
      <Combobox
        labelText="Colors"
        items={[{ label: 'Red', value: 'red', disabled: true }]}
        isMulti={isMulti}
        disableCreateItem
        onSelectedItemChange={onSelectedItemChange}
        onSelectedItemsChange={onSelectedItemsChange}
      />
    );

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onSelectedItemChange).not.toHaveBeenCalled();
    expect(onSelectedItemsChange).not.toHaveBeenCalled();
    rerender(<Combobox labelText="Colors" items={[]} isMulti={isMulti} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('combobox')).toHaveValue('');
  });
});

describe('controlled Combobox selection', () => {
  it.each(['strings', 'objects'])(
    'supports null and reselection with %s',
    async shape => {
      const items =
        shape === 'strings'
          ? ['Red', 'Blue']
          : [
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
            ];

      function Consumer() {
        const [selectedItem, setSelectedItem] = React.useState(null);

        return (
          <>
            <Combobox
              labelText="Colors"
              items={items}
              selectedItem={selectedItem}
              onSelectionChange={setSelectedItem}
            />
            <button onClick={() => setSelectedItem(null)}>
              Clear externally
            </button>
          </>
        );
      }

      render(<Consumer />);
      const input = screen.getByRole('combobox');

      await userEvent.click(input);
      await userEvent.click(screen.getByRole('option', { name: 'Red' }));
      expect(input).toHaveValue('Red');
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear externally' })
      );
      expect(input).toHaveValue('');
      await userEvent.click(input);
      await userEvent.click(screen.getByRole('option', { name: 'Blue' }));
      expect(input).toHaveValue('Blue');
    }
  );

  it('keeps custom keyed selections through recreated async options with duplicate text', async () => {
    const itemToString = item => item?.text || '';
    const itemToKey = item => item?.id;
    const selectedItem = { id: 2, text: 'Same' };
    const { rerender } = render(
      <Combobox
        labelText="Colors"
        items={[{ id: 1, text: 'Same' }, selectedItem]}
        itemToString={itemToString}
        itemToKey={itemToKey}
        selectedItem={selectedItem}
      />
    );

    rerender(
      <Combobox
        labelText="Colors"
        items={[
          { id: 1, text: 'Same' },
          { id: 2, text: 'Same' },
        ]}
        itemToString={itemToString}
        itemToKey={itemToKey}
        selectedItem={{ id: 2, text: 'Same' }}
      />
    );
    await userEvent.click(screen.getByRole('combobox'));
    const options = screen.getAllByRole('option');

    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });
});

describe('custom scrolling', () => {
  it('lets scrollIntoView own scrolling without a second native scroll', async () => {
    const scrollIntoView = jest.fn();
    const nativeScroll = jest.fn();
    const previous = Element.prototype.scrollIntoView;

    Element.prototype.scrollIntoView = nativeScroll;
    try {
      render(
        <Combobox
          labelText="Colors"
          items={['Red', 'Blue']}
          scrollIntoView={scrollIntoView}
        />
      );
      const input = screen.getByRole('combobox');

      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(scrollIntoView).toHaveBeenCalled();
      expect(nativeScroll).not.toHaveBeenCalled();
    } finally {
      Element.prototype.scrollIntoView = previous;
    }
  });
});

describe('created item notifications', () => {
  it('notifies nullable consumers with the transformed item, without a create placeholder', async () => {
    const onSelectionChange = jest.fn();

    render(
      <Combobox
        labelText="Colors"
        defaultItems={['Red']}
        onSelectionChange={onSelectionChange}
      />
    );
    await userEvent.type(screen.getByRole('combobox'), 'Azure');
    await userEvent.click(screen.getByRole('option'));
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledWith('Azure');
  });
});

describe('async typeahead selection', () => {
  it('does not pass a missing selected item into the disabled predicate', async () => {
    render(
      <Combobox
        labelText="Colors"
        items={[{ id: 1, text: 'Available' }]}
        selectedItem={{ id: 2, text: 'Selected' }}
        isTypeahead
        itemToString={item => item?.text || ''}
        itemToKey={item => item?.id}
        isItemDisabled={item => Boolean(item.disabled)}
      />
    );

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveValue('Selected');
    expect(screen.getByRole('option', { name: 'Available' })).toBeVisible();
  });
});
