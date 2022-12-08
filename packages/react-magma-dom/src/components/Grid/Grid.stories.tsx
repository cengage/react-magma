import React from 'react';
import { Grid, GridProps, GridItem } from './Grid';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  component: Grid,
  title: 'Grid',
  argTypes: {},
} as Meta;

const Template: Story<GridProps> = args => (
  <Grid
    gridTemplateColumns="repeat(4, 1fr)"
    gridTemplateRows="auto"
    gridGap="1em"
    {...args}
  >
    <GridItem gridColumn="1 / 4">
      Test Section
    </GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
  </Grid>
);

export const Default = Template.bind({});
