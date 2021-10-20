module.exports = async ({ actions, graphql, reporter }) => {
  const sections = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "documentation" } }) {
        nodes {
          fields {
            pagePath
          }
        }
      }
    }
  `)

  if (sections.data.allFile.nodes.length === 0) {
    return
  }

   
  // Get paths and filter out duplicates
  const pagePaths = sections.data.allFile.nodes
    .map((node) => node.fields.pagePath)
    .filter((value, index, self) => self.indexOf(value) === index)
     
  pagePaths.forEach((pagePath) => {
    actions.createPage({
      path: pagePath,
      component: require.resolve("../src/templates/doc.template.js"),
      context: { 
        pagePath,
      },
    })
  })
}