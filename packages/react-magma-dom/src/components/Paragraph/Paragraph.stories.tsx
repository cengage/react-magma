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
        Body Large
      </Paragraph>
      <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
        Body Medium
      </Paragraph>
      <Paragraph visualStyle={TypographyVisualStyle.bodySmall}>
        Body Small
      </Paragraph>
      <Paragraph visualStyle={TypographyVisualStyle.bodyXSmall}>
        Body X-Small
      </Paragraph>

      <Paragraph
        visualStyle={TypographyVisualStyle.bodyLarge}
        contextVariant={TypographyContextVariant.narrative}
      >
        Narrative Large
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyMedium}
        contextVariant={TypographyContextVariant.narrative}
      >
        Narrative Medium
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodySmall}
        contextVariant={TypographyContextVariant.narrative}
      >
        Narrative Small
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyXSmall}
        contextVariant={TypographyContextVariant.narrative}
      >
        Narrative X-Small
      </Paragraph>

      <Paragraph
        visualStyle={TypographyVisualStyle.bodyLarge}
        contextVariant={TypographyContextVariant.expressive}
      >
        Expressive Large
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyMedium}
        contextVariant={TypographyContextVariant.expressive}
      >
        Expressive Medium
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodySmall}
        contextVariant={TypographyContextVariant.expressive}
      >
        Expressive Small
      </Paragraph>
      <Paragraph
        visualStyle={TypographyVisualStyle.bodyXSmall}
        contextVariant={TypographyContextVariant.expressive}
      >
        Expressive X-Small
      </Paragraph>
    </>
  );
};
