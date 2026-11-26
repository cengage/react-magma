import * as React from 'react';

import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';

import { Combobox } from '../../components/Combobox';

import { useCombobox, useMultipleSelection, useSelect } from '.';

function register(hook) {
  hook.getMenuProps({}, { suppressRefError: true });
  if (hook.getInputProps) {
    hook.getInputProps({}, { suppressRefError: true });
  } else {
    hook.getToggleButtonProps({}, { suppressRefError: true });
  }

  return hook;
}

describe('Downshift compatibility adapter', () => {
  it('reports the legacy keySoFar field and complete reducer changes', () => {
    const reducer = jest.fn((_state, action) => action.changes);
    const { result } = renderHook(() =>
      register(useSelect({ items: ['Alpha', 'Beta'], stateReducer: reducer }))
    );

    act(() => result.current.setInputValue('b'));
    expect(reducer).toHaveBeenLastCalledWith(
      expect.objectContaining({ keySoFar: '' }),
      expect.objectContaining({
        changes: expect.objectContaining({ keySoFar: 'b', isOpen: false }),
        props: expect.objectContaining({ items: ['Alpha', 'Beta'] }),
      })
    );
  });

  it('supports null selection and notifies the nullable recommended callback', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          initialSelectedItem: 'Alpha',
          onSelectionChange,
        })
      )
    );

    act(() => result.current.selectItem(null));
    expect(result.current.selectedItem).toBeNull();
    expect(onSelectionChange).toHaveBeenCalledWith(null);
  });
});

function keyDown(hook, key) {
  const getter = hook.getInputProps || hook.getToggleButtonProps;

  act(() =>
    getter().onKeyDown({ key, altKey: false, preventDefault: jest.fn() })
  );
}

describe('legacy keyboard and reducer contracts', () => {
  it('translates open Select keyboard actions to legacy menu events', () => {
    const reducer = jest.fn((_state, action) => action.changes);
    const onStateChange = jest.fn();
    const { result } = renderHook(() =>
      register(
        useSelect({
          items: ['Alpha', 'Beta'],
          initialIsOpen: true,
          stateReducer: reducer,
          onHighlightedIndexChange: onStateChange,
        })
      )
    );

    keyDown(result.current, 'ArrowDown');
    expect(reducer.mock.calls.at(-1)[1]).toEqual(
      expect.objectContaining({
        type: useSelect.stateChangeTypes.MenuKeyDownArrowDown,
        modernType: useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown,
      })
    );
    expect(onStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        keySoFar: '',
        isOpen: true,
        selectedItem: null,
      })
    );
  });

  it('honors the legacy circularNavigation setting while skipping disabled options', () => {
    const { result } = renderHook(() =>
      register(
        useSelect({
          items: ['Alpha', 'Disabled', 'Beta'],
          initialIsOpen: true,
          initialHighlightedIndex: 2,
          circularNavigation: true,
          isItemDisabled: item => item === 'Disabled',
        })
      )
    );

    keyDown(result.current, 'ArrowDown');
    expect(result.current.highlightedIndex).toBe(0);
    keyDown(result.current, 'ArrowDown');
    expect(result.current.highlightedIndex).toBe(2);
    keyDown(result.current, 'ArrowUp');
    expect(result.current.highlightedIndex).toBe(0);
    keyDown(result.current, 'ArrowUp');
    expect(result.current.highlightedIndex).toBe(2);
  });

  it('allows a legacy reducer to update keySoFar', () => {
    const { result } = renderHook(() =>
      register(
        useSelect({
          items: ['Alpha'],
          stateReducer: (_state, action) => ({
            ...action.changes,
            keySoFar: 'legacy',
          }),
        })
      )
    );

    act(() => result.current.setInputValue('new'));
    expect(result.current.inputValue).toBe('legacy');
  });

  it('composes the consumer reducer after the component reducer', () => {
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          stateReducer: (_state, action) => ({
            ...action.changes,
            inputValue: 'internal',
          }),
          userStateReducer: (_state, action) => ({
            ...action.changes,
            inputValue: `${action.changes.inputValue} consumer`,
          }),
        })
      )
    );

    act(() => result.current.setInputValue('new'));
    expect(result.current.inputValue).toBe('internal consumer');
  });
});

describe('nullable modern state and legacy announcements', () => {
  it('exposes a nullable reducer and callback with named modern events', () => {
    const selectionStateReducer = jest.fn((_state, action) => ({
      ...action.changes,
      inputValue: 'modern',
    }));
    const onSelectionStateChange = jest.fn();
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          selectionStateReducer,
          onSelectionStateChange,
        })
      )
    );

    act(() => result.current.selectItem(null));
    expect(selectionStateReducer).toHaveBeenCalledWith(
      expect.objectContaining({ selectedItem: null }),
      expect.objectContaining({
        type: '__function_select_item__',
        props: expect.objectContaining({ items: ['Alpha'] }),
      })
    );
    expect(result.current.inputValue).toBe('modern');
    expect(onSelectionStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedItem: null,
        type: '__function_select_item__',
      })
    );
  });

  it('reconstructs legacy status and selection message arguments', () => {
    jest.useFakeTimers();
    const getA11yStatusMessage = jest.fn(() => 'status');
    const getA11ySelectionMessage = jest.fn(() => 'selection');
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          getA11yStatusMessage,
          getA11ySelectionMessage,
        })
      )
    );

    act(() => result.current.selectItem('Alpha'));
    act(() => jest.advanceTimersByTime(200));
    expect(getA11ySelectionMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedItem: 'Alpha',
        resultCount: 1,
        previousResultCount: 1,
        itemToString: expect.any(Function),
        highlightedItem: undefined,
      })
    );
    expect(getA11yStatusMessage).not.toHaveBeenCalled();
    act(() => result.current.openMenu());
    act(() => jest.advanceTimersByTime(200));
    expect(getA11yStatusMessage).toHaveBeenCalledWith(
      expect.objectContaining({ resultCount: 1 })
    );
    expect(getA11ySelectionMessage.mock.calls[0][0].itemToString('Alpha')).toBe(
      'Alpha'
    );
    jest.useRealTimers();
  });

  it('reconstructs the removed-item callback without losing its item', () => {
    const getA11yRemovalMessage = jest.fn(() => 'removed');
    const { result } = renderHook(() => {
      const hook = useMultipleSelection({
        initialSelectedItems: ['Alpha', 'Beta'],
        getA11yRemovalMessage,
      });
      hook.getDropdownProps({}, { suppressRefError: true });

      return hook;
    });

    act(() => result.current.removeSelectedItem('Alpha'));
    expect(getA11yRemovalMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        removedSelectedItem: 'Alpha',
        resultCount: 1,
        activeIndex: -1,
        activeSelectedItem: undefined,
        itemToString: expect.any(Function),
      })
    );
    expect(result.current.selectedItems).toEqual(['Beta']);
  });
});

describe('announcement and callback dependency compatibility', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());
  it.each([useSelect, useCombobox])(
    'announces async item changes without duplicating state announcements (%#)',
    hook => {
      const getA11yStatusMessage = jest.fn(
        ({ resultCount }) => `${resultCount} results`
      );
      const getA11ySelectionMessage = jest.fn(() => 'selection');
      const { result, rerender } = renderHook(
        ({ items }) =>
          register(
            hook({
              items,
              initialSelectedItem: 'Alpha',
              getA11yStatusMessage,
              getA11ySelectionMessage,
            })
          ),
        { initialProps: { items: ['Alpha'] } }
      );

      act(() => result.current.openMenu());
      act(() => jest.advanceTimersByTime(200));
      expect(getA11yStatusMessage).toHaveBeenCalledTimes(1);
      expect(getA11ySelectionMessage).not.toHaveBeenCalled();
      rerender({ items: ['Alpha', 'Beta'] });
      act(() => jest.advanceTimersByTime(200));
      expect(getA11yStatusMessage).toHaveBeenCalledTimes(2);
      expect(getA11yStatusMessage).toHaveBeenLastCalledWith(
        expect.objectContaining({ resultCount: 2, previousResultCount: 1 })
      );
      expect(getA11ySelectionMessage).not.toHaveBeenCalled();
    }
  );

  it.each([useSelect, useCombobox])(
    'keeps onStateChange limited to changed state keys (%#)',
    hook => {
      const onStateChange = jest.fn();
      const onHighlightedIndexChange = jest.fn();
      const { result } = renderHook(() =>
        register(
          hook({
            items: ['Alpha', 'Beta'],
            initialSelectedItem: 'Alpha',
            onStateChange,
            onHighlightedIndexChange,
          })
        )
      );

      act(() => result.current.setHighlightedIndex(1));
      expect(onStateChange).toHaveBeenCalledTimes(1);
      expect(onStateChange.mock.calls[0][0]).not.toHaveProperty('selectedItem');
      expect(onStateChange.mock.calls[0][0]).not.toHaveProperty('isOpen');
      expect(onStateChange.mock.calls[0][0]).toHaveProperty(
        'highlightedIndex',
        1
      );
      expect(onHighlightedIndexChange.mock.calls[0][0]).toHaveProperty(
        'selectedItem',
        'Alpha'
      );
    }
  );
});

describe('announcement lifecycle', () => {
  it('publishes the latest async count once and cleans up on unmount', () => {
    jest.useFakeTimers();
    try {
      const getA11yStatusMessage = jest.fn(
        ({ resultCount }) => `${resultCount} results`
      );
      const { result, rerender, unmount } = renderHook(
        ({ items }) => register(useCombobox({ items, getA11yStatusMessage })),
        { initialProps: { items: ['Alpha'] } }
      );

      expect(getA11yStatusMessage).not.toHaveBeenCalled();
      act(() => result.current.openMenu());
      rerender({ items: ['Alpha', 'Beta'] });
      act(() => jest.advanceTimersByTime(200));
      expect(screen.getAllByRole('status')).toHaveLength(1);
      expect(screen.getByRole('status')).toHaveTextContent('2 results');
      expect(getA11yStatusMessage).toHaveBeenCalledTimes(1);
      unmount();
      act(() => jest.runOnlyPendingTimers());
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('silent announcement updates', () => {
  it('clears previously published text when the next message is empty', () => {
    jest.useFakeTimers();
    try {
      const items = ['Alpha', 'Beta'];
      const { result } = renderHook(() =>
        register(
          useCombobox({
            items,
            getA11yStatusMessage: ({ highlightedIndex }) =>
              highlightedIndex < 0 ? 'Opened' : '',
          })
        )
      );

      act(() => result.current.openMenu());
      act(() => jest.advanceTimersByTime(200));
      expect(screen.getByRole('status')).toHaveTextContent('Opened');
      act(() => result.current.setHighlightedIndex(0));
      act(() => jest.advanceTimersByTime(700));
      expect(screen.getByRole('status')).toBeEmptyDOMElement();
    } finally {
      jest.useRealTimers();
    }
  });
});

it('composes a consumer reducer that constructs its state without inputValue', () => {
  const { result } = renderHook(() =>
    register(
      useSelect({
        items: ['Alpha'],
        userStateReducer: (_state, { changes }) => ({
          selectedItem: changes.selectedItem,
          isOpen: changes.isOpen,
          highlightedIndex: changes.highlightedIndex,
          keySoFar: 'legacy-query',
        }),
      })
    )
  );

  act(() => result.current.setInputValue('a'));
  expect(result.current.inputValue).toBe('legacy-query');
});

describe('published v5 announcement output', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it.each([useSelect, useCombobox])(
    'keeps the omitted selection callback default (%#)',
    hook => {
      const { result } = renderHook(() => register(hook({ items: ['Alpha'] })));

      act(() => result.current.selectItem('Alpha'));
      act(() => jest.advanceTimersByTime(200));
      expect(screen.getByRole('status')).toHaveTextContent(
        'Alpha has been selected.'
      );
    }
  );

  it('lets selection replace a simultaneous legacy status message', () => {
    const getA11yStatusMessage = jest.fn(() => 'STATUS');
    const getA11ySelectionMessage = jest.fn(() => 'SELECTION');
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          getA11yStatusMessage,
          getA11ySelectionMessage,
        })
      )
    );

    act(() => result.current.selectItem('Alpha'));
    expect(getA11ySelectionMessage).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(200));
    expect(screen.getByRole('status')).toHaveTextContent(/^SELECTION$/);
    expect(getA11ySelectionMessage).toHaveBeenCalledTimes(1);
    expect(getA11yStatusMessage).not.toHaveBeenCalled();
  });

  it.each([useSelect, useCombobox])(
    'keeps empty and changed-count default status messages (%#)',
    hook => {
      const { result, rerender } = renderHook(
        ({ items }) => register(hook({ items })),
        { initialProps: { items: [] } }
      );

      act(() => result.current.openMenu());
      act(() => jest.advanceTimersByTime(200));
      expect(screen.getByRole('status')).toHaveTextContent(
        'No results are available.'
      );
      rerender({ items: ['Alpha'] });
      act(() => jest.advanceTimersByTime(200));
      expect(screen.getByRole('status')).toHaveTextContent(
        hook === useSelect
          ? '1 result is available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.'
          : '1 result is available, use up and down arrow keys to navigate. Press Enter key to select.'
      );
    }
  );

  it('lets a modern callback replace all legacy announcement callbacks', () => {
    const getA11ySelectionMessage = jest.fn(() => 'legacy');
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          a11yStatusMessage: () => 'modern',
          getA11ySelectionMessage,
        })
      )
    );

    act(() => result.current.selectItem('Alpha'));
    act(() => jest.advanceTimersByTime(200));
    expect(screen.getByRole('status')).toHaveTextContent(/^modern$/);
    expect(getA11ySelectionMessage).not.toHaveBeenCalled();
  });

  it('respects an explicitly silent legacy selection callback', () => {
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          getA11ySelectionMessage: () => '',
          getA11yStatusMessage: () => 'status',
        })
      )
    );

    act(() => result.current.selectItem('Alpha'));
    act(() => jest.advanceTimersByTime(200));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

it('keeps new Combobox action names as strings in production', () => {
  const { execFileSync } = require('child_process');
  const script = `
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM('<html><body><div id="root"></div></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;
    require('ts-node/register/transpile-only');
    const React = require('react');
    const {createRoot} = require('react-dom/client');
    const {flushSync} = require('react-dom');
    const {useCombobox} = require('./packages/react-magma-dom/src/utils/downshift');
    let hook;
    const types = [];
    function Harness() {
      hook = useCombobox({items:['Alpha'], stateReducer: (_state, action) => {
        types.push(action.type);
        return action.changes;
      }});
      return null;
    }
    const root = createRoot(document.getElementById('root'));
    flushSync(() => root.render(React.createElement(Harness)));
    flushSync(() => hook.getInputProps().onClick({}));
    for (const key of ['PageDown', 'PageUp']) {
      flushSync(() => hook.getInputProps().onKeyDown({key, preventDefault(){}}));
    }
    flushSync(() => root.unmount());
    process.stdout.write(JSON.stringify(types));
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

  expect(JSON.parse(output)).toEqual([
    '__togglebutton_click__',
    '__input_keydown_page_down__',
    '__input_keydown_page_up__',
  ]);
});

describe('legacy Combobox keyboard composition', () => {
  it('passes cleared Escape changes through both reducer layers', () => {
    const stateReducer = jest.fn((_state, action) => action.changes);
    const userStateReducer = jest.fn((_state, action) => ({
      ...action.changes,
      inputValue: 'consumer override',
    }));
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: ['Alpha'],
          initialSelectedItem: 'Alpha',
          initialIsOpen: true,
          stateReducer,
          userStateReducer,
        })
      )
    );

    keyDown(result.current, 'Escape');
    for (const reducer of [stateReducer, userStateReducer]) {
      expect(reducer).toHaveBeenLastCalledWith(
        expect.objectContaining({ selectedItem: 'Alpha', isOpen: true }),
        expect.objectContaining({
          changes: expect.objectContaining({
            selectedItem: null,
            inputValue: '',
            isOpen: false,
          }),
        })
      );
    }
    expect(result.current.inputValue).toBe('consumer override');
  });

  it('calls the user handler once and leaves unmatched Enter to the form', () => {
    const onKeyDown = jest.fn();
    const stateReducer = jest.fn((_state, action) => action.changes);
    const { result } = renderHook(() =>
      register(
        useCombobox({
          items: [],
          initialIsOpen: true,
          stateReducer,
        })
      )
    );
    const event = { key: 'Enter', preventDefault: jest.fn() };

    act(() => result.current.getInputProps({ onKeyDown }).onKeyDown(event));
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(stateReducer).not.toHaveBeenCalled();
  });

  it.each(['event', 'nativeEvent'])(
    'honors preventDownshiftDefault on %s with a highlighted option',
    flagTarget => {
      const onKeyDown = jest.fn(event => {
        const target = flagTarget === 'nativeEvent' ? event.nativeEvent : event;
        target.preventDownshiftDefault = true;
      });
      const { result } = renderHook(() =>
        register(
          useCombobox({
            items: ['Alpha'],
            initialIsOpen: true,
            initialHighlightedIndex: 0,
          })
        )
      );
      const event = {
        key: 'Enter',
        preventDefault: jest.fn(),
        nativeEvent: {},
      };

      act(() => result.current.getInputProps({ onKeyDown }).onKeyDown(event));
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(result.current.selectedItem).toBeNull();
    }
  );
});

it('reports legacy toggle events for public Combobox input clicks', () => {
  const onStateChange = jest.fn();
  const onSelectionStateChange = jest.fn();

  render(
    <Combobox
      labelText="Color"
      items={['Alpha', 'Beta']}
      onStateChange={onStateChange}
      onSelectionStateChange={onSelectionStateChange}
    />
  );
  fireEvent.click(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('combobox'));
  expect(onStateChange).toHaveBeenCalledTimes(2);
  for (const [index, isOpen] of [true, false].entries()) {
    expect(onStateChange).toHaveBeenNthCalledWith(
      index + 1,
      expect.objectContaining({
        type: useCombobox.stateChangeTypes.ToggleButtonClick,
        modernType: useCombobox.stateChangeTypes.InputClick,
        isOpen,
      })
    );
    expect(onSelectionStateChange).toHaveBeenNthCalledWith(
      index + 1,
      expect.objectContaining({
        type: useCombobox.stateChangeTypes.InputClick,
        isOpen,
      })
    );
  }
});
