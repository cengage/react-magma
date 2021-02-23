import React from 'react';
import { Checkbox } from '.';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { FormGroup } from '../FormGroup';
import { magma } from '../../theme/magma';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const Default = () => {
  const [checked, updateChecked] = React.useState(false);
  return (
    <FormGroup labelText="Choose One or More">
      <Checkbox
        defaultChecked={true}
        id="customId"
        labelText="Uncontrolled Checkbox"
      />

      <Checkbox
        checked={checked}
        labelText="Controlled Checkbox"
        onChange={() => updateChecked(!checked)}
      />

      <Checkbox labelText="Checkbox label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines" />
    </FormGroup>
  );
};

export const Indeterminate = () => {
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
