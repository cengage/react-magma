import React from 'react';
import { Card, CardBody } from '../Card';
import { magma } from '../../theme/magma';
import { Radio } from '.';
import { RadioGroup } from '../RadioGroup';

export default {
  component: Radio,
  title: 'Radio',
};

export const Default = () => {
  return (
    <RadioGroup labelText="Basic Usage" id="basicGroup" name="basic">
      <Radio id="radio1" labelText="Option one label" value="1" />

      <Radio
        id="radio2"
        color={magma.colors.success}
        labelText="Option two label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines"
        value="2"
      />
    </RadioGroup>
  );
};

export const Inverse = () => {
  return (
    <Card isInverse style={{ marginBottom: magma.spaceScale.spacing04 }}>
      <CardBody>
        <RadioGroup
          labelText="Inverse Radio Buttons"
          id="inverseGroup"
          isInverse
          name="inverse"
        >
          <Radio id="inverseRadio" labelText="Inverse" value="default" />
          <Radio
            isInverse
            disabled
            id="disabledInverseRadio"
            labelText="Disabled inverse"
            value="disabled"
          />
        </RadioGroup>
      </CardBody>
    </Card>
  );
};
