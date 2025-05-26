const mdx = require('eslint-plugin-mdx');
const globals = require('globals');
const propertyJson = require('react-magma-dom/dist/properties.json');

const rootConfig = require('../../eslint.config.js');

const propertyNames = propertyJson.map(property => property.name);
const propertyGlobals = propertyNames.reduce((acc, name) => {
  acc[name] = 'readonly';

  return acc;
}, {});

const customGlobals = {
  React: 'readonly',
  PropTypes: 'readonly',
  MDXProvider: 'readonly',
  SkipLinkContent: 'readonly',
  Heading: 'readonly',
  Alert: 'readonly',
  magma: 'readonly',
  PageContent: 'readonly',
  convertTextToId: 'readonly',
  LayoutComponent: 'readonly',
  SimplePropsTable: 'readonly',
  Divider: 'readonly',
  NetlifyFooter: 'readonly',
  styled: 'readonly',
  CodeBlock: 'readonly',
  Link: 'readonly',
  IconButtonProps: 'readonly',
  ButtonProps: 'readonly',
  ContentArticle: 'readonly',
  Table: 'readonly',
  PageHeading: 'readonly',
  SectionHeading: 'readonly',
  LinkHeading: 'readonly',
  H4: 'readonly',
  H5: 'readonly',
  H6: 'readonly',
  SmartDocsHeading: 'readonly',
  LeadParagraph: 'readonly',
};

module.exports = [
  ...rootConfig,
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...customGlobals,
        ...propertyGlobals,
      },
    },
    rules: {
      complexity: 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/anchor-has-content': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  // Config for MDX files, using eslint-plugin-mdx's flat config
  {
    ...mdx.flat, // Base MDX configuration from the plugin

    // Override processor to enable code block linting and customize
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {}, // Using default from example, can be customized
    }),

    // Override/extend languageOptions from mdx.flat
    languageOptions: {
      ...(mdx.flat.languageOptions || {}), // Spread any languageOptions from mdx.flat
      globals: {
        ...(mdx.flat.languageOptions?.globals || {}), // Spread any globals from mdx.flat's languageOptions
        ...globals.browser,
        ...globals.node,
        ...customGlobals,
        ...propertyGlobals,
      },
    },

    // Override/extend rules from mdx.flat
    rules: {
      ...(mdx.flat.rules || {}),
      'mdx/no-unused-expressions': 'off',
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^Example$',
          args: 'none',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^Example$',
          args: 'none',
        },
      ],
      'no-irregular-whitespace': 'off',
      'prettier/prettier': 'off',
    },
  },
  // Config for code blocks within MDX files
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...(mdx.flatCodeBlocks.rules || {}),
      'no-var': 'error',
      'no-undef': 'error',
    },
  },
];
