const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
 
module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
   
  if (node.sourceInstanceName === "documentation") {
    const filePath = createFilePath({ node, getNode, trailingSlash: false })
    const pagePath = path.dirname(filePath)
    const sectionName = path.basename(filePath)
     
    createNodeField({
      name: `pagePath`,
      value: pagePath,
      node,
    })
     
    createNodeField({
      name: `sectionName`,
      value: sectionName,
      node,
    })
  }
}