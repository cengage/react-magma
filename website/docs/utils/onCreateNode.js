const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

const formatTitle = (title) => title
  // title.split('-').map(a => a.replace(/^\w/, (c) => c.toUpperCase())).join(' ')

const formatPath = (filePath) => {
  const pagePath = path.dirname(filePath);
  const sectionName = formatTitle(path.basename(filePath));
  const category = formatTitle(pagePath.split('/')[2]);
  
  return {
    category,
    filePath,
    pagePath,
    sectionName,
  }
}
 
module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
   
  if (node.sourceInstanceName === "documentation") {
    const filePath = createFilePath({ node, getNode, trailingSlash: false })
    const details = formatPath(filePath);
     
    createNodeField({
      name: `pagePath`,
      value: details.pagePath,
      node,
    })
     
    createNodeField({
      name: `sectionName`,
      value: details.sectionName,
      node,
    })
     
    createNodeField({
      name: `category`,
      value: details.category,
      node,
    })
  }
}