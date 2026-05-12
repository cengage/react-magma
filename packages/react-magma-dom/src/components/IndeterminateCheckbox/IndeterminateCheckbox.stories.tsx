import React from 'react';

import { Meta } from '@storybook/react-webpack5';

import { magma } from '../../theme/magma';
import { Card, CardBody } from '../Card';
import { Checkbox } from '../Checkbox';
import { FormGroup } from '../FormGroup';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';

export default {
  component: IndeterminateCheckbox,
  title: 'Indeterminate Checkbox',
} as Meta;

export const Default = () => {
  return (
    <FormGroup labelText="Indeterminate Checkbox Examples">
      <IndeterminateCheckbox
        color={magma.colors.primary}
        defaultChecked
        status={IndeterminateCheckboxStatus.indeterminate}
        labelText="Indeterminate checkbox"
        id="0"
      />
      <IndeterminateCheckbox
        disabled
        defaultChecked
        status={IndeterminateCheckboxStatus.indeterminate}
        labelText="Disabled indeterminate checkbox"
        id="1"
      />
      <IndeterminateCheckbox
        defaultChecked
        status={IndeterminateCheckboxStatus.indeterminate}
        labelText="Error indeterminate checkbox"
        id="2"
        errorMessage="Error"
      />
    </FormGroup>
  );
};

export const Inverse = () => {
  return (
    <Card isInverse>
      <CardBody>
        <FormGroup
          labelText="Inverse Indeterminate Checkbox Examples"
          isInverse
        >
          <IndeterminateCheckbox
            isInverse
            labelText="Indeterminate checkbox inverse"
            status={IndeterminateCheckboxStatus.indeterminate}
            id="3"
          />
          <IndeterminateCheckbox
            disabled
            isInverse
            labelText="Disabled indeterminate checkbox inverse"
            status={IndeterminateCheckboxStatus.indeterminate}
            id="4"
          />
          <IndeterminateCheckbox
            isInverse
            labelText="Error indeterminate checkbox"
            status={IndeterminateCheckboxStatus.indeterminate}
            id="5"
            errorMessage="Error"
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export const Behavior = () => {
  const [checkedItems, setCheckedItems] = React.useState<Array<boolean>>([
    true,
    false,
    false,
    false,
  ]);

  const [status, setStatus] = React.useState<IndeterminateCheckboxStatus>(
    IndeterminateCheckboxStatus.indeterminate
  );

  function getStatus(items: Array<boolean>) {
    return items.every(Boolean)
      ? IndeterminateCheckboxStatus.checked
      : items.some(Boolean)
        ? IndeterminateCheckboxStatus.indeterminate
        : IndeterminateCheckboxStatus.unchecked;
  }

  function handleUpdateIndeterminateChecked(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedCheckedItems = Array(4).fill(event.target.checked);

    setCheckedItems(updatedCheckedItems);
    setStatus(getStatus(updatedCheckedItems));
  }

  function handleColorChecked(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedCheckedItems = [...checkedItems];

    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
    setStatus(getStatus(updatedCheckedItems));
  }

  return (
    <FormGroup labelText="Colors group" isTextVisuallyHidden>
      <IndeterminateCheckbox
        onChange={handleUpdateIndeterminateChecked}
        status={status}
        labelText="Colors"
        id="indeterminateCheckbox"
      />
      <div style={{ marginLeft: magma.spaceScale.spacing08 }}>
        <Checkbox
          checked={checkedItems[0]}
          onChange={e => handleColorChecked(0, e)}
          labelText="Red"
          id="Red"
        />
        <Checkbox
          checked={checkedItems[1]}
          onChange={e => handleColorChecked(1, e)}
          labelText="Blue"
          id="Blue"
        />
        <Checkbox
          checked={checkedItems[2]}
          onChange={e => handleColorChecked(2, e)}
          labelText="Green"
          id="Green"
        />
        <Checkbox
          checked={checkedItems[3]}
          onChange={e => handleColorChecked(3, e)}
          labelText="Yellow"
          id="Yellow"
        />
      </div>
    </FormGroup>
  );
};

/**
 * Performance reproduction story.
 *
 * Renders a large list of controlled IndeterminateCheckbox + Checkbox
 * to measure how long mass status updates take.
 *
 * Buttons trigger:
 *  - "Check all" — sets every status to `checked`
 *  - "Uncheck all" — sets every status to `unchecked`
 *  - "Indeterminate all" — sets every status to `indeterminate`
 *
 * Each click measures the time from setState to the next paint
 * via requestAnimationFrame, and prints it.
 */
export const PerformanceLargeList = (args: { count: number }) => {
  const { count } = args;

  const [statuses, setStatuses] = React.useState<IndeterminateCheckboxStatus[]>(
    () =>
      Array.from({ length: count }, () => IndeterminateCheckboxStatus.unchecked)
  );
  const [lastMs, setLastMs] = React.useState<number | null>(null);
  const [lastAction, setLastAction] = React.useState<string>('—');

  // Re-create statuses array if count changes
  React.useEffect(() => {
    setStatuses(
      Array.from({ length: count }, () => IndeterminateCheckboxStatus.unchecked)
    );
  }, [count]);

  const measure = React.useCallback((label: string, mutate: () => void) => {
    const start = performance.now();

    mutate();

    // Two RAFs: first fires after React commit, second after paint.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLastAction(label);
        setLastMs(performance.now() - start);
      });
    });
  }, []);

  const setAll = React.useCallback(
    (status: IndeterminateCheckboxStatus, label: string) => {
      measure(label, () => {
        setStatuses(prev => prev.map(() => status));
      });
    },
    [measure]
  );

  return (
    <div>
      <p>
        Count: <strong>{count}</strong> · Last action:{' '}
        <strong>{lastAction}</strong> · Time:{' '}
        <strong>{lastMs == null ? '—' : `${lastMs.toFixed(0)} ms`}</strong>
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() =>
            setAll(IndeterminateCheckboxStatus.checked, 'Check all')
          }
        >
          Check all
        </button>
        <button
          type="button"
          onClick={() =>
            setAll(IndeterminateCheckboxStatus.unchecked, 'Uncheck all')
          }
        >
          Uncheck all
        </button>
        <button
          type="button"
          onClick={() =>
            setAll(
              IndeterminateCheckboxStatus.indeterminate,
              'Indeterminate all'
            )
          }
        >
          Indeterminate all
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
        {statuses.map((status, i) => (
          <IndeterminateCheckbox
            key={i}
            id={`perf-cb-${i}`}
            labelText={`Checkbox ${i}`}
            status={status}
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
