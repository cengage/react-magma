import React from 'react';

import { Meta } from '@storybook/react/types-6-0';

import { Card } from '../..';
import { TypographyContextVariant, TypographyVisualStyle } from '../Typography';

import { Paragraph } from '.';

export default {
  component: Paragraph,
  title: 'Paragraph',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    noMargins: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    noBottomMargin: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    noTopMargin: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} as Meta;

export const Default = {
  render: args => {
    return (
      <Card isInverse={args.isInverse} style={{ padding: '0 24px' }}>
        <Paragraph visualStyle={TypographyVisualStyle.bodyLarge} {...args}>
          Paragraph Body Large
        </Paragraph>
        <Paragraph visualStyle={TypographyVisualStyle.bodyMedium} {...args}>
          Paragraph Body Medium
        </Paragraph>
        <Paragraph visualStyle={TypographyVisualStyle.bodySmall} {...args}>
          Paragraph Body Small
        </Paragraph>
        <Paragraph visualStyle={TypographyVisualStyle.bodyXSmall} {...args}>
          Paragraph Body X-Small
        </Paragraph>

        <Paragraph
          visualStyle={TypographyVisualStyle.bodyLarge}
          contextVariant={TypographyContextVariant.narrative}
          {...args}
        >
          Paragraph Narrative Large
        </Paragraph>
        <Paragraph
          visualStyle={TypographyVisualStyle.bodyMedium}
          contextVariant={TypographyContextVariant.narrative}
          {...args}
        >
          Paragraph Narrative Medium
        </Paragraph>
        <Paragraph
          visualStyle={TypographyVisualStyle.bodySmall}
          contextVariant={TypographyContextVariant.narrative}
          {...args}
        >
          Paragraph Narrative Small
        </Paragraph>
        <Paragraph
          visualStyle={TypographyVisualStyle.bodyXSmall}
          contextVariant={TypographyContextVariant.narrative}
          {...args}
        >
          Paragraph Narrative X-Small
        </Paragraph>

        <Paragraph
          visualStyle={TypographyVisualStyle.bodyLarge}
          contextVariant={TypographyContextVariant.expressive}
          {...args}
        >
          Paragraph Expressive Large
        </Paragraph>
        <Paragraph
          visualStyle={TypographyVisualStyle.bodyMedium}
          contextVariant={TypographyContextVariant.expressive}
          {...args}
        >
          Paragraph Expressive Medium
        </Paragraph>
        <Paragraph
          visualStyle={TypographyVisualStyle.bodySmall}
          contextVariant={TypographyContextVariant.expressive}
          {...args}
        >
          Paragraph Expressive Small
        </Paragraph>
        <Paragraph
          visualStyle={TypographyVisualStyle.bodyXSmall}
          contextVariant={TypographyContextVariant.expressive}
          {...args}
        >
          Paragraph Expressive X-Small
        </Paragraph>
      </Card>
    );
  },
};
