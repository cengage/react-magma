import { magma } from 'react-magma-dom';

export const editorTheme = {
  plain: {
    backgroundColor: magma.colors.neutral200,
    color: magma.colors.neutral,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: magma.colors.success,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 1,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: magma.colors.primary700,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: magma.colors.neutral,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: magma.colors.primary700,
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: magma.colors.tertiary,
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: magma.colors.primary,
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: magma.colors.tertiary,
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: magma.colors.danger,
      },
    },
  ],
};
