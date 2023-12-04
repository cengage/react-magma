import React from 'react';
import { Paragraph } from '.';
import { TypographyContextVariant, TypographyVisualStyle } from '../Typography';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Paragraph,
  title: 'Paragraph',
} as Meta;

export const Default = () => {
  return (
    <>
      <Paragraph visualStyle={TypographyVisualStyle.bodyLarge}>
        Paragraph Body Large
      </Paragraph>
      <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
        Paragraph Body Medium
      </Paragraph>
      <Paragraph visualStyle={TypographyVisualStyle.bodySmall}>
        Paragraph Body Small
      </Paragraph>
      <Paragraph visualStyle={TypographyVisualStyle.bodyXSmall}>
        Paragraph Body X-Small
      </Paragraph>

      <Paragraph
        visualStyle={TypographyVisualStyle.bodyLarge}
        contextVariant={TypographyContextVariant.narrative}
      >
        Paragraph Narrative Large
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyMedium}
        contextVariant={TypographyContextVariant.narrative}
      >
        Paragraph Narrative Medium
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodySmall}
        contextVariant={TypographyContextVariant.narrative}
      >
        Paragraph Narrative Small
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyXSmall}
        contextVariant={TypographyContextVariant.narrative}
      >
        Paragraph Narrative X-Small
      </Paragraph>

      <Paragraph
        visualStyle={TypographyVisualStyle.bodyLarge}
        contextVariant={TypographyContextVariant.expressive}
      >
        Paragraph Expressive Large
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyMedium}
        contextVariant={TypographyContextVariant.expressive}
      >
        Paragraph Expressive Medium
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodySmall}
        contextVariant={TypographyContextVariant.expressive}
      >
        Paragraph Expressive Small
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyXSmall}
        contextVariant={TypographyContextVariant.expressive}
      >
        Paragraph Expressive X-Small
      </Paragraph>
    </>
  );
};
