const { createFilePath } = require('gatsby-source-filesystem');
const propertiesJson = require('react-magma-dom/dist/properties.json');

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['*', '.mjs', '.js', '.json'],
      alias: {
        path: require.resolve('path-browserify'),
      },
      fallback: {
        'object.assign/polyfill': require.resolve("object.assign/polyfill.js"),
        'process': require.resolve('process/browser'),
        'fs': false,
        'util': require.resolve('util/'),
        'assert': require.resolve('assert/'),
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    plugins: [
      plugins.provide({ process: 'process/browser', Buffer: ['buffer', 'Buffer'] })
    ],
  });
};

const getPathPrefix = path => {
  if (/design/.test(path)) {
    if (/intro/.test(path)) {
      return 'design-intro';
    }
    return 'design';
  } else if (/api/.test(path)) {
    if (/intro/.test(path)) {
      return 'api-intro';
    }
    return 'api';
  } else if (/patterns/.test(path)) {
    if (/intro/.test(path)) {
      return 'patterns-intro';
    }
    return 'patterns';
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const prefix = getPathPrefix(node.internal.contentFilePath);
    const filePath = createFilePath({ node, getNode });
    const fullFilePath = `/${prefix}${filePath.toLowerCase()}`;
    createNodeField({
      name: 'slug',
      node,
      value: fullFilePath,
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

exports.createSchemaCustomization = async ({ getNode, getNodesByType, pathPrefix, reporter, cache, actions, schema, store }) => {
  const { createTypes } = actions;
  const { compileMDXWithCustomOptions } = await import("gatsby-plugin-mdx");
  const remarkHeadingsPlugin = await import("./remark-headings-plugin.mjs");

  const headingsResolver = schema.buildObjectType({
    name: `Mdx`,
    fields: {
      headings: {
        type: `[MdxHeading]`,
        args: {
          depth: {
            type: `String`,
          },
        },
        async resolve(mdxNode, { depth }) {
          const fileNode = getNode(mdxNode.parent);

          if (!fileNode) {
            return null;
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
              store,
            }
          );

          if (!result) {
            return null;
          }

          const headings = result.metadata.headings || [];
          const depthValue = depth ? parseInt(depth.replace('h', ''), 10) : null;

          if (depthValue !== null) {
            return headings.filter(h => h.depth === depthValue);
          }
          return headings;
        }
      }
    }
  });

  createTypes([
    `
      type MdxHeading {
        value: String
        depth: Int
      }
    `,
    headingsResolver,
  ]);
};
