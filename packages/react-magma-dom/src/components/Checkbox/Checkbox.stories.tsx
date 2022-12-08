import React, { useState } from 'react';
import { Card, CardBody } from '../Card';
import { Checkbox } from '.';
import { FormGroup } from '../FormGroup';
import { magma } from '../../theme/magma';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Checkbox,
  title: 'Checkbox',
} as Meta;

export const Default = () => {
  const [checked, updateChecked] = useState(false);
  return (
    <>
      <FormGroup labelText="Choose one or more">
        <Checkbox
          checked
          labelText="Uncontrolled checkbox"
          defaultChecked={true}
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
          defaultChecked={true}
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
  const [checked, updateChecked] = useState(false);
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
            defaultChecked={true}
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
