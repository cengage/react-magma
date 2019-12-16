import { magma } from 'react-magma-dom'

const editorTheme = {
  plain: {
    backgroundColor: magma.colors.neutral07,
    color: magma.colors.neutral01,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: magma.colors.success01,
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
        color: magma.colors.foundation02,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: magma.colors.neutral03,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: magma.colors.foundation02,
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: magma.colors.pop01,
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
        color: magma.colors.pop01,
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
}

export default editorTheme
