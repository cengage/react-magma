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

const TemplateFixedWidth: Story<FlexProps> = args => (
  <Flex isContainer {...args}>
    <Flex isItem>
      <Card width={200}>
        <CardBody>Card has fixed width</CardBody>
      </Card>
    </Flex>
    <Flex isItem>
      <Card width={200}>
        <CardBody>Card has fixed width</CardBody>
      </Card>
    </Flex>
    <Flex isItem>
      <Card width={200}>
        <CardBody>Card has fixed width</CardBody>
      </Card>
    </Flex>
  </Flex>
);

export const FixedWidth = TemplateFixedWidth.bind({});
FixedWidth.args = {
  spacing: 2,
  justify: FlexJustify.center,
};

const TemplateAutoWidth: Story<FlexProps> = args => (
  <Flex isContainer {...args}>
    <Flex isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
    <Flex isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
  </Flex>
);

export const AutoWidth = TemplateAutoWidth.bind({});
AutoWidth.args = {
  spacing: 2,
};
