const { createFilePath } = require('gatsby-source-filesystem');

// TODO: const propertiesJson = require('react-magma-dom/dist/properties.json');
const propertiesJson = require('./old_properties.json');

exports.onCreateWebpackConfig = ({
  actions,
  plugins,
  stage,
  loaders,
  getConfig,
}) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.*', '.mjs', '.js', '.json'],
      mainFields: ['browser', 'main', 'module'],
      alias: {
        path: require.resolve('path-browserify'),
      },
      fallback: {
        'object.assign/polyfill': require.resolve('object.assign/polyfill.js'),
        fs: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      plugins.provide({ process: 'process', Buffer: ['buffer', 'Buffer'] }),
    ],
    cache: false,
  });

  // Disable ESLint plugin in development to avoid flowtype issues
  if (stage === 'develop') {
    const config = getConfig();

    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'ESLintWebpackPlugin'
    );
    actions.replaceWebpackConfig(config);
  }

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /form-data/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
  }
};

exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage },
}) => {
  const { frontmatter } = page.context;

  if (frontmatter) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        ...page.context,
        properties: propertiesJson.filter(
          property =>
            frontmatter.props && frontmatter.props.includes(property.name)
        ),
      },
    });
  }
};
