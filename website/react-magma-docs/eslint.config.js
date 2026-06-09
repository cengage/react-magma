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

  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {},
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
      'no-var': 'error',
      'no-undef': 'error',
    },
  },
];
