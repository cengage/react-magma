import React from 'react';
import { Card, CardBody } from '../Card';
import { Checkbox } from '.';
import { FormGroup } from '../FormGroup';
import { magma } from '../../theme/magma';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const Default = () => {
  const [checked, updateChecked] = React.useState(false);
  return (
    <>
      <FormGroup labelText="Choose One or More">
        <Checkbox
          checked
          labelText="Uncontrolled checkbox"
          onChange={() => updateChecked(!checked)}
        />

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
          color={magma.colors.pop02}
          labelText="Pop checked"
          onChange={() => updateChecked(!checked)}
        />
      </FormGroup>
      <FormGroup labelText="Disabled">
        <Checkbox disabled labelText="Disabled checkbox" />

        <Checkbox
          defaultChecked={true}
          disabled
          id="customId"
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
  return (
    <Card isInverse>
      <CardBody>
        <FormGroup labelText="Choose One or More">
          <Checkbox isInverse checked labelText="Uncontrolled checkbox" />

          <Checkbox isInverse labelText="Controlled checkbox" />

          <Checkbox
            isInverse
            labelText="Checkbox label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines"
          />
        </FormGroup>
        <FormGroup labelText="Disabled">
          <Checkbox isInverse disabled labelText="Disabled checkbox" />

          <Checkbox
            isInverse
            defaultChecked={true}
            disabled
            id="customId"
            labelText="Disabled checked checkbox"
          />
        </FormGroup>
        <FormGroup labelText="Error">
          <Checkbox
            isInverse
            errorMessage="Please check this box"
            id="customId"
            labelText="Checkbox with error"
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};
