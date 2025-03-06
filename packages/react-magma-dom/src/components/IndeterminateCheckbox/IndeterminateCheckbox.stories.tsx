import React from 'react';

import { Meta } from '@storybook/react/types-6-0';

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
        id="5"
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
