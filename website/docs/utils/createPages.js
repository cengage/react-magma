module.exports = async ({ actions, graphql, reporter }) => {
  const sections = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "documentation" } }) {
        nodes {
          fields {
            pagePath,
            type
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
    .map((node) => {return { pagePath: node.fields.pagePath, type: node.fields.type };})
    .filter((value, index, self) => self.indexOf(value) === index)

  pagePaths.forEach(({pagePath, type}) => {
    actions.createPage({
      path: pagePath,
      component: require.resolve('../src/templates/doc.template.js'),
      context: {
        pagePath,
        type
      },
    });
  })
}