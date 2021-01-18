import { StoryContext } from '@storybook/react';
import * as React from 'react';
import { GlobalStyles } from 'react-magma-dom';
import { withPerformance } from 'storybook-addon-performance';

const withMagma = (StoryFn: Function, context: StoryContext) => {
  return (
    <div>
      <GlobalStyles />
      <StoryFn />
    </div>
  );
};

export const decorators = [withMagma, withPerformance];
