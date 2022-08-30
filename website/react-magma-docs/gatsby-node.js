const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const propertiesJson = require('react-magma-dom/dist/properties.json');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
    resolve: {
      extensions: ['*', '.mjs', '.js', '.json'],
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
    const prefix = getPathPrefix(node.fileAbsolutePath);
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
