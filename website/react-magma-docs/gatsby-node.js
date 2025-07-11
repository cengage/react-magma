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

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const unified = (await import('unified')).unified;
    const remarkParse = (await import('remark-parse')).default;
    const remarkMdx = (await import('remark-mdx')).default;
    const visit = (await import('unist-util-visit')).visit;

    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const content = node.body;
    const tree = unified().use(remarkParse).use(remarkMdx).parse(content);
    const pageNavigationHeadings = [];

    // Extracting headings navigation from the MDX content
    visit(tree, 'heading', headingNode => {
      if (headingNode.depth === 2) {
        const heading = headingNode.children?.reduce((previous, current) => {
          return current.type === 'text' ? previous + current.value : previous;
        }, '');

        if (heading) {
          pageNavigationHeadings.push(heading);
        }
      }
    });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    createNodeField({
      name: `headings`,
      node,
      value: pageNavigationHeadings,
    });
  }
};

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
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
