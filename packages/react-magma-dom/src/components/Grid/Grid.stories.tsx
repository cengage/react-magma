import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';

import { Grid, GridProps, GridItem } from './Grid';

export default {
  component: Grid,
  title: 'Grid',
  argTypes: {},
} as Meta;

const Template: StoryFn<GridProps> = args => (
  <Grid
    gridTemplateColumns="repeat(4, 1fr)"
    gridTemplateRows="auto"
    gridGap="1em"
    {...args}
  >
    <GridItem gridColumn="1 / 4" as="section">
      Test Section
    </GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
    <GridItem>Test</GridItem>
  </Grid>
);

export const Default = {
  render: Template,
};
