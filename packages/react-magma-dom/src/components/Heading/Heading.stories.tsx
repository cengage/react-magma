import React from 'react';
import { Heading } from '.';
import {
  TypographyContextVariant,
  TypographyColor,
  TypographyVisualStyle,
} from '../Typography';
import { Card } from '../Card';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Heading,
  title: 'Heading',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} as Meta;

export const Default = args => {
  return (
    <Card isInverse={args.isInverse} style={{ padding: '0 24px' }}>
      <Heading level={1} {...args}>
        Heading 1 (X-Large) - Productive
      </Heading>
      <Heading level={2} {...args}>
        Heading 2 (Large) - Productive
      </Heading>
      <Heading level={3} {...args}>
        Heading 3 (Medium) - Productive
      </Heading>
      <Heading level={4} {...args}>
        Heading 4 (Small) - Productive
      </Heading>
      <Heading level={5} {...args}>
        Heading 5 (X-Small) - Productive
      </Heading>
      <Heading level={6} {...args}>
        Heading 6 (2X-Small) - Productive
      </Heading>
      <br />
      <Heading
        level={1}
        contextVariant={TypographyContextVariant.expressive}
        visualStyle={TypographyVisualStyle.heading2XLarge}
        {...args}
      >
        Heading 1 (2X-Large) - Expressive
      </Heading>
      <Heading
        level={1}
        contextVariant={TypographyContextVariant.expressive}
        {...args}
      >
        Heading 1 (X-Large) - Expressive
      </Heading>
      <Heading
        level={2}
        contextVariant={TypographyContextVariant.expressive}
        {...args}
      >
        Heading 2 (Large) - Expressive
      </Heading>
      <Heading
        level={3}
        contextVariant={TypographyContextVariant.expressive}
        {...args}
      >
        Heading 3 (Medium) - Expressive
      </Heading>
      <Heading
        level={4}
        contextVariant={TypographyContextVariant.expressive}
        {...args}
      >
        Heading 4 (Small) - Expressive
      </Heading>
      <Heading
        level={5}
        contextVariant={TypographyContextVariant.expressive}
        {...args}
      >
        Heading 5 (X-Small) - Expressive
      </Heading>
      <Heading
        level={6}
        contextVariant={TypographyContextVariant.expressive}
        {...args}
      >
        Heading 6 (2X-Small) - Expressive
      </Heading>
      <br />
      <Heading
        level={1}
        contextVariant={TypographyContextVariant.narrative}
        {...args}
      >
        Heading 1 (X-Large) - Narrative
      </Heading>
      <Heading
        level={2}
        contextVariant={TypographyContextVariant.narrative}
        {...args}
      >
        Heading 2 (Large) - Narrative
      </Heading>
      <Heading
        level={3}
        contextVariant={TypographyContextVariant.narrative}
        {...args}
      >
        Heading 3 (Medium) - Narrative
      </Heading>
      <Heading
        level={4}
        contextVariant={TypographyContextVariant.narrative}
        {...args}
      >
        Heading 4 (Small) - Narrative
      </Heading>
      <Heading
        level={5}
        contextVariant={TypographyContextVariant.narrative}
        {...args}
      >
        Heading 5 (X-Small) - Narrative
      </Heading>
      <Heading
        level={6}
        contextVariant={TypographyContextVariant.narrative}
        {...args}
      >
        Heading 6 (2X-Small) - Narrative
      </Heading>
    </Card>
  );
};

export const Colors = args => {
  return (
    <>
      <Card style={{ padding: '0 24px' }}>
        <Heading level={3}>Heading - Color Default</Heading>
        <Heading level={3} color={TypographyColor.subdued}>
          Heading - Color Subdued
        </Heading>
        <Heading level={3} color={TypographyColor.danger}>
          Heading - Color Danger
        </Heading>
        <Heading level={3} color={TypographyColor.success}>
          Heading 3 - Color Success
        </Heading>
      </Card>
      <Card isInverse style={{ padding: '0 24px' }}>
        <Heading level={3} isInverse>
          Heading - Color Default
        </Heading>
        <Heading level={3} color={TypographyColor.subdued} isInverse>
          Heading - Color Subdued
        </Heading>
        <Heading level={3} color={TypographyColor.danger} isInverse>
          Heading - Color Danger
        </Heading>
        <Heading level={3} color={TypographyColor.success} isInverse>
          Heading 3 - Color Success
        </Heading>
      </Card>
    </>
  );
};

Colors.parameters = { controls: { exclude: ['isInverse'] } };
