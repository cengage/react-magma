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
import { Button, ButtonColor } from '../Button';
import { Story, Meta } from '@storybook/react/types-6-0';

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
        <CardBody>xs=6 sm=3 elit.</CardBody>
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
        <CardBody>Card has fixed width.</CardBody>
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
    <Flex isContainer isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
    <Flex isContainer isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
    <Flex isContainer isItem xs>
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

const TemplateOneSetWidth: Story<FlexProps> = args => (
  <Flex isContainer {...args}>
    <Flex isContainer isItem xs={6}>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
    <Flex isContainer isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
    <Flex isContainer isItem xs>
      <Card>
        <CardBody>Auto width</CardBody>
      </Card>
    </Flex>
  </Flex>
);

export const OneSetWidth = TemplateOneSetWidth.bind({});
OneSetWidth.args = {
  spacing: 2,
};

const TemplateContainerOnly: Story<FlexProps> = args => (
  <Card>
    <Flex isContainer {...args}>
      <Button color={ButtonColor.secondary}>Cancel</Button>
      <Button>Save</Button>
    </Flex>
  </Card>
);

export const ContainerOnly = TemplateContainerOnly.bind({});
ContainerOnly.args = {
  spacing: 0,
  justify: FlexJustify.flexEnd,
};

const TemplateNested: Story<FlexProps> = args => (
  <Flex isContainer spacing={1} {...args}>
    <Flex isContainer isItem xs={12} spacing={3}>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 1A</CardBody>
        </Card>
      </Flex>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 2A</CardBody>
        </Card>
      </Flex>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 3A</CardBody>
        </Card>
      </Flex>
    </Flex>
    <Flex isContainer isItem xs={12} spacing={3}>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 1B</CardBody>
        </Card>
      </Flex>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 2B</CardBody>
        </Card>
      </Flex>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 3B</CardBody>
        </Card>
      </Flex>
    </Flex>
    <Flex isContainer isItem xs={12} spacing={3}>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 1C</CardBody>
        </Card>
      </Flex>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 2C</CardBody>
        </Card>
      </Flex>
      <Flex isItem xs={4}>
        <Card>
          <CardBody>item 3C</CardBody>
        </Card>
      </Flex>
    </Flex>
  </Flex>
);

export const Nested = TemplateNested.bind({});
FixedWidth.args = {
  spacing: 2,
};

const cardStyles = { height: '100%', 'text-align': 'center' };

const TemplateOtherProps: Story<FlexProps> = args => (
  <Flex isContainer {...args}>
    <Flex isItem>
      <Card style={cardStyles}>
        <CardBody>Card Item</CardBody>
      </Card>
    </Flex>
    <Flex isItem>
      <Card style={cardStyles}>
        <CardBody>
          Taller
          <br />
          Card Item
        </CardBody>
      </Card>
    </Flex>
    <Flex isItem>
      <Card style={cardStyles}>
        <CardBody>Card Item</CardBody>
      </Card>
    </Flex>
    <Flex isItem>
      <Card style={cardStyles}>
        <CardBody>Card Item</CardBody>
      </Card>
    </Flex>
  </Flex>
);

export const OtherProps = TemplateOtherProps.bind({});
OtherProps.args = {
  spacing: 2,
  alignItems: FlexAlignItems.center,
  justify: FlexJustify.center,
  wrap: FlexWrap.nowrap,
};
