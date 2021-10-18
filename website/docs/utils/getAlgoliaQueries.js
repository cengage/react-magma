module.exports = () => {
  const query = `
  {
   posts: allMdx(
    filter: { fileAbsolutePath: { regex: "/content/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          summary
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
  }
`;
  const settings = { attributesToSnippet: [`excerpt:20`] };
  return [
    {
      query,
      transformer: ({ data }) =>
        data.posts.edges.map(({ node: { frontmatter, ...rest } }) => {
          return {
            ...frontmatter,
            ...rest,
          };
        }),
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      settings,
    },
  ];
};