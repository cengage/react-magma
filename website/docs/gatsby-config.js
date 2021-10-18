const { getAlgoliaQueries, getGithubQueries } = require('./utils');
const { version } = require('./package.json');

const algoliaOptions = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries: getAlgoliaQueries(),
  chunkSize: 10000,
};

const filesystemDocOptions = {
  name: `documentation`,
  path: `${__dirname}/src/content`,
};

const filesystemImgOptions = {
  name: `images`,
  path: `${__dirname}/src/images`,
};

// const githubAPIOptions = {
//   token: process.env.GH_TOKEN,
//   graphQLQuery: getGithubQueries(),
// };

const manifestOptions = {
  background_color: '#663399',
  display: 'standalone',
  icon: 'src/images/react-magma-icon.png', // This path is relative to the root of the site.
  name: 'React Magma',
  short_name: 'React Magma',
  start_url: '/',
  theme_color: '#663399',
};

const mdxOptions = {
  extensions: [".mdx", ".md"],
  gatsbyRemarkPlugins: [
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 1035,
        linkImagesToOriginal: false,
      },
    },
  ],
};

const pathPrefix = process.env.PATH_PREFIX || '/';

const siteMetadata = {
  background_color: '#663399',
  display: 'minimal-ui',
  icon: 'src/images/react-magma-icon.png', // This path is relative to the root of the site.
  name: 'React Magma',
  short_name: 'React Magma',
  siteUrl: 'https://react-magma.cengage.com',
  start_url: '/',
  theme_color: '#663399',
  version: version
};

const svgOptions = {
  rule: {
    include: /images/,
  },
};

module.exports = {
  pathPrefix,
  siteMetadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-remark-copy-linked-files",
    "gatsby-plugin-offline",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-image",
    {
      resolve: 'gatsby-plugin-react-svg',
      options: svgOptions,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: filesystemDocOptions,
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: mdxOptions,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: filesystemImgOptions,
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: algoliaOptions,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifestOptions,
    },
    // {
    //   resolve: "gatsby-source-github-api",
    //   options: githubAPIOptions,
    // },
  ],
};
