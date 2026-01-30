import React from 'react';

import { SimplePropsTable } from '../SimplePropsTable';

export const EmptyStateProps = () => (
  <>
    <SimplePropsTable
      propertyValues={{
        body: {
          type: {
            name: 'string',
          },
          required: false,
          description: 'Body/description text displayed below the title',
        },
        children: {
          type: {
            name: 'node',
          },
          required: false,
          description: 'Custom content to render below the actions',
        },
        illustration: {
          type: {
            name: 'node',
          },
          required: false,
          description:
            'Icon or image to display in the circular illustration area. Use icons from react-magma-icons.',
        },
        illustrationSize: {
          type: {
            name: 'enum',
            options: [
              'EmptyStateIllustrationSize.sm',
              'EmptyStateIllustrationSize.md',
              'EmptyStateIllustrationSize.lg',
              'EmptyStateIllustrationSize.xl',
              'EmptyStateIllustrationSize["2xl"]',
            ],
          },
          required: false,
          description:
            'Size of the illustration container (sm=48px, md=64px, lg=80px, xl=96px, 2xl=120px)',
          defaultValue: 'lg',
        },
        isDanger: {
          type: {
            name: 'boolean',
          },
          required: false,
          description:
            'If true, the component will use danger/error color scheme (red)',
          defaultValue: 'false',
        },
        isInverse: {
          type: {
            name: 'boolean',
          },
          required: false,
          description:
            'If true, the component will have inverse styling for dark backgrounds',
          defaultValue: 'false',
        },
        isLoading: {
          type: {
            name: 'boolean',
          },
          required: false,
          description:
            'If true, shows a loading spinner instead of the content',
          defaultValue: 'false',
        },
        primaryAction: {
          type: {
            name: 'object',
          },
          required: false,
          description:
            'Primary action button configuration: { label: string, onClick: () => void }',
        },
        secondaryAction: {
          type: {
            name: 'object',
          },
          required: false,
          description:
            'Secondary action button configuration: { label: string, onClick: () => void }',
        },
        testId: {
          type: {
            name: 'string',
          },
          required: false,
          description:
            'Test ID for testing purposes, applied as data-testid attribute',
        },
        title: {
          type: {
            name: 'string',
          },
          required: false,
          description: 'Title/heading text displayed prominently',
        },
        vertical: {
          type: {
            name: 'boolean',
          },
          required: false,
          description:
            'If true, uses vertical (stacked) layout. If false, uses horizontal (side-by-side) layout.',
          defaultValue: 'true',
        },
      }}
    />
  </>
);
