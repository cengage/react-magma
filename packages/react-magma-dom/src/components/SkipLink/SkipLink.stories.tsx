import React from 'react';

import { Meta } from '@storybook/react';

import { ButtonVariant } from '../Button';
import { Paragraph } from '../Paragraph';
import { SkipLinkContent } from '../SkipLinkContent';
import { TypographyVisualStyle } from '../Typography';

import { SkipLink } from '.';

export default {
  component: SkipLink,
  title: 'SkipLink',
} as Meta;

const arr = Array.apply(null, Array(56)).map(function (x, i) {
  return i;
});

export const Default = () => {
  return (
    <>
      <Paragraph>
        Press Tab on your keyboard for the Skip Navigation button to appear.
      </Paragraph>
      <SkipLink variant={ButtonVariant.solid}>Skip to content</SkipLink>
      {arr.map(index => (
        <Paragraph key={index} noMargins>
          #{index}
        </Paragraph>
      ))}
      <SkipLinkContent>
        <Paragraph visualStyle={TypographyVisualStyle.headingXLarge}>
          Content to jump to.
        </Paragraph>
      </SkipLinkContent>
    </>
  );
};
