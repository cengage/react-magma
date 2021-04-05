import { StoryContext } from '@storybook/react';
import * as React from 'react';
import { GlobalStyles } from '../packages/react-magma-dom/src/theme/GlobalStyles';
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

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};