import React from 'react';

import { Meta } from '@storybook/react/types-6-0';

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
