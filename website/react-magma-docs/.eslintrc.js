const eslintrc = require('../../.eslintrc');
const propertiesJson = require('react-magma-dom/dist/properties.json');
const propertyNames = propertiesJson.map(property => property.name);

const globals = propertyNames.reduce((acc, name) => {
  acc[name] = 'readonly';
  return acc;
}, {});

module.exports = {
  ...eslintrc,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'mdx'],
  rules: {
    ...eslintrc.rules,
    'complexity': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'react/no-unescaped-entities': 'off',
  },
  settings: {
    'mdx/code-blocks': true,
  },
  globals: {
    ...globals,
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
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: [
        'plugin:mdx/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        'mdx/no-unused-expressions': 'off',
        'react/no-unescaped-entities': 'off',
      },
    },
  ],
};
