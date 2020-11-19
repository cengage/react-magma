import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Toggle,
} from 'react-magma-dom';
import { ThemeContext } from 'react-magma-dom';

const StyledDiv = styled.div`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid ${props => props.theme.colors.neutral03};
  color: ${props => props.theme.colors.neutral};
  margin: 10px 0;
  padding: 20px;
`;

const DemoComponent = idPrefix => (
  <ThemeContext.Consumer>
    {theme =>
      theme && (
        <StyledDiv theme={theme}>
          <Heading level={2}>Example</Heading>
          <p>
            This is a demo component. Amgam themes are for demo purposes only,
            and do not meet accessibility requirements.
          </p>
          <Input
            id={`${idPrefix}-input`}
            labelText="Input"
            helperMessage="Helper text"
            errorMessage="Error message"
          />
          <Select
            name="basic"
            labelText="Select"
            items={[
              {
                value: 'red',
                label: 'Red',
              },
              {
                value: 'blue',
                label: 'Blue',
              },
              {
                value: 'green',
                label: 'Green',
              },
            ]}
          />
          <RadioGroup
            labelText="Radio Group"
            id={`${idPrefix}-radioGroup`}
            name="radio"
          >
            <Radio id={`${idPrefix}-radio1`} labelText="Radio 1" value="1" />
            <Radio id={`${idPrefix}-radio2`} labelText="Radio 2" value="2" />
          </RadioGroup>
          <Checkbox id={`${idPrefix}-checkbox`} labelText="Checkbox" />
          <Toggle id={`${idPrefix}-toggle`} labelText="Toggle" />
          <Button>Button</Button>
          <Button color="secondary">Secondary Button</Button>
          <Button color="success">Success Button</Button>
          <Button color="danger">Danger Button</Button>
        </StyledDiv>
      )
    }
  </ThemeContext.Consumer>
);

DemoComponent.propTypes = {
  idPrefix: PropTypes.string.isRequired,
};

export default DemoComponent;
