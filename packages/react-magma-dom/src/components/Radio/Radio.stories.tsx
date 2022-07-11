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
        id="basicGroup"
        name="basic"
        value="selectedOption"
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
        id="basicGroup"
        name="basic"
        value="selectedOption"
      >
        <Radio id="radio4" disabled labelText="Disabled" value="4" />
        <Radio
          id="radio5"
          disabled
          labelText="Disabled checked"
          value="selectedOption"
        />
      </RadioGroup>
      <RadioGroup
        labelText="Error"
        id="basicGroup"
        name="basic"
        value="selectedOption"
        errorMessage="Error message goes here"
      >
        <Radio id="radio5" labelText="Error" value="5" />
        <Radio id="radio6" labelText="Error checked" value="selectedOption" />
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
            value="selectedOption"
          >
            <Radio id="inverseRadio" labelText="Inverse" value="default" />
            <Radio id="inverseRadio0" labelText="Inverse with success color" value="0" color={magma.colors.success}/>
            <Radio
              isInverse
              disabled
              id="disabledInverseRadio"
              labelText="Disabled inverse"
              value="selectedOption"
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
            value="selectedOption"
          >
            <Radio id="errorInverseRadio" labelText="Error inverse" value="3" />
            <Radio
              id="errorInverseErrorGroup"
              isInverse
              labelText="Error inverse checked"
              value="selectedOption"
            />
          </RadioGroup>
        </CardBody>
      </Card>
    </>
  );
};
