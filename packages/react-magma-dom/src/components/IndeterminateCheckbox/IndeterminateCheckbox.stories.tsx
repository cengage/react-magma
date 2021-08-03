import React from 'react';
import { Card, CardBody } from '../Card';
import { Checkbox } from '../Checkbox';
import { FormGroup } from '../FormGroup';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { magma } from '../../theme/magma';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: IndeterminateCheckbox,
  title: 'Indeterminate Checkbox',
};

export default meta;

export const Default = () => {
  return (
    <FormGroup>
      <IndeterminateCheckbox
        color={magma.colors.primary}
        defaultChecked={true}
        status={IndeterminateCheckboxStatus.indeterminate}
        labelText="Indeterminate checkbox"
      />
      <IndeterminateCheckbox
        disabled
        defaultChecked={true}
        status={IndeterminateCheckboxStatus.indeterminate}
        labelText="Disabled indeterminate checkbox"
      />
    </FormGroup>
  );
};

export const Inverse = () => {
  return (
    <Card isInverse>
      <CardBody>
        <FormGroup>
          <IndeterminateCheckbox
            isInverse
            labelText="Indeterminate checkbox inverse"
            status={IndeterminateCheckboxStatus.indeterminate}
          />
          <IndeterminateCheckbox
            disabled
            isInverse
            labelText="Disabled indeterminate checkbox inverse"
            status={IndeterminateCheckboxStatus.indeterminate}
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
  ]);

  const status: IndeterminateCheckboxStatus = checkedItems.every(Boolean)
    ? IndeterminateCheckboxStatus.checked
    : checkedItems.some(Boolean)
    ? IndeterminateCheckboxStatus.indeterminate
    : IndeterminateCheckboxStatus.unchecked;

  function handleUpdateIndeterminateChecked(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setCheckedItems([event.target.checked, event.target.checked]);
  }

  function handleUpdateRedChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckedItems([event.target.checked, checkedItems[1]]);
  }

  function handleUpdateBlueChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckedItems([checkedItems[0], event.target.checked]);
  }

  return (
    <>
      <IndeterminateCheckbox
        onChange={handleUpdateIndeterminateChecked}
        status={status}
        labelText="Colors"
      />
      <div style={{ marginLeft: magma.spaceScale.spacing08 }}>
        <Checkbox
          checked={checkedItems[0]}
          onChange={handleUpdateRedChecked}
          labelText="Red"
        />
        <Checkbox
          checked={checkedItems[1]}
          onChange={handleUpdateBlueChecked}
          labelText="Blue"
        />
      </div>
    </>
  );
};
