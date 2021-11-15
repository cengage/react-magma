module.exports = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `type File {
      childMdx: Mdx
      fields: Fields
    }`,
    `type Fields {
      pagePath: String
      sectionName: String
      category: String
    }`,
  ];
  createTypes(typeDefs);
};