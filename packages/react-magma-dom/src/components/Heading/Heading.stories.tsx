import React from 'react';
import { Heading } from '.';
import { TypographyContextVariant, TypographyColor } from '../Typography';

export default {
  component: Heading,
  title: 'Heading',
};

export const Default = () => {
  return (
    <>
      <Heading level={1}>Heading 1 (X-Large)</Heading>
      <Heading level={2}>Heading 2 (Large)</Heading>
      <Heading level={3}>Heading 3 (Medium)</Heading>
      <Heading level={4}>Heading 4 (Small)</Heading>
      <Heading level={5}>Heading 5 (X-Small)</Heading>
      <Heading level={6}>Heading 6 (XX-Small)</Heading>

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
        Heading 6 (XX-Small) - Expressive
      </Heading>

      <Heading level={1} color={TypographyColor.subdued}>
        Heading 1 (X-Large) - Subdued
      </Heading>
      <Heading level={2} color={TypographyColor.subdued}>
        Heading 2 (Large) - Subdued
      </Heading>
      <Heading level={3} color={TypographyColor.subdued}>
        Heading 3 (Medium) - Subdued
      </Heading>
      <Heading level={4} color={TypographyColor.subdued}>
        Heading 4 (Small) - Subdued
      </Heading>
      <Heading level={5} color={TypographyColor.subdued}>
        Heading 5 (X-Small) - Subdued
      </Heading>
      <Heading level={6} color={TypographyColor.subdued}>
        Heading 6 (XX-Small) - Subdued
      </Heading>
    </>
  );
};

export const Inverse = () => {
  return (
    <>
      <Heading level={1} isInverse={true}>
        Heading 1 (X-Large)
      </Heading>
      <Heading level={2} isInverse={true}>
        Heading 2 (Large)
      </Heading>
      <Heading level={3} isInverse={true}>
        Heading 3 (Medium)
      </Heading>
      <Heading level={4} isInverse={true}>
        Heading 4 (Small)
      </Heading>
      <Heading level={5} isInverse={true}>
        Heading 5 (X-Small)
      </Heading>
      <Heading level={6} isInverse={true}>
        Heading 6 (XX-Small)
      </Heading>

      <Heading level={1} color={TypographyColor.subdued} isInverse={true}>
        Heading 1 (X-Large) - Subdued
      </Heading>
      <Heading level={2} color={TypographyColor.subdued} isInverse={true}>
        Heading 2 (Large) - Subdued
      </Heading>
      <Heading level={3} color={TypographyColor.subdued} isInverse={true}>
        Heading 3 (Medium) - Subdued
      </Heading>
      <Heading level={4} color={TypographyColor.subdued} isInverse={true}>
        Heading 4 (Small) - Subdued
      </Heading>
      <Heading level={5} color={TypographyColor.subdued} isInverse={true}>
        Heading 5 (X-Small) - Subdued
      </Heading>
      <Heading level={6} color={TypographyColor.subdued} isInverse={true}>
        Heading 6 (XX-Small) - Subdued
      </Heading>
    </>
  );
};
