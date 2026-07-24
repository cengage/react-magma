import React from 'react';

import { Meta } from '@storybook/react-webpack5';
import { useVirtualizer } from '@tanstack/react-virtual';

import { magma } from '../../theme/magma';
import { Card, CardBody } from '../Card';
import { FormGroup } from '../FormGroup';

import { Checkbox } from '.';

export default {
  component: Checkbox,
  title: 'Checkbox',
} as Meta;

export const Default = () => {
  const [checked, updateChecked] = React.useState(false);

  return (
    <>
      <FormGroup labelText="Choose one or more">
        <Checkbox checked labelText="Uncontrolled checkbox" defaultChecked />

        <Checkbox
          labelText="Controlled checkbox"
          onChange={() => updateChecked(!checked)}
        />

        <Checkbox
          labelText="Checkbox label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines"
          onChange={() => updateChecked(!checked)}
        />
      </FormGroup>
      <FormGroup labelText="Colors">
        <Checkbox
          checked
          color={magma.colors.primary}
          labelText="Primary checked"
          onChange={() => updateChecked(!checked)}
        />
        <Checkbox
          checked
          color={magma.colors.success}
          labelText="Success checked"
          onChange={() => updateChecked(!checked)}
        />

        <Checkbox
          checked
          color={magma.colors.danger}
          labelText="Danger checked"
          onChange={() => updateChecked(!checked)}
        />

        <Checkbox
          checked
          color={magma.colors.warning}
          labelText="Warning checked"
          onChange={() => updateChecked(!checked)}
        />

        <Checkbox
          checked
          color={magma.colors.info}
          labelText="Info checked"
          onChange={() => updateChecked(!checked)}
        />
      </FormGroup>
      <FormGroup labelText="Disabled">
        <Checkbox disabled labelText="Disabled checkbox" />

        <Checkbox
          defaultChecked
          disabled
          labelText="Disabled checked checkbox"
        />
      </FormGroup>
      <FormGroup labelText="Error">
        <Checkbox
          errorMessage="Please check this box"
          id="customId"
          labelText="Checkbox with error"
        />
      </FormGroup>
    </>
  );
};

export const Inverse = () => {
  const [checked, updateChecked] = React.useState(false);

  return (
    <Card isInverse>
      <CardBody>
        <FormGroup labelText="Choose one or more" isInverse>
          <Checkbox isInverse checked labelText="Checked checkbox" />
          <Checkbox isInverse labelText="Unchecked checkbox" />
        </FormGroup>

        <FormGroup labelText="Colors" isInverse>
          <Checkbox
            checked
            color={magma.colors.primary200}
            isInverse
            labelText="Primary checked"
            onChange={() => updateChecked(!checked)}
          />
          <Checkbox
            checked
            color={magma.colors.success200}
            isInverse
            labelText="Success checked"
            onChange={() => updateChecked(!checked)}
          />

          <Checkbox
            checked
            color={magma.colors.danger200}
            isInverse
            labelText="Danger checked"
            onChange={() => updateChecked(!checked)}
          />

          <Checkbox
            checked
            color={magma.colors.warning200}
            isInverse
            labelText="Warning checked"
            onChange={() => updateChecked(!checked)}
          />

          <Checkbox
            checked
            color={magma.colors.info200}
            isInverse
            labelText="Info checked"
            onChange={() => updateChecked(!checked)}
          />
        </FormGroup>

        <FormGroup labelText="Disabled" isInverse>
          <Checkbox isInverse disabled labelText="Disabled checkbox" />

          <Checkbox
            isInverse
            defaultChecked
            disabled
            labelText="Disabled checked checkbox"
          />
        </FormGroup>

        <FormGroup labelText="Error" isInverse>
          <Checkbox
            isInverse
            errorMessage="Please check this box"
            labelText="Checkbox with error"
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

/**
 * Performance reproduction story.
 *
 * Renders N controlled Checkbox components and lets you flip their `checked`
 * prop in bulk via the buttons. Measures time from setState to the next paint
 * (via two requestAnimationFrame ticks) so we can see how heavy a mass update
 * is for a large list.
 */
export const PerformanceLargeList = (args: { count: number }) => {
  const { count } = args;

  const [checkedArr, setCheckedArr] = React.useState<boolean[]>(() =>
    Array.from({ length: count }, () => false)
  );
  const [lastMs, setLastMs] = React.useState<number | null>(null);
  const [lastAction, setLastAction] = React.useState<string>('—');

  React.useEffect(() => {
    setCheckedArr(Array.from({ length: count }, () => false));
  }, [count]);

  const measure = React.useCallback((label: string, mutate: () => void) => {
    const start = performance.now();

    mutate();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLastAction(label);
        setLastMs(performance.now() - start);
      });
    });
  }, []);

  const setAll = React.useCallback(
    (value: boolean, label: string) => {
      measure(label, () => {
        setCheckedArr(prev => prev.map(() => value));
      });
    },
    [measure]
  );

  const toggleAll = React.useCallback(() => {
    measure('Toggle all', () => {
      setCheckedArr(prev => prev.map(v => !v));
    });
  }, [measure]);

  return (
    <div>
      <p>
        Count: <strong>{count}</strong> · Last action:{' '}
        <strong>{lastAction}</strong> · Time:{' '}
        <strong>{lastMs == null ? '—' : `${lastMs.toFixed(0)} ms`}</strong>
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => setAll(true, 'Check all')}>
          Check all
        </button>
        <button type="button" onClick={() => setAll(false, 'Uncheck all')}>
          Uncheck all
        </button>
        <button type="button" onClick={toggleAll}>
          Toggle all
        </button>
      </div>
      <div
        style={{
          maxHeight: 600,
          overflow: 'auto',
          border: '1px solid #ccc',
          padding: 8,
        }}
      >
        {checkedArr.map((checked, i) => (
          <Checkbox
            key={i}
            id={`perf-cb-${i}`}
            labelText={`Checkbox ${i}`}
            checked={checked}
          />
        ))}
      </div>
    </div>
  );
};

PerformanceLargeList.argTypes = {
  count: {
    control: { type: 'number', min: 100, max: 10000, step: 100 },
  },
};

PerformanceLargeList.args = {
  count: 1400,
};

export const Lots = (args: { numberRows: number }) => {
  function getCheckboxes() {
    const boxes = [];

    for (let i = 0; i < args.numberRows; i++) {
      boxes.push(<Checkbox key={i} checked labelText="Checked checkbox" />);
    }

    return boxes;
  }

  return <>{getCheckboxes()}</>;
};
Lots.args = {
  numberRows: 2000,
};

/**
 * Recommended approach for very large lists (thousands of checkboxes).
 *
 * Only the checkboxes visible in the scroll viewport are mounted (windowing
 * via `@tanstack/react-virtual`), so render cost stays flat regardless of the
 * total count. Two things are required to make this work correctly:
 *
 * 1. Checked state must be controlled and stored OUTSIDE the DOM (here a
 *    `Set` of checked ids). Off-screen rows are unmounted, so any state kept
 *    only in the DOM would be lost while scrolling.
 * 2. For assistive technology, expose the full list size on each control via
 *    `aria-setsize` / `aria-posinset`, since screen readers cannot traverse
 *    rows that are not in the DOM. "Select all" style actions should operate
 *    on the data, not the rendered nodes.
 */
export const VirtualizedList = (args: { count: number }) => {
  const { count } = args;
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [checkedIds, setCheckedIds] = React.useState<Set<number>>(
    () => new Set()
  );

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 8,
  });

  const toggle = React.useCallback((index: number) => {
    setCheckedIds(prev => {
      const next = new Set(prev);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }, []);

  return (
    <>
      <p>
        Rendering <strong>{count.toLocaleString()}</strong> checkboxes, but only
        the visible rows are mounted. Checked state lives in a <code>Set</code>{' '}
        outside the DOM so it survives scrolling.
      </p>
      <div
        ref={parentRef}
        style={{ height: 400, overflow: 'auto', border: '1px solid #ccc' }}
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: 'relative',
            width: '100%',
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
              }}
            >
              <Checkbox
                id={`virtual-cb-${virtualRow.index}`}
                labelText={`Checkbox ${virtualRow.index}`}
                checked={checkedIds.has(virtualRow.index)}
                onChange={() => toggle(virtualRow.index)}
                aria-setsize={count}
                aria-posinset={virtualRow.index + 1}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
VirtualizedList.args = {
  count: 10000,
};
VirtualizedList.argTypes = {
  count: {
    control: { type: 'number', min: 1000, max: 100000, step: 1000 },
  },
};
