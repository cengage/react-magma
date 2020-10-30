const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const propertiesJson = require('./src/data/properties.json');

const getPathPrefix = path =>
  /design/.test(path)
    ? /intro/.test(path)
      ? 'design-intro'
      : 'design'
    : /intro/.test(path)
    ? 'api-intro'
    : 'api'

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const prefix = getPathPrefix(node.fileAbsolutePath)
    const filePath = createFilePath({ node, getNode })
    const fullFilePath = `/${prefix}${filePath.toLowerCase()}`
    createNodeField({
      name: 'slug',
      node,
      value: fullFilePath,
    })
  }
}

exports.onCreatePage = async ({ page, actions: { createPage, deletePage } }) => {
  const { frontmatter } = page.context;

  if (frontmatter) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        ...page.context,
        properties: propertiesJson.filter(property =>
          frontmatter.props && frontmatter.props.includes(property.name)
        )
      }
    });
  }
};
