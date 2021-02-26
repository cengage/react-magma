import React from 'react';
import { Card, CardBody } from '../Card';
import { FormGroup } from '../FormGroup';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { magma } from '../../theme/magma';

export default {
  component: IndeterminateCheckbox,
  title: 'Indeterminate Checkbox',
};

export const Default = () => {
  const [checked, updateChecked] = React.useState(false);
  return (
    <FormGroup>
      <IndeterminateCheckbox
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
