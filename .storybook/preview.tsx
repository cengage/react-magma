import { StoryContext } from '@storybook/react';
import * as React from 'react';
import { GlobalStyles } from '../packages/react-magma-dom/src/theme/GlobalStyles';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const withMagma = (StoryFn: Function, context: StoryContext) => {
  return (
    <div>
      <GlobalStyles />
      <StoryFn />
    </div>
  );
};

export const decorators = [withMagma];

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
