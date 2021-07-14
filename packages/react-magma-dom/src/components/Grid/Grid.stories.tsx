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
    gridColumns={'repeat(4, 1fr)'}
    gridRows={'auto'}
    gridGap={'1em'}
    {...args}
  >
    <GridItem gridColSpan={'1 / 4'} as="section">
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
