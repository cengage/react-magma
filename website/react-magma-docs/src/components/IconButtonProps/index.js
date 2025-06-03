import React from 'react';

import { SimplePropsTable } from '../SimplePropsTable';

export function IconButtonProps() {
  return (
    <SimplePropsTable
      propertyValues={{
        'aria-label': {
          type: {
            name: 'string',
          },
          required: false,
          description:
            'The text the screen reader will announce. Required for icon-only buttons',
        },
        children: {
          type: {
            name: 'node',
          },
          required: false,
          description:
            'The content of the component.  If no children are provided, the button will render in an icon only style',
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
        disabled: {
          type: {
            name: 'boolean',
          },
          required: false,
          description: 'If true, element is disabled',
          defaultValue: 'false',
        },
        icon: {
          type: {
            name: 'React Element',
          },
          required: true,
          description: 'Icon to display within the component',
        },
        iconPosition: {
          type: {
            name: 'enum',
            options: ['ButtonIconPosition.left', 'ButtonIconPosition.right'],
          },
          required: false,
          description: 'Position within the button for the icon to appear',
          defaultValue: 'right',
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
        leadingIcon: {
          type: {
            name: 'React Element',
          },
          required: false,
          description: 'Leading icon to display on the left side of the button',
        },
        shape: {
          type: {
            name: 'enum',
            options: [
              'ButtonShape.fill',
              'ButtonShape.leftCap',
              'ButtonShape.rightCap',
              'ButtonShape.round',
            ],
          },
          required: false,
          description: 'Defines the border radius',
          defaultValue: 'round',
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
  );
}
