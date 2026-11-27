import React from 'react';

import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  useCombobox as upstreamCombobox,
  useSelect as upstreamSelect,
  useMultipleSelection as upstreamMultiple,
} from 'downshift';

import { Combobox } from '../../components/Combobox';
import { Select } from '../../components/Select';
import { useMultiStatusMessages } from './useMultiStatusMessages';

import {
  resolveNativeOptions,
  useCombobox,
  useSelect,
  useMultipleSelection,
} from '.';

function register(hook) {
  hook.getMenuProps({}, { suppressRefError: true });
  (hook.getInputProps || hook.getToggleButtonProps)(
    {},
    { suppressRefError: true }
  );

  return hook;
}

it.each([false, true])(
  'keeps typed Create navigation safe on Alt+ArrowUp, multi=%s',
  async isMulti => {
    const stringify = jest.fn(item => (item === null ? '' : item.name.trim()));
    render(
      <Combobox
        isMulti={isMulti}
        labelText="Typed creation"
        defaultItems={[{ name: 'Red' }]}
        downshift={{ combobox: { itemToString: stringify } }}
      />
    );
    await userEvent.type(screen.getByRole('combobox'), 'Re');
    await userEvent.keyboard('{End}{Alt>}{ArrowUp}{/Alt}');
    expect(screen.getByRole('option', { name: 'Red' })).toHaveAttribute(
      'data-highlighted',
      'true'
    );
    expect(stringify).not.toHaveBeenCalledWith(undefined);
    expect(screen.getByRole('listbox')).toBeVisible();
  }
);

describe.each([
  [Select, 'select'],
  [Combobox, 'combobox'],
])('multi native %s boundaries', (Component, group) => {
  it.each(['', 0, false])(
    'adds, removes and reselects falsy Item %p',
    async value => {
      const selected = jest.fn();
      render(
        <Component
          isMulti
          labelText="Falsy item"
          items={[value, 'Green']}
          downshift={{
            [group]: {
              itemToString: item => (item === value ? 'Falsy' : (item ?? '')),
            },
            multipleSelection: { onSelectedItemsChange: selected },
          }}
        />
      );
      for (let attempt = 0; attempt < 2; attempt++) {
        await userEvent.click(screen.getByRole('combobox'));
        await userEvent.click(screen.getByRole('option', { name: 'Falsy' }));
        expect(selected).toHaveBeenLastCalledWith(
          expect.objectContaining({ selectedItems: [value] })
        );
        await userEvent.click(
          screen.getByText('Falsy', { selector: 'button' })
        );
        expect(selected).toHaveBeenLastCalledWith(
          expect.objectContaining({ selectedItems: [] })
        );
      }
    }
  );

  it('publishes chip status when menu cleanup requests silence', async () => {
    const multiple = jest.fn(state =>
      state.selectedItems.length ? 'Chips Red selected' : 'Chips empty'
    );
    const { unmount } = render(
      <Component
        isMulti
        labelText="Status ownership"
        items={['Red', 'Green']}
        downshift={{
          [group]: { getA11yStatusMessage: () => '' },
          multipleSelection: { getA11yStatusMessage: multiple },
        }}
      />
    );
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Red' }));
    await waitFor(() =>
      expect(document.body).toHaveTextContent('Chips Red selected')
    );
    await userEvent.click(screen.getByText('Red', { selector: 'button' }));
    await waitFor(() => expect(document.body).toHaveTextContent('Chips empty'));
    unmount();
    expect(document.body).not.toHaveTextContent('Chips empty');
  });
});

describe('dual-native status publication', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('preserves original callback states, lets later meaningful menu text win, and clears silence', () => {
    const menu = jest.fn(state => state.text);
    const multiple = jest.fn(state => state.text);
    const { result } = renderHook(() => useMultiStatusMessages(menu, multiple));
    const chips = { selectedItems: ['Red'], text: 'Chip selected' };
    const opened = { isOpen: true, text: 'Menu opened' };
    act(() => {
      expect(result.current.multipleStatus(chips)).toBe('');
      result.current.menuStatus(opened);
      jest.advanceTimersByTime(200);
    });
    expect(multiple).toHaveBeenCalledTimes(1);
    expect(multiple.mock.calls[0][0]).toBe(chips);
    expect(menu).toHaveBeenCalledTimes(1);
    expect(menu.mock.calls[0][0]).toBe(opened);
    expect(document.body).toHaveTextContent('Menu opened');
    expect(document.body).not.toHaveTextContent('Chip selected');
    act(() => {
      result.current.menuStatus({ text: '' });
      jest.advanceTimersByTime(200);
    });
    expect(document.body).not.toHaveTextContent('Menu opened');
    act(() => {
      result.current.menuStatus({ text: 'Later' });
      jest.advanceTimersByTime(200);
      jest.advanceTimersByTime(499);
    });
    expect(document.body).toHaveTextContent('Later');
    act(() => jest.advanceTimersByTime(1));
    expect(document.body).not.toHaveTextContent('Later');
  });

  it('cancels local publication on ownership loss and uses the original callback for one hook', () => {
    const menu = jest.fn(() => 'Menu queued');
    const multiple = jest.fn(() => 'Chip queued');
    const { result, rerender, unmount } = renderHook(
      ({ chips }) => useMultiStatusMessages(menu, chips),
      { initialProps: { chips: multiple } }
    );
    act(() => result.current.multipleStatus({ selectedItems: ['Red'] }));
    rerender({ chips: undefined });
    act(() => jest.advanceTimersByTime(200));
    expect(document.body).not.toHaveTextContent('Chip queued');
    expect(result.current.menuStatus).toBe(menu);
    rerender({ chips: multiple });
    act(() => {
      result.current.menuStatus({});
      jest.advanceTimersByTime(200);
    });
    expect(document.body).toHaveTextContent('Menu queued');
    act(() => result.current.multipleStatus({ selectedItems: [] }));
    unmount();
    act(() => jest.advanceTimersByTime(1000));
    expect(document.body).not.toHaveTextContent('Chip queued');
    expect(document.body).not.toHaveTextContent('Menu queued');
  });

  it('isolates instances and moves publication to the new ownerDocument', () => {
    const otherDocument = document.implementation.createHTMLDocument('Other');
    const menu = () => '';
    const multiple = () => 'First instance';
    const first = renderHook(
      ({ environment }) => useMultiStatusMessages(menu, multiple, environment),
      { initialProps: { environment: undefined } }
    );
    const second = renderHook(() =>
      useMultiStatusMessages(menu, () => 'Second instance')
    );
    act(() => {
      first.result.current.multipleStatus({});
      second.result.current.multipleStatus({});
      jest.advanceTimersByTime(200);
    });
    expect(document.body).toHaveTextContent('First instance');
    expect(document.body).toHaveTextContent('Second instance');
    first.rerender({ environment: { document: otherDocument } });
    expect(document.body).not.toHaveTextContent('First instance');
    expect(document.body).toHaveTextContent('Second instance');
    act(() => {
      first.result.current.multipleStatus({});
      jest.advanceTimersByTime(200);
    });
    expect(otherDocument.body.textContent).toContain('First instance');
    first.unmount();
    expect(otherDocument.body.textContent).not.toContain('First instance');
    expect(document.body).toHaveTextContent('Second instance');
  });
});

describe.each([
  ['Select', useSelect, upstreamSelect],
  ['Combobox', useCombobox, upstreamCombobox],
])('native %s adapter contract', (_name, hook, upstream) => {
  it('delivers raw changed fields and suppresses only the replaced observer', () => {
    const native = jest.fn();
    const legacy = jest.fn();
    const independent = jest.fn();
    const { result } = renderHook(() =>
      register(
        hook({
          items: ['Red', 'Green'],
          onStateChange: legacy,
          onIsOpenChange: independent,
          native: { onStateChange: native },
        })
      )
    );

    act(() => result.current.openMenu());
    expect(native).toHaveBeenLastCalledWith({
      type: upstream.stateChangeTypes.FunctionOpenMenu,
      isOpen: true,
    });
    expect(legacy).not.toHaveBeenCalled();
    expect(independent).toHaveBeenCalled();
  });

  it.each([
    ['empty patch', () => ({}), false],
    ['previous state', state => state, false],
    ['proposal', (_state, action) => action.changes, true],
    ['partial patch', () => ({ isOpen: true }), true],
  ])(
    'applies a native reducer %s against previous state',
    (_label, reducer, open) => {
      const legacy = jest.fn((_state, action) => action.changes);
      const { result } = renderHook(() =>
        register(
          hook({
            items: ['Red'],
            stateReducer: legacy,
            native: { stateReducer: reducer },
          })
        )
      );

      act(() => result.current.openMenu());
      expect(result.current.isOpen).toBe(open);
      expect(legacy).not.toHaveBeenCalled();
    }
  );

  it('passes a full nullable state to specific native callbacks', () => {
    const native = jest.fn();
    const legacy = jest.fn();
    const { result } = renderHook(() =>
      register(
        hook({
          items: ['Red'],
          initialSelectedItem: 'Red',
          onSelectedItemChange: legacy,
          native: { onSelectedItemChange: native },
        })
      )
    );

    act(() => result.current.selectItem(null));
    expect(native).toHaveBeenLastCalledWith({
      type: upstream.stateChangeTypes.FunctionSelectItem,
      selectedItem: null,
      highlightedIndex: -1,
      isOpen: false,
      inputValue: expect.any(String),
    });
    expect(legacy).not.toHaveBeenCalled();
  });
});

it('routes native multiple-selection callbacks without converting their type', () => {
  const native = jest.fn();
  const legacy = jest.fn();
  const { result } = renderHook(() => {
    const result = useMultipleSelection({
      onStateChange: legacy,
      native: { onStateChange: native },
    });

    result.getDropdownProps({}, { suppressRefError: true });

    return result;
  });

  act(() => result.current.addSelectedItem('Red'));
  expect(native).toHaveBeenLastCalledWith({
    type: upstreamMultiple.stateChangeTypes.FunctionAddSelectedItem,
    selectedItems: ['Red'],
  });
  expect(legacy).not.toHaveBeenCalled();
});

describe.each([
  ['Select', Select, 'select'],
  ['Combobox', Combobox, 'combobox'],
])('native %s component integration', (_name, Component, group) => {
  it.each([false, true])(
    'keeps selection working with isMulti=%s',
    async isMulti => {
      const changed = jest.fn();
      const chips = jest.fn();
      const { container } = render(
        <Component
          labelText="Color"
          items={['Red', 'Green']}
          isMulti={isMulti}
          downshift={{
            [group]: { onSelectedItemChange: changed },
            ...(isMulti && {
              multipleSelection: { onSelectedItemsChange: chips },
            }),
          }}
        />
      );

      await userEvent.click(screen.getByRole('combobox'));
      await userEvent.click(screen.getByRole('option', { name: 'Green' }));
      expect(changed).toHaveBeenCalledWith(
        expect.objectContaining({ selectedItem: 'Green' })
      );
      if (!isMulti && group === 'combobox') {
        expect(screen.getByRole('combobox')).toHaveValue('Green');
      } else {
        expect(container).toHaveTextContent('Green');
      }
      if (isMulti) {
        expect(chips).toHaveBeenCalledWith(
          expect.objectContaining({ selectedItems: ['Green'] })
        );
      }
    }
  );

  it('uses the native stringifier for both options and the selected label', async () => {
    render(
      <Component
        labelText="Color"
        items={[{ name: 'Green' }]}
        downshift={{ [group]: { itemToString: item => item?.name || '' } }}
      />
    );

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Green' }));
    await waitFor(() =>
      expect(screen.getByRole('combobox')).toHaveTextContent(
        group === 'select' ? 'Green' : ''
      )
    );
    if (group === 'combobox') {
      expect(screen.getByRole('combobox')).toHaveValue('Green');
    }
  });
});

it('keeps a native menu observer independent from a legacy chips observer', async () => {
  const menu = jest.fn();
  const chips = jest.fn();
  render(
    <Select
      labelText="Color"
      items={['Red', 'Green']}
      isMulti
      onStateChange={chips}
      downshift={{ select: { onStateChange: menu } }}
    />
  );

  await userEvent.click(screen.getByRole('combobox'));
  await userEvent.click(screen.getByRole('option', { name: 'Green' }));
  expect(menu).toHaveBeenCalled();
  expect(chips).toHaveBeenCalledWith(
    expect.objectContaining({ selectedItems: ['Green'] })
  );
});

it('lets a controlled parent confirm native multi selection on rerender', async () => {
  const changed = jest.fn();
  const props = {
    labelText: 'Color',
    items: ['Red', 'Green'],
    isMulti: true,
    selectedItems: [],
    downshift: { multipleSelection: { onSelectedItemsChange: changed } },
  };
  const { rerender } = render(<Select {...props} />);
  await userEvent.click(screen.getByRole('combobox'));
  await userEvent.click(screen.getByRole('option', { name: 'Green' }));
  expect(changed).toHaveBeenCalledWith(
    expect.objectContaining({ selectedItems: ['Green'] })
  );
  expect(screen.getByRole('combobox')).not.toHaveTextContent('Green');
  rerender(<Select {...props} selectedItems={['Green']} />);
  expect(screen.getByRole('combobox')).toHaveTextContent('Green');
});

it('keeps native Combobox input observation separate from its default filtering', async () => {
  const native = jest.fn();
  const legacy = jest.fn();
  render(
    <Combobox
      labelText="Color"
      items={['Red', 'Green']}
      disableCreateItem
      onInputValueChange={legacy}
      downshift={{ combobox: { onInputValueChange: native } }}
    />
  );
  await userEvent.type(screen.getByRole('combobox'), 'Gre');
  expect(screen.getByRole('option', { name: 'Green' })).toBeInTheDocument();
  expect(screen.queryByRole('option', { name: 'Red' })).not.toBeInTheDocument();
  expect(native).toHaveBeenLastCalledWith(
    expect.objectContaining({ inputValue: 'Gre' })
  );
  expect(legacy).not.toHaveBeenCalled();
});

it('does not publish legacy status text when the native status callback requests silence', async () => {
  const legacy = jest.fn(() => 'Legacy status');
  const native = jest.fn(() => '');
  render(
    <Select
      labelText="Color"
      items={['Red', 'Green']}
      getA11yStatusMessage={legacy}
      downshift={{ select: { getA11yStatusMessage: native } }}
    />
  );
  await userEvent.click(screen.getByRole('combobox'));
  await new Promise(resolve => setTimeout(resolve, 250));
  expect(native).toHaveBeenCalled();
  expect(legacy).not.toHaveBeenCalled();
  expect(document.body).not.toHaveTextContent('Legacy status');
  expect(document.body).not.toHaveTextContent('Color list expanded');
});

it('uses actual v9 event constants for native observers in production', () => {
  const { execFileSync } = require('child_process');
  const script = `
    const {JSDOM} = require('jsdom');
    const dom = new JSDOM('<html><body><div id="root"></div></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;
    require('ts-node/register/transpile-only');
    const React = require('react');
    const {createRoot} = require('react-dom/client');
    const {flushSync} = require('react-dom');
    const adapter = require('./packages/react-magma-dom/src/utils/downshift');
    const hooks = {};
    const seen = [];
    let suppressed = 0;
    function Harness() {
      hooks.select = adapter.useSelect({items:['Red'], onStateChange(){suppressed++}, native: {
        onStateChange(changes){seen.push(['select', changes.type === adapter.DownshiftSelectStateChangeTypes.FunctionOpenMenu, typeof changes.type, changes.isOpen])}
      }});
      hooks.combo = adapter.useCombobox({items:['Red'], native: {
        onStateChange(changes){seen.push(['combo', changes.type === adapter.DownshiftComboboxStateChangeTypes.FunctionOpenMenu, typeof changes.type, changes.isOpen])}
      }});
      hooks.multi = adapter.useMultipleSelection({native: {
        onStateChange(changes){seen.push(['multi', changes.type === adapter.DownshiftMultipleSelectionStateChangeTypes.FunctionAddSelectedItem, typeof changes.type, changes.selectedItems[0]])}
      }});
      return null;
    }
    const root = createRoot(document.getElementById('root'));
    flushSync(() => root.render(React.createElement(Harness)));
    flushSync(() => hooks.select.openMenu());
    flushSync(() => hooks.combo.openMenu());
    flushSync(() => hooks.multi.addSelectedItem('Red'));
    flushSync(() => root.unmount());
    process.stdout.write(JSON.stringify({seen,suppressed}));
  `;
  const output = execFileSync(process.execPath, ['-e', script], {
    cwd: require('path').resolve(__dirname, '../../../../..'),
    env: {
      ...process.env,
      NODE_ENV: 'production',
      TS_NODE_COMPILER_OPTIONS: JSON.stringify({ module: 'commonjs' }),
    },
    encoding: 'utf8',
  });

  expect(JSON.parse(output)).toEqual({
    seen: [
      ['select', true, 'number', true],
      ['combo', true, 'number', true],
      ['multi', true, 'number', 'Red'],
    ],
    suppressed: 0,
  });
});

it('restores the legacy publisher on the first controlled update after native status is removed', () => {
  jest.useFakeTimers();
  const legacy = jest.fn(() => 'Legacy selected Red');
  const { rerender, unmount } = renderHook(
    options =>
      register(
        useSelect({
          items: ['Red'],
          getA11ySelectionMessage: legacy,
          ...options,
        })
      ),
    {
      initialProps: {
        native: { getA11yStatusMessage: () => '' },
        selectedItem: null,
      },
    }
  );

  rerender({ native: undefined, selectedItem: 'Red' });
  act(() => jest.advanceTimersByTime(200));
  expect(legacy).toHaveBeenCalledWith(
    expect.objectContaining({ selectedItem: 'Red' })
  );
  expect(document.body).toHaveTextContent('Legacy selected Red');
  unmount();
  jest.useRealTimers();
});

describe.each([false, true])('native created items, multi=%s', isMulti => {
  it.each(['click', 'Enter'])(
    'keeps custom Item values valid through creation by %s',
    async activation => {
      const seen = [];
      const created = jest.fn();
      const transform = jest.fn(item => ({ id: 2, name: item.value }));
      function observe(value) {
        if (value != null) {
          // A consumer is allowed to rely on its declared Item shape.
          seen.push(value);
        }
      }
      render(
        <Combobox
          labelText="Native create"
          items={[{ id: 1, name: 'Red' }]}
          newItemTransform={transform}
          onItemCreated={created}
          isMulti={isMulti}
          downshift={{
            combobox: {
              itemToString: item => item?.name ?? '',
              onSelectedItemChange: changes => observe(changes.selectedItem),
              onStateChange: changes => observe(changes.selectedItem),
              getA11yStatusMessage: state => {
                observe(state.selectedItem);

                return '';
              },
              stateReducer: (_state, action) => {
                observe(action.changes.selectedItem);
                action.props.items.forEach(observe);

                return action.changes;
              },
            },
            ...(isMulti && {
              multipleSelection: {
                onSelectedItemsChange: changes =>
                  changes.selectedItems.forEach(observe),
              },
            }),
          }}
        />
      );
      await userEvent.type(screen.getByRole('combobox'), 'Azure');
      if (activation === 'Enter') {
        await userEvent.keyboard('{Enter}');
      } else {
        await userEvent.click(screen.getByRole('option'));
      }
      expect(transform).toHaveBeenCalledTimes(1);
      expect(created).toHaveBeenCalledWith({ id: 2, name: 'Azure' });
      expect(seen.every(item => typeof item.name === 'string')).toBe(true);
      expect(seen.map(item => item.name.toLowerCase())).toContain('azure');
      if (isMulti) {
        expect(
          screen.getByRole('button', { name: 'clear item Azure' })
        ).toBeInTheDocument();
      } else {
        expect(screen.getByRole('combobox')).toHaveValue('Azure');
      }
    }
  );
});

it.each([
  ['Select', useSelect],
  ['Combobox', useCombobox],
])(
  'passes native state and normalized hook props to internal %s policy',
  (_name, hook) => {
    const policy = jest.fn((_state, action) => action.changes);
    const { result } = renderHook(() =>
      register(
        hook({
          items: ['Red'],
          internalStateReducer: policy,
          native: { stateReducer: (_state, action) => action.changes },
        })
      )
    );
    act(() => result.current.openMenu());
    const [state, action] = policy.mock.calls.at(-1);
    expect(state).not.toHaveProperty('keySoFar');
    expect(action.changes).not.toHaveProperty('keySoFar');
    expect(typeof action.props.itemToString).toBe('function');
  }
);

it.each(['Node', 'addEventListener', 'removeEventListener'])(
  'rejects conflicting %s in same-document hook environments',
  key => {
    const environment = {
      document,
      Node: window.Node,
      addEventListener: window.addEventListener.bind(window),
      removeEventListener: window.removeEventListener.bind(window),
    };
    const other = { ...environment, [key]: () => {} };
    expect(() =>
      resolveNativeOptions({ environment }, { environment: other })
    ).toThrow(/same environment/);
  }
);

it('uses the iframe document when navigating selected chips', async () => {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  const view = iframe.contentWindow;
  const environment = {
    document: view.document,
    Node: view.Node,
    addEventListener: view.addEventListener.bind(view),
    removeEventListener: view.removeEventListener.bind(view),
  };
  const user = userEvent.setup({ document: view.document });
  const container = view.document.createElement('div');
  view.document.body.appendChild(container);
  const result = render(
    <Select
      labelText="Frame colors"
      isMulti
      items={['Red', 'Green']}
      initialSelectedItems={['Red', 'Green']}
      downshift={{ multipleSelection: { environment } }}
    />,
    { container, baseElement: view.document.body }
  );
  act(() => result.getByRole('combobox').focus());
  await user.keyboard('{ArrowLeft}');
  expect(view.document.activeElement).toBe(
    result.getByRole('button', { name: 'clear item Green' })
  );
  await user.keyboard('{ArrowLeft}');
  expect(view.document.activeElement).toBe(
    result.getByRole('button', { name: 'clear item Red' })
  );
  result.unmount();
  iframe.remove();
});

describe.each([
  ['Select', Select],
  ['Combobox', Combobox],
])('native chip notifications in %s', (_name, Component) => {
  it.each(['click', 'Backspace'])(
    'keeps removal and status ownership consistent via %s',
    async activation => {
      const changed = jest.fn();
      const status = jest.fn(() => '');
      render(
        <Component
          labelText="Native removal"
          isMulti
          isClearable
          items={['Red', 'Green']}
          initialSelectedItems={['Red', 'Green']}
          getA11yRemovalMessage={() => 'Legacy Green removed'}
          downshift={{
            multipleSelection: {
              onSelectedItemsChange: changed,
              getA11yStatusMessage: status,
            },
          }}
        />
      );
      const input = screen.getByRole('combobox');
      if (activation === 'Backspace') {
        act(() => input.focus());
        await userEvent.keyboard('{ArrowLeft}{Backspace}');
        expect(
          screen.getByRole('button', { name: 'clear item Red' })
        ).toHaveFocus();
      } else {
        await userEvent.click(
          screen.getByText('Green', { selector: 'button' })
        );
      }
      expect(changed).toHaveBeenCalledWith(
        expect.objectContaining({ selectedItems: ['Red'] })
      );
      expect(
        screen.queryByText('Green', { selector: 'button' })
      ).not.toBeInTheDocument();
      await new Promise(resolve => setTimeout(resolve, 250));
      expect(status).toHaveBeenCalledWith(
        expect.objectContaining({ selectedItems: ['Red'] })
      );
      expect(document.body).not.toHaveTextContent('Legacy Green removed');
      expect(document.body).not.toHaveTextContent('Green has been removed');
      expect(
        document.getElementById(input.getAttribute('aria-controls'))
      ).toBeInTheDocument();
    }
  );
});

it('publishes a native status message and cleans up a pending message on unmount', async () => {
  const { result, unmount } = renderHook(() =>
    register(
      useSelect({
        items: ['Red'],
        native: {
          getA11yStatusMessage: state =>
            state.isOpen ? 'Native opened' : 'Native closed',
        },
      })
    )
  );
  act(() => result.current.openMenu());
  await waitFor(() => expect(document.body).toHaveTextContent('Native opened'));
  act(() => result.current.closeMenu());
  unmount();
  await new Promise(resolve => setTimeout(resolve, 250));
  expect(document.body).not.toHaveTextContent('Native closed');
  expect(document.body).not.toHaveTextContent('Native opened');
});

it('keeps controlled multi Combobox chips unchanged until the parent confirms updates', async () => {
  const changed = jest.fn();
  const props = {
    labelText: 'Controlled native chips',
    items: ['Red', 'Green'],
    isMulti: true,
    selectedItems: [],
    downshift: { multipleSelection: { onSelectedItemsChange: changed } },
  };
  const { rerender } = render(<Combobox {...props} />);
  await userEvent.click(screen.getByRole('combobox'));
  await userEvent.click(screen.getByRole('option', { name: 'Green' }));
  expect(changed).toHaveBeenCalledWith(
    expect.objectContaining({ selectedItems: ['Green'] })
  );
  expect(
    screen.queryByRole('button', { name: 'clear item Green' })
  ).not.toBeInTheDocument();
  rerender(<Combobox {...props} selectedItems={['Green']} />);
  await userEvent.click(
    screen.getByRole('button', { name: 'clear item Green' })
  );
  expect(changed).toHaveBeenLastCalledWith(
    expect.objectContaining({ selectedItems: [] })
  );
  expect(
    screen.getByRole('button', { name: 'clear item Green' })
  ).toBeInTheDocument();
  rerender(<Combobox {...props} selectedItems={[]} />);
  expect(
    screen.queryByRole('button', { name: 'clear item Green' })
  ).not.toBeInTheDocument();
});

it.each(['ArrowDown', 'End'])(
  'keeps the native Create action reachable with %s beside real matches',
  async key => {
    const selected = jest.fn();
    render(
      <Combobox
        labelText="Create beside match"
        defaultItems={['Red']}
        downshift={{ combobox: { onSelectedItemChange: selected } }}
      />
    );
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Re');
    await userEvent.keyboard(`{${key}}`);
    const create = screen.getByRole('option', { name: 'Create "Re"' });
    expect(create).toHaveAttribute('data-highlighted', 'true');
    expect(input).toHaveAttribute('aria-activedescendant', create.id);
    await userEvent.keyboard('{Enter}');
    expect(selected).toHaveBeenCalledWith(
      expect.objectContaining({ selectedItem: 'Re' })
    );
    expect(input).toHaveValue('Re');
  }
);

it('does not pass a native Create action to typed display/key/disabled functions', async () => {
  const red = { id: 1, name: 'Red' };
  const selected = jest.fn();
  render(
    <Combobox
      labelText="Typed native UI"
      defaultItems={[red]}
      initialSelectedItem={red}
      itemToKey={item => item?.id.toString()}
      isItemDisabled={item => item.name.startsWith('Disabled')}
      newItemTransform={item => ({ id: 2, name: item.value })}
      downshift={{
        combobox: {
          itemToString: item => item?.name.trim() ?? '',
          onSelectedItemChange: selected,
        },
      }}
    />
  );
  const input = screen.getByRole('combobox');
  await userEvent.clear(input);
  await userEvent.type(input, 'Azure');
  await userEvent.click(screen.getByRole('option', { name: 'Create "Azure"' }));
  expect(selected).toHaveBeenCalledWith(
    expect.objectContaining({ selectedItem: { id: 2, name: 'Azure' } })
  );
  expect(input).toHaveValue('Azure');
});

it('reports the actual v9 selection action after native creation cleanup', async () => {
  const selected = jest.fn();
  render(
    <Combobox
      labelText="Created action"
      defaultItems={['Red']}
      downshift={{ combobox: { onSelectedItemChange: selected } }}
    />
  );
  await userEvent.type(screen.getByRole('combobox'), 'Azure');
  await userEvent.click(screen.getByRole('option'));
  expect(selected).toHaveBeenCalledWith(
    expect.objectContaining({
      type: upstreamCombobox.stateChangeTypes.FunctionSelectItem,
      selectedItem: 'Azure',
      isOpen: false,
    })
  );
});

describe.each([false, true])(
  'native Create after disabled options, multi=%s',
  isMulti => {
    it.each(['bounded', 'circular'])(
      'skips disabled suffix before Create in %s mode',
      async navigationMode => {
        const selected = jest.fn();
        render(
          <Combobox
            labelText="Disabled suffix"
            defaultItems={['Red', 'Rejected', 'Reserved']}
            isMulti={isMulti}
            navigationMode={navigationMode}
            isItemDisabled={item => item !== 'Red'}
            downshift={{ combobox: { onSelectedItemChange: selected } }}
          />
        );
        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'Re');
        await userEvent.keyboard('{ArrowDown}');
        const create = screen.getByRole('option', { name: 'Create "Re"' });
        expect(create).toHaveAttribute('data-highlighted', 'true');
        expect(input).toHaveAttribute('aria-activedescendant', create.id);
        await userEvent.keyboard('{Enter}');
        expect(selected).toHaveBeenCalledWith(
          expect.objectContaining({ selectedItem: 'Re' })
        );
      }
    );
  }
);

it.each([
  ['PageDown', 'Red'],
  ['PageUp', 'Create "Re"'],
])(
  'preserves Downshift paging with a Create action for %s',
  async (key, name) => {
    render(
      <Combobox
        labelText="Native paging"
        defaultItems={['Red']}
        downshift={{ combobox: {} }}
      />
    );
    await userEvent.type(screen.getByRole('combobox'), 'Re');
    await userEvent.keyboard(`{${key}}`);
    expect(screen.getByRole('option', { name })).toHaveAttribute(
      'data-highlighted',
      'true'
    );
  }
);
