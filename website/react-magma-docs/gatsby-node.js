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

  if(/designing/.test(path)) {
    return 'designing';
  }
  else if(/developing/.test(path)) {
    return 'developing';
  }
  else if(/contributing/.test(path)) {
    return 'contributing';
  }
  else if(/components/.test(path)) {
    if (/layout/.test(path)) {
      return 'layout';
    }
    if (/datadisplay/.test(path)) {
      return 'datadisplay';
    }
    if (/inputs/.test(path)) {
      return 'inputs';
    }
    if (/feedback/.test(path)) {
      return 'feedback';
    }
    if (/navigation/.test(path)) {
      return 'navigation';
    }
    if (/utilities/.test(path)) {
      return 'utilities';
    }
    if (/accessibility/.test(path)) {
      return 'accessibility';
    }
    if (/hooks/.test(path)) {
      return 'hooks';
    }
    return 'components';
  }
  else if(/datavisualization/.test(path)) {
    return 'datavisualization';
  }
  else if(/patterns/.test(path)) {
    return 'patterns';
  }
  else if(/tools/.test(path)) {
    return 'tools';
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
