import React from 'react';
import { SimplePropsTable } from '../SimplePropsTable';

export const ButtonProps = () => (
  <>
    <SimplePropsTable
      propertyValues={{
        children: {
          type: {
            name: 'node',
          },
          required: true,
          description: 'The content of the component',
        },
        color: {
          type: {
            name: 'enum',
            options: [
              'ButtonColor.primary',
              'ButtonColor.secondary',
              'ButtonColor.success',
              'ButtonColor.danger',
              'ButtonColor.marketing',
            ],
          },
          required: false,
          description:
            'The color of the button, indicating its function in the UI',
          defaultValue: 'primary',
        },
        isFullWidth: {
          type: {
            name: 'boolean',
          },
          required: false,
          description:
            'If true, the button will take up the full width of its container',
          defaultValue: 'false',
        },
        isInverse: {
          type: {
            name: 'boolean',
          },
          required: false,
          description:
            'If true, the component will have inverse styling to better appear on a dark background',
          defaultValue: 'false',
        },
        shape: {
          type: {
            name: 'enum',
            options: [
              'ButtonShape.fill',
              'ButtonShape.leftCap',
              'ButtonShape.rightCap',
            ],
          },
          required: false,
          description: 'Defines the border radius',
          defaultValue: 'fill',
        },
        size: {
          type: {
            name: 'enum',
            options: [
              'ButtonSize.large',
              'ButtonSize.medium',
              'ButtonSize.small',
            ],
          },
          required: false,
          description: 'The relative size of the button',
          defaultValue: 'medium',
        },
        textTransform: {
          type: {
            name: 'enum',
            options: [
              'ButtonTextTransform.uppercase',
              'ButtonTextTransform.none',
            ],
          },
          required: false,
          description: 'Determines whether the button appears in all-caps',
          defaultValue: 'uppercase',
        },
        type: {
          type: {
            name: 'enum',
            options: [
              'ButtonType.button',
              'ButtonType.submit',
              'ButtonType.reset',
            ],
          },
          required: false,
          description: 'The type attribute of the button',
          defaultValue: 'button',
        },
        variant: {
          type: {
            name: 'enum',
            options: ['ButtonVariant.solid', 'ButtonVariant.link'],
          },
          required: false,
          description: 'The variant of the button',
          defaultValue: 'solid',
        },
      }}
    />
  </>
);
