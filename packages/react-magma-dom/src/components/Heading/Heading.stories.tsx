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
} as Meta;

export const Default = () => {
  return (
    <>
      <Heading level={1}>Heading 1 (X-Large) - Productive</Heading>
      <Heading level={2}>Heading 2 (Large) - Productive</Heading>
      <Heading level={3}>Heading 3 (Medium) - Productive</Heading>
      <Heading level={4}>Heading 4 (Small) - Productive</Heading>
      <Heading level={5}>Heading 5 (X-Small) - Productive</Heading>
      <Heading level={6}>Heading 6 (2X-Small) - Productive</Heading>
      <br />
      <Heading
        level={1}
        contextVariant={TypographyContextVariant.expressive}
        visualStyle={TypographyVisualStyle.heading2XLarge}
      >
        Heading 1 (2X-Large) - Expressive
      </Heading>
      <Heading level={1} contextVariant={TypographyContextVariant.expressive}>
        Heading 1 (X-Large) - Expressive
      </Heading>
      <Heading level={2} contextVariant={TypographyContextVariant.expressive}>
        Heading 2 (Large) - Expressive
      </Heading>
      <Heading level={3} contextVariant={TypographyContextVariant.expressive}>
        Heading 3 (Medium) - Expressive
      </Heading>
      <Heading level={4} contextVariant={TypographyContextVariant.expressive}>
        Heading 4 (Small) - Expressive
      </Heading>
      <Heading level={5} contextVariant={TypographyContextVariant.expressive}>
        Heading 5 (X-Small) - Expressive
      </Heading>
      <Heading level={6} contextVariant={TypographyContextVariant.expressive}>
        Heading 6 (2X-Small) - Expressive
      </Heading>
      <br />
      <Heading level={1} contextVariant={TypographyContextVariant.narrative}>
        Heading 1 (X-Large) - Narrative
      </Heading>
      <Heading level={2} contextVariant={TypographyContextVariant.narrative}>
        Heading 2 (Large) - Narrative
      </Heading>
      <Heading level={3} contextVariant={TypographyContextVariant.narrative}>
        Heading 3 (Medium) - Narrative
      </Heading>
      <Heading level={4} contextVariant={TypographyContextVariant.narrative}>
        Heading 4 (Small) - Narrative
      </Heading>
      <Heading level={5} contextVariant={TypographyContextVariant.narrative}>
        Heading 5 (X-Small) - Narrative
      </Heading>
      <Heading level={6} contextVariant={TypographyContextVariant.narrative}>
        Heading 6 (2X-Small) - Narrative
      </Heading>
    </>
  );
};

export const Colors = () => {
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

export const Inverse = () => {
  return (
    <Card isInverse style={{ padding: '0 24px' }}>
      <Heading level={1} isInverse>
        Heading 1 (X-Large) - Productive
      </Heading>
      <Heading level={2} isInverse>
        Heading 2 (Large) - Productive
      </Heading>
      <Heading level={3} isInverse>
        Heading 3 (Medium) - Productive
      </Heading>
      <Heading level={4} isInverse>
        Heading 4 (Small) - Productive
      </Heading>
      <Heading level={5} isInverse>
        Heading 5 (X-Small) - Productive
      </Heading>
      <Heading level={6} isInverse>
        Heading 6 (2X-Small) - Productive
      </Heading>
      <br />
      <Heading
        level={1}
        contextVariant={TypographyContextVariant.expressive}
        visualStyle={TypographyVisualStyle.heading2XLarge}
        isInverse
      >
        Heading 1 (2X-Large) - Expressive
      </Heading>
      <Heading
        level={1}
        contextVariant={TypographyContextVariant.expressive}
        isInverse
      >
        Heading 1 (X-Large) - Expressive
      </Heading>
      <Heading
        level={2}
        contextVariant={TypographyContextVariant.expressive}
        isInverse
      >
        Heading 2 (Large) - Expressive
      </Heading>
      <Heading
        level={3}
        contextVariant={TypographyContextVariant.expressive}
        isInverse
      >
        Heading 3 (Medium) - Expressive
      </Heading>
      <Heading
        level={4}
        contextVariant={TypographyContextVariant.expressive}
        isInverse
      >
        Heading 4 (Small) - Expressive
      </Heading>
      <Heading
        level={5}
        contextVariant={TypographyContextVariant.expressive}
        isInverse
      >
        Heading 5 (X-Small) - Expressive
      </Heading>
      <Heading
        level={6}
        contextVariant={TypographyContextVariant.expressive}
        isInverse
      >
        Heading 6 (2X-Small) - Expressive
      </Heading>
    </Card>
  );
};
