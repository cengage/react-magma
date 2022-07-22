import { PrismTheme } from 'prism-react-renderer';
import { magma } from 'react-magma-dom';

export const magmaCodeDark: PrismTheme = {
  plain: {
    backgroundColor: magma.colors.neutral,
    color: magma.colors.neutral200,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: magma.colors.success200,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: magma.colors.tertiary,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: magma.colors.success200,
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
        color: magma.colors.success200,
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
        color: magma.colors.danger200,
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
        color: magma.colors.danger200,
      },
    },
  ],
};
