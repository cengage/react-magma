const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')

createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              code {
                scope
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: componentWithMDXScope(
            path.resolve('./src/templates/pageTemplate.js'),
            node.code.scope,
            __dirname
          ),
          context: { id: node.id, slug: node.fields.slug },
        })
      })
    })
    resolve()
  })
}

const getPathPrefix = path => (/design/.test(path) ? 'design' : 'api')

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
