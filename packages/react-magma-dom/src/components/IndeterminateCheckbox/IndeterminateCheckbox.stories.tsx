import React from 'react';

import { Meta } from '@storybook/react';

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
