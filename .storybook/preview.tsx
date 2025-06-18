import * as React from 'react';

import { StoryContext } from '@storybook/react';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import { GlobalStyles } from '../packages/react-magma-dom/src/theme/GlobalStyles';

const withMagma = (StoryFn: () => JSX.Element, _context: StoryContext) => {
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
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  docs: { source: { type: 'code' } }, // required for https://github.com/storybookjs/storybook/issues/19575
};
