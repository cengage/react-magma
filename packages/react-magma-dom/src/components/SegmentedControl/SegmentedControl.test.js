import React from 'react';

import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarTodayIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { InverseContext } from '../../inverse';
import { magma } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

import { SegmentedControl, SegmentedControlItem } from '.';

function Example({ children, ...props }) {
  return (
    <SegmentedControl aria-label="Time range" defaultValue="day" {...props}>
      {children || [
        <SegmentedControlItem key="day" value="day">
          Day
        </SegmentedControlItem>,
        <SegmentedControlItem key="week" value="week">
          Week
        </SegmentedControlItem>,
        <SegmentedControlItem key="month" value="month">
          Month
        </SegmentedControlItem>,
      ]}
    </SegmentedControl>
  );
}

const radio = name => screen.getByRole('radio', { name });
const indicator = () =>
  screen.getByRole('radiogroup').querySelector('span[aria-hidden="true"]');

describe('SegmentedControl', () => {
  it('selects one item, reports the button event/value, and retains selection on repeat clicks', () => {
    const onChange = jest.fn();
    render(<Example onChange={onChange} />);
    fireEvent.click(radio('Week'));
    expect(radio('Week')).toHaveAttribute('aria-checked', 'true');
    expect(radio('Day')).toHaveAttribute('aria-checked', 'false');
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click', target: radio('Week') }),
      'week'
    );
    fireEvent.click(radio('Week'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('uses only the initial defaultValue', () => {
    const { rerender } = render(<Example />);
    rerender(<Example defaultValue="month" />);
    expect(radio('Day')).toHaveAttribute('aria-checked', 'true');
  });

  it('supports an initially empty selection and Tab/Space', async () => {
    const user = userEvent.setup();
    render(<Example defaultValue={undefined} />);
    expect(
      screen
        .getAllByRole('radio')
        .every(item => item.getAttribute('aria-checked') === 'false')
    ).toBe(true);
    await user.tab();
    expect(radio('Day')).toHaveFocus();
    await user.keyboard(' ');
    expect(radio('Day')).toHaveAttribute('aria-checked', 'true');
  });

  it('tabs into the checked item and then out of the group', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Example defaultValue="week" />
        <button>After</button>
      </>
    );
    await user.tab();
    expect(radio('Week')).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(radio('Week')).toHaveFocus();
  });

  it.each([
    ['ArrowRight', 'Week'],
    ['ArrowDown', 'Week'],
    ['ArrowLeft', 'Month'],
    ['ArrowUp', 'Month'],
    ['End', 'Month'],
    ['Home', 'Day'],
  ])('moves focus and selection for %s', (key, expected) => {
    render(<Example />);
    radio('Day').focus();
    fireEvent.keyDown(radio('Day'), { key });
    expect(radio(expected)).toHaveFocus();
    expect(radio(expected)).toHaveAttribute('aria-checked', 'true');
  });

  it('skips disabled items and wraps in both directions', () => {
    render(
      <Example>
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem disabled value="week">
          Week
        </SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </Example>
    );
    radio('Day').focus();
    fireEvent.keyDown(radio('Day'), { key: 'ArrowRight' });
    expect(radio('Month')).toHaveFocus();
    fireEvent.keyDown(radio('Month'), { key: 'ArrowRight' });
    expect(radio('Day')).toHaveFocus();
    fireEvent.keyDown(radio('Day'), { key: 'ArrowLeft' });
    expect(radio('Month')).toHaveFocus();
    fireEvent.click(radio('Week'));
    expect(radio('Month')).toHaveAttribute('aria-checked', 'true');
  });

  it('disables the whole group with no tab stop or change event', () => {
    const onChange = jest.fn();
    render(<Example disabled onChange={onChange} />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    screen.getAllByRole('radio').forEach(item => {
      expect(item).toBeDisabled();
      expect(item).toHaveAttribute('tabindex', '-1');
    });
    fireEvent.click(radio('Week'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps the parent-controlled value when a change is rejected', () => {
    const onChange = jest.fn();
    const { rerender } = render(<Example value="day" onChange={onChange} />);
    fireEvent.click(radio('Week'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(radio('Day')).toHaveAttribute('aria-checked', 'true');
    rerender(<Example value="month" onChange={onChange} />);
    expect(radio('Month')).toHaveAttribute('aria-checked', 'true');
  });

  it('keeps one enabled tab stop after the selected item is removed', () => {
    const { rerender } = render(<Example />);
    rerender(
      <Example>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </Example>
    );
    expect(radio('Week')).toHaveAttribute('tabindex', '0');
  });

  it('keeps one tab stop when items are wrapped in a fragment', () => {
    render(
      <Example>
        <>
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
        </>
      </Example>
    );
    expect(radio('Day')).toHaveAttribute('tabindex', '0');
  });

  it('respects a consumer-cancelled key event', () => {
    render(<Example onKeyDown={event => event.preventDefault()} />);
    radio('Day').focus();
    fireEvent.keyDown(radio('Day'), { key: 'ArrowRight' });
    expect(radio('Day')).toHaveFocus();
  });

  it.each([
    ['disabling and re-enabling the group', { disabled: true }],
    ['removing and restoring every item', { children: [] }],
  ])('recovers item focus after %s', (_label, interrupt) => {
    const { rerender } = render(<Example value="day" />);
    radio('Day').focus();
    rerender(<Example value="day" {...interrupt} />);
    rerender(<Example value="day" />);
    expect(radio('Day')).toHaveFocus();
    fireEvent.keyDown(radio('Day'), { key: 'ArrowRight' });
    expect(radio('Week')).toHaveFocus();
  });

  it('forwards group and item refs, including through Tooltip', async () => {
    const groupRef = React.createRef();
    const itemRef = React.createRef();
    const user = userEvent.setup();
    render(
      <Example>
        <SegmentedControlItem
          aria-label="Day"
          hasTooltip
          icon={<CalendarTodayIcon />}
          ref={itemRef}
          value="day"
        />
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
      </Example>
    );
    expect(itemRef.current).toBe(radio('Day'));
    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Day');
    const { unmount } = render(
      <SegmentedControl aria-label="Other" ref={groupRef}>
        <SegmentedControlItem value="one">One</SegmentedControlItem>
      </SegmentedControl>
    );
    expect(groupRef.current).toHaveAttribute('role', 'radiogroup');
    unmount();
    expect(groupRef.current).toBeNull();
  });

  it('uses accessible icon labels and hides decorative icons', () => {
    render(
      <Example>
        <SegmentedControlItem
          aria-label="Day view"
          icon={<CalendarTodayIcon />}
          value="day"
        />
        <SegmentedControlItem leadingIcon={<CalendarTodayIcon />} value="week">
          Week
        </SegmentedControlItem>
      </Example>
    );
    expect(radio('Day view')).toBeInTheDocument();
    expect(radio('Week').querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('inherits inverse styling and custom theme colors', () => {
    const theme = {
      ...magma,
      colors: { ...magma.colors, neutral700: '#123456' },
    };
    render(
      <ThemeContext.Provider value={theme}>
        <InverseContext.Provider value={{ isInverse: true }}>
          <Example />
        </InverseContext.Provider>
      </ThemeContext.Provider>
    );
    expect(radio('Day')).toHaveStyleRule('background', '#123456');
  });

  it('has no axe violations in light and inverse modes', async () => {
    const { container, rerender } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<Example isInverse />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('keeps the controlled selection in the responsive dropdown after rejection', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn(query => ({
      matches: query.includes('max-width'),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    try {
      render(<Example breakpoint={600} value="week" onChange={jest.fn()} />);
      const trigger = screen.getByRole('button', { name: 'Time range Week' });
      fireEvent.click(trigger);
      fireEvent.click(screen.getByRole('menuitemradio', { name: 'Month' }));
      fireEvent.click(trigger);
      expect(
        screen.getByRole('menuitemradio', { name: 'Week' })
      ).toHaveAttribute('aria-checked', 'true');
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('shows the dropdown checkmark after the selected label', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn(query => ({
      matches: query.includes('max-width'),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    try {
      render(<Example breakpoint={600} value="week" onChange={jest.fn()} />);
      fireEvent.click(screen.getByRole('button', { name: 'Time range Week' }));
      const week = screen.getByRole('menuitemradio', { name: 'Week' });
      const check = screen.getByTestId('selectedOptionCheck');
      expect(week).toContainElement(check);
      expect(
        within(week).getByText('Week').compareDocumentPosition(check) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      expect(screen.getAllByTestId('selectedOptionCheck')).toHaveLength(1);
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  describe('responsive display', () => {
    let originalMatchMedia;
    let narrow;
    let listeners;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
      narrow = true;
      listeners = new Set();
      window.matchMedia = jest.fn(query => ({
        get matches() {
          return query.includes('max-width') && narrow;
        },
        addEventListener: (_type, listener) => listeners.add(listener),
        removeEventListener: (_type, listener) => listeners.delete(listener),
      }));
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    function resize(isNarrow) {
      act(() => {
        narrow = isNarrow;
        listeners.forEach(listener => listener());
      });
    }

    function unavailableOptions(weekDisabled = true) {
      return [
        <SegmentedControlItem disabled key="day" value="day">
          Day
        </SegmentedControlItem>,
        <SegmentedControlItem disabled={weekDisabled} key="week" value="week">
          Week
        </SegmentedControlItem>,
      ];
    }

    it('moves fallback menu focus to a newly enabled option', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Example breakpoint={600}>{unavailableOptions()}</Example>
      );
      await user.click(screen.getByRole('button', { name: 'Time range Day' }));
      expect(screen.getByRole('menu')).toHaveFocus();
      rerender(<Example breakpoint={600}>{unavailableOptions(false)}</Example>);
      expect(screen.getByRole('menuitemradio', { name: 'Week' })).toHaveFocus();
      await user.keyboard(' ');
      expect(
        screen.getByRole('button', { name: 'Time range Week' })
      ).toHaveFocus();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('keeps fallback menu focus while every option remains disabled', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Example breakpoint={600}>{unavailableOptions()}</Example>
      );
      const trigger = screen.getByRole('button', { name: 'Time range Day' });
      await user.click(trigger);
      const menu = screen.getByRole('menu');
      expect(menu).toHaveFocus();
      rerender(
        <Example breakpoint={600} id="updated">
          {unavailableOptions()}
        </Example>
      );
      expect(menu).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('preserves trigger focus when an option becomes enabled in a closed menu', () => {
      const { rerender } = render(
        <Example breakpoint={600}>{unavailableOptions()}</Example>
      );
      const trigger = screen.getByRole('button', { name: 'Time range Day' });
      trigger.focus();
      rerender(<Example breakpoint={600}>{unavailableOptions(false)}</Example>);
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('provides a named menu with checked choices and no axe violations', async () => {
      const user = userEvent.setup();
      const { container } = render(<Example breakpoint={600} />);
      const trigger = screen.getByRole('button', { name: 'Time range Day' });
      await user.click(trigger);
      expect(
        document.getElementById(trigger.getAttribute('aria-controls'))
      ).toContainElement(screen.getByRole('menu'));
      expect(
        screen.getByRole('menu', { name: 'Time range Day' })
      ).toContainElement(
        screen.getByRole('menuitemradio', { name: 'Day', checked: true })
      );
      let result;
      await act(async () => {
        result = await axe(container);
      });
      expect(result).toHaveNoViolations();
    });

    it('keeps menu label words whole instead of breaking between letters', async () => {
      const user = userEvent.setup();
      render(<Example breakpoint={600} />);
      await user.click(screen.getByRole('button', { name: 'Time range Day' }));
      // jsdom ignores width: max-content; the menu width is verified in a browser
      expect(
        within(screen.getByRole('menuitemradio', { name: 'Week' })).getByText(
          'Week'
        )
      ).toHaveStyleRule('overflow-wrap', 'break-word');
    });

    it.each([
      [<strong key="rich">Weekly overview</strong>, 'Weekly overview'],
      [2, '2'],
    ])('includes the rendered label in the trigger name', (label, text) => {
      render(
        <Example breakpoint={600} value="week">
          <SegmentedControlItem value="week">{label}</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </Example>
      );
      expect(
        screen.getByRole('button', { name: `Time range ${text}` })
      ).toBeInTheDocument();
    });

    it('combines aria-labelledby with rich selected content', () => {
      render(
        <>
          <span id="rangeLabel">Report range</span>
          <Example
            aria-label={undefined}
            aria-labelledby="rangeLabel"
            breakpoint={600}
          >
            <SegmentedControlItem value="day">
              <strong>Daily report</strong>
            </SegmentedControlItem>
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
          </Example>
        </>
      );
      expect(
        screen.getByRole('button', { name: 'Report range Daily report' })
      ).toBeInTheDocument();
    });

    it('keeps group attributes and refs, and transfers focus across breakpoints', () => {
      narrow = false;
      const groupRef = React.createRef();
      const itemRef = React.createRef();
      render(
        <SegmentedControl
          aria-label="Time range"
          breakpoint={600}
          data-custom="kept"
          defaultValue="day"
          id="stable"
          ref={groupRef}
        >
          <SegmentedControlItem ref={itemRef} value="day">
            Day
          </SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
        </SegmentedControl>
      );
      const root = groupRef.current;
      radio('Day').focus();
      resize(true);
      expect(
        screen.getByRole('button', { name: 'Time range Day' })
      ).toHaveFocus();
      expect(itemRef.current).toHaveAttribute('role', 'menuitemradio');
      expect(groupRef.current).toBe(root);
      expect(root).toHaveAttribute('id', 'stable');
      expect(root).toHaveAttribute('data-custom', 'kept');
      resize(false);
      expect(radio('Day')).toHaveFocus();
      expect(itemRef.current).toBe(radio('Day'));
      expect(groupRef.current).toBe(root);
    });

    it('preserves item handlers, metadata and button refs, with live exactly-once events', async () => {
      const user = userEvent.setup();
      const ref = React.createRef();
      const onClick = jest.fn();
      const currentTargets = [];
      const onChange = jest.fn(event =>
        currentTargets.push(event.currentTarget)
      );
      render(
        <Example breakpoint={600} onChange={onChange}>
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem
            data-custom="kept"
            id="weekItem"
            onClick={onClick}
            ref={ref}
            title="Week help"
            value="week"
          >
            Week
          </SegmentedControlItem>
        </Example>
      );
      const trigger = screen.getByRole('button', { name: 'Time range Day' });
      await user.click(trigger);
      const week = screen.getByRole('menuitemradio', { name: 'Week' });
      expect(ref.current).toBe(week);
      expect(week).toHaveAttribute('data-custom', 'kept');
      expect(week).toHaveAttribute('id', 'weekItem');
      expect(week).toHaveAttribute('title', 'Week help');
      week.focus();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(currentTargets).toEqual([week]);
      expect(
        screen.getByRole('button', { name: 'Time range Week' })
      ).toHaveFocus();
    });

    it('uses current DOM order and accepted values after reorder and disabling', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Example breakpoint={600} value="week" />);
      await user.click(screen.getByRole('button', { name: 'Time range Week' }));
      rerender(
        <Example breakpoint={600} value="week">
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
          <SegmentedControlItem disabled value="day">
            Day
          </SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
        </Example>
      );
      // Disabling the focused option closes the menu and restores the trigger.
      const trigger = screen.getByRole('button', { name: 'Time range Week' });
      if (trigger.getAttribute('aria-expanded') === 'false') {
        expect(trigger).toHaveFocus();
        await user.click(trigger);
      }
      const week = screen.getByRole('menuitemradio', {
        name: 'Week',
        checked: true,
      });
      expect(week).toContainElement(screen.getByTestId('selectedOptionCheck'));
      expect(
        screen.getAllByRole('menuitemradio', { checked: true })
      ).toHaveLength(1);
      screen.getByRole('menuitemradio', { name: 'Month' }).focus();
      await user.keyboard('{ArrowDown}');
      expect(week).toHaveFocus();
      await user.keyboard('{Home}');
      expect(
        screen.getByRole('menuitemradio', { name: 'Month' })
      ).toHaveFocus();
      await user.keyboard('{End}');
      expect(week).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(
        screen.getByRole('button', { name: 'Time range Week' })
      ).toHaveFocus();
    });

    it('calls the group key handler before moving menu focus', async () => {
      const user = userEvent.setup();
      const onKeyDown = jest.fn(event => event.preventDefault());
      render(<Example breakpoint={600} onKeyDown={onKeyDown} />);
      await user.click(screen.getByRole('button', { name: 'Time range Day' }));
      const day = screen.getByRole('menuitemradio', { name: 'Day' });
      day.focus();
      await user.keyboard('{ArrowDown}');
      expect(onKeyDown).toHaveBeenCalled();
      expect(day).toHaveFocus();
    });

    it.each([false, true])('closes on Tab (shift=%s)', async shift => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <Example breakpoint={600} />
          <button>After</button>
        </>
      );
      const trigger = screen.getByRole('button', { name: 'Time range Day' });
      await user.click(trigger);
      screen.getByRole('menuitemradio', { name: 'Day' }).focus();
      await user.tab({ shift });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(document.activeElement.closest('[role="menu"]')).toBeNull();
      if (!shift)
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    });

    it.each([false, true])(
      'lets the group key handler cancel Tab in the menu (shift=%s)',
      async shift => {
        const user = userEvent.setup();
        const onKeyDown = jest.fn(event => {
          if (event.key === 'Tab') event.preventDefault();
        });
        render(<Example breakpoint={600} onKeyDown={onKeyDown} />);
        const trigger = screen.getByRole('button', { name: 'Time range Day' });
        await user.click(trigger);
        const week = screen.getByRole('menuitemradio', { name: 'Week' });
        week.focus();
        await user.tab({ shift });
        expect(onKeyDown).toHaveBeenCalled();
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(week).toHaveFocus();
      }
    );

    it('closes without reopening when the trigger is clicked from the menu', async () => {
      const user = userEvent.setup();
      render(<Example breakpoint={600} />);
      const trigger = screen.getByRole('button', { name: 'Time range Day' });
      await user.click(trigger);
      screen.getByRole('menuitemradio', { name: 'Week' }).focus();
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveFocus();
    });

    it('does not steal focus from outside the control on resize', () => {
      narrow = false;
      render(
        <>
          <Example breakpoint={600} />
          <button>Outside</button>
        </>
      );
      screen.getByRole('button', { name: 'Outside' }).focus();
      resize(true);
      expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
    });
  });

  it.each(['remove', 'disable'])(
    'recovers focus when the focused option is %s',
    change => {
      const { rerender } = render(<Example />);
      radio('Day').focus();
      rerender(
        <Example>
          {change === 'disable' && (
            <SegmentedControlItem disabled value="day">
              Day
            </SegmentedControlItem>
          )}
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </Example>
      );
      expect(radio('Week')).toHaveFocus();
    }
  );

  it('lets an item click handler cancel selection', () => {
    const onChange = jest.fn();
    render(
      <Example onChange={onChange}>
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem
          onClick={event => event.preventDefault()}
          value="week"
        >
          Week
        </SegmentedControlItem>
      </Example>
    );
    fireEvent.click(radio('Week'));
    expect(radio('Day')).toHaveAttribute('aria-checked', 'true');
    expect(onChange).not.toHaveBeenCalled();
  });

  describe('animation', () => {
    let originalAnimate;
    let originalMatchMedia;
    let originalCSS;
    let animations;
    let reduced;
    let mediaListeners;

    beforeEach(() => {
      originalAnimate = Element.prototype.animate;
      originalMatchMedia = window.matchMedia;
      originalCSS = window.CSS;
      animations = [];
      reduced = false;
      mediaListeners = new Set();
      window.matchMedia = jest.fn(query => ({
        get matches() {
          return query.includes('prefers-reduced-motion') && reduced;
        },
        addEventListener: (_type, listener) => mediaListeners.add(listener),
        removeEventListener: (_type, listener) =>
          mediaListeners.delete(listener),
      }));
      Element.prototype.animate = jest.fn(() => {
        const animation = { cancel: jest.fn(), onfinish: null };
        animations.push(animation);

        return animation;
      });
    });

    afterEach(() => {
      Element.prototype.animate = originalAnimate;
      window.matchMedia = originalMatchMedia;
      window.CSS = originalCSS;
      jest.useRealTimers();
    });

    it('slides only for pointer selection and removes the indicator on finish', () => {
      render(<Example />);
      expect(Element.prototype.animate).not.toHaveBeenCalled();
      fireEvent.click(radio('Week'), { detail: 1 });
      expect(indicator()).toBeInTheDocument();
      expect(indicator()).toHaveAttribute('aria-hidden', 'true');
      expect(Element.prototype.animate).toHaveBeenCalledWith(
        expect.any(Array),
        { duration: 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
      act(() => animations[0].onfinish());
      expect(indicator()).toBeNull();
      fireEvent.click(radio('Month'), { detail: 0 });
      expect(Element.prototype.animate).toHaveBeenCalledTimes(1);
    });

    it('does not animate when Element.animate is unavailable', () => {
      Element.prototype.animate = undefined;
      render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      expect(radio('Week')).toHaveAttribute('aria-checked', 'true');
      expect(indicator()).toBeNull();
    });

    it('handles StrictMode mount and unmount without a stale animation', () => {
      const { unmount } = render(
        <React.StrictMode>
          <Example />
        </React.StrictMode>
      );
      fireEvent.click(radio('Week'), { detail: 1 });
      expect(animations).toHaveLength(1);
      unmount();
      expect(animations[0].cancel).toHaveBeenCalledTimes(1);
    });

    it('selects safely when matchMedia is unavailable', () => {
      window.matchMedia = undefined;
      render(<Example />);
      expect(() => fireEvent.click(radio('Week'), { detail: 1 })).not.toThrow();
    });

    it('respects reduced motion and isAnimated=false', () => {
      reduced = true;
      const { rerender } = render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      reduced = false;
      rerender(<Example isAnimated={false} />);
      fireEvent.click(radio('Month'), { detail: 1 });
      expect(Element.prototype.animate).not.toHaveBeenCalled();
    });

    it('replaces an interrupted slide and cancels on unmount', () => {
      const { unmount } = render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      fireEvent.click(radio('Month'), { detail: 1 });
      expect(animations).toHaveLength(2);
      expect(animations[0].cancel).toHaveBeenCalledTimes(1);
      unmount();
      expect(animations[1].cancel).toHaveBeenCalledTimes(1);
    });

    it('cleans up when a hidden-tab animation never finishes', () => {
      jest.useFakeTimers();
      render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      act(() => jest.advanceTimersByTime(600));
      expect(indicator()).toBeNull();
      expect(animations[0].cancel).toHaveBeenCalledTimes(1);
    });

    it('animates a delayed acceptance of the requested controlled value', () => {
      const { rerender } = render(<Example value="day" />);
      fireEvent.click(radio('Week'), { detail: 1 });
      expect(Element.prototype.animate).not.toHaveBeenCalled();
      rerender(<Example value="week" />);
      expect(Element.prototype.animate).toHaveBeenCalledTimes(1);
    });

    it('ends an active slide when isAnimated becomes false', () => {
      const { rerender } = render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      rerender(<Example isAnimated={false} />);
      expect(indicator()).toBeNull();
      expect(animations[0].cancel).toHaveBeenCalled();
    });

    it('stops a pointer slide before keyboard selection', () => {
      render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      radio('Week').focus();
      fireEvent.keyDown(radio('Week'), { key: 'ArrowRight' });
      expect(radio('Month')).toHaveAttribute('aria-checked', 'true');
      expect(indicator()).toBeNull();
      expect(animations[0].cancel).toHaveBeenCalled();
    });

    it('restores the resting selection when the accepted controlled value is replaced', () => {
      const { rerender } = render(<Example value="day" />);
      fireEvent.click(radio('Week'), { detail: 1 });
      rerender(<Example value="week" />);
      rerender(<Example value="month" />);
      expect(indicator()).toBeNull();
      expect(animations[0].cancel).toHaveBeenCalled();
      expect(radio('Month')).toHaveStyleRule(
        'background',
        magma.colors.neutral0
      );
    });

    it.each(['disabled', 'removed', 'destinationDisabled'])(
      'cancels a slide when %s',
      change => {
        const { rerender } = render(<Example />);
        fireEvent.click(radio('Week'), { detail: 1 });
        rerender(
          <Example disabled={change === 'disabled'}>
            <SegmentedControlItem value="day">Day</SegmentedControlItem>
            {change !== 'removed' && (
              <SegmentedControlItem
                disabled={change === 'destinationDisabled'}
                value="week"
              >
                Week
              </SegmentedControlItem>
            )}
            <SegmentedControlItem value="month">Month</SegmentedControlItem>
          </Example>
        );
        expect(indicator()).toBeNull();
        expect(animations[0].cancel).toHaveBeenCalled();
      }
    );

    it('cancels when reordering moves the destination', () => {
      const rectSpy = jest
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function () {
          const index = Array.from(
            this.parentElement?.querySelectorAll('[role="radio"]') || []
          ).indexOf(this);

          return {
            left: Math.max(index, 0) * 100,
            top: 0,
            width: 90,
            height: 32,
          };
        });
      try {
        const { rerender } = render(<Example />);
        fireEvent.click(radio('Week'), { detail: 1 });
        rerender(
          <Example>
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
            <SegmentedControlItem value="day">Day</SegmentedControlItem>
            <SegmentedControlItem value="month">Month</SegmentedControlItem>
          </Example>
        );
        expect(indicator()).toBeNull();
        expect(animations[0].cancel).toHaveBeenCalled();
      } finally {
        rectSpy.mockRestore();
      }
    });

    it('stops an active slide when reduced motion is enabled', () => {
      render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      act(() => {
        reduced = true;
        mediaListeners.forEach(listener => listener());
      });
      expect(indicator()).toBeNull();
      expect(animations[0].cancel).toHaveBeenCalled();
    });

    it('discards a pending pointer slide when animation is disabled before acceptance', () => {
      const { rerender } = render(<Example value="day" />);
      fireEvent.click(radio('Week'), { detail: 1 });
      rerender(<Example value="day" isAnimated={false} />);
      rerender(<Example value="week" isAnimated={false} />);
      expect(Element.prototype.animate).not.toHaveBeenCalled();
      expect(indicator()).toBeNull();
    });

    it('ignores completion callbacks from replaced animations', () => {
      render(<Example />);
      fireEvent.click(radio('Week'), { detail: 1 });
      const staleFinish = animations[0].onfinish;
      fireEvent.click(radio('Month'), { detail: 1 });
      act(() => staleFinish());
      expect(indicator()).toBeInTheDocument();
      act(() => animations[1].onfinish());
      expect(indicator()).toBeNull();
    });

    it('supports special characters in values without CSS.escape', () => {
      window.CSS = undefined;
      const previous = 'day\\q';
      render(
        <Example defaultValue={previous}>
          <SegmentedControlItem value={previous}>Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
        </Example>
      );
      fireEvent.click(radio('Week'), { detail: 1 });
      expect(Element.prototype.animate).toHaveBeenCalledTimes(1);
    });
  });
});
