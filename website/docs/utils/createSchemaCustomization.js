module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `type File {
      childMdx: Mdx
      fields: Fields
    }`,
    `type Fields {
      pagePath: String
      sectionName: String
    }`,
  ];
  createTypes(typeDefs);
};