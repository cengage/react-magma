import React from 'react';
import {
  Flex,
  FlexProps,
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexJustify,
  FlexWrap,
} from '.';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<FlexProps> = args => (
  <Flex isContainer {...args}>
    <Flex isItem xs={12}>
      <Card>
        <CardBody>xs=12</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs={12} sm={6}>
      <Card>
        <CardBody>xs=12 sm=6</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs={12} sm={6}>
      <Card>
        <CardBody>xs=12 sm=6</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs={6} sm={3}>
      <Card>
        <CardBody>xs=6 sm=3</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs={6} sm={3}>
      <Card>
        <CardBody>xs=6 sm=3</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs={6} sm={3}>
      <Card>
        <CardBody>xs=6 sm=3</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs={6} sm={3}>
      <Card>
        <CardBody>xs=6 sm=3</CardBody>
      </Card>
    </Flex>
  </Flex>
);

export default {
  title: 'Flex',
  component: Flex,
  argTypes: {
    alignContent: {
      control: {
        type: 'select',
        options: FlexAlignContent,
      },
    },
    alignItems: {
      control: {
        type: 'select',
        options: FlexAlignItems,
      },
    },
    direction: {
      control: {
        type: 'select',
        options: FlexDirection,
      },
    },
    justify: {
      control: {
        type: 'select',
        options: FlexJustify,
      },
    },
    wrap: {
      control: {
        type: 'select',
        options: FlexWrap,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  spacing: 2,
};
