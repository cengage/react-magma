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
    <>
      <RadioGroup
        labelText="Basic Usage"
        id="basicGroup1"
        name="basic1"
      >
        <Radio id="radio1" labelText="Option one label" value="1" />
        <Radio
          id="radio2"
          labelText="Option two label is really long and can wrap to multiple lines lorem ipsum dolar sit amet is really long and can wrap to multiple lines"
          value="2"
        />
        <Radio
          id="radio3"
          color={magma.colors.success}
          labelText="Option three label with success color"
          value="3"
        />
      </RadioGroup>
      <RadioGroup
        labelText="Disabled"
        id="basicGroup2"
        name="basic2"
        value="5"
      >
        <Radio id="radio4" disabled labelText="Disabled" value="4" />
        <Radio
          id="radio5"
          disabled
          labelText="Disabled checked"
          value="5"
        />
      </RadioGroup>
      <RadioGroup
        labelText="Error"
        id="basicGroup3"
        name="basic3"
        value="6"
        errorMessage="Error message goes here"
      >
        <Radio id="radio6" labelText="Error checked" value="6" />
        <Radio id="radio7" labelText="Error" value="7" />
      </RadioGroup>
    </>
  );
};

export const Inverse = () => {
  return (
    <>
      <Card isInverse style={{ marginBottom: magma.spaceScale.spacing04 }}>
        <CardBody>
          <RadioGroup
            labelText="Inverse Radio Buttons"
            id="inverseGroup"
            isInverse
            name="inverse"
            value="1"
          >
            <Radio id="inverseRadio" labelText="Inverse" value="default" />
            <Radio
              id="inverseRadio0"
              labelText="Inverse with success color"
              value="0"
              color={magma.colors.success}
            />
            <Radio
              isInverse
              disabled
              id="disabledInverseRadio"
              labelText="Disabled inverse"
              value="1"
            />
          </RadioGroup>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <RadioGroup
            errorMessage="Error message goes here"
            id="inverseErrorGroup"
            isInverse
            name="inverse"
            labelText="Error Inverse Radio Buttons"
            value="3"
          >
            <Radio id="errorInverseRadio" labelText="Error inverse" value="2" />
            <Radio
              id="errorInverseErrorGroup"
              isInverse
              labelText="Error inverse checked"
              value="3"
            />
          </RadioGroup>
        </CardBody>
      </Card>
    </>
  );
};
