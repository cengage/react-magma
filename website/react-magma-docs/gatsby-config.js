const path = require('path');
const { resolve } = require('path-browserify');

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/',
  siteMetadata: {
    title: 'React Magma Docs',
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `api`,
        path: `${__dirname}/src/pages/api`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `api-intro`,
        path: `${__dirname}/src/pages/api-intro`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `design`,
        path: `${__dirname}/src/pages/design`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `design-intro`,
        path: `${__dirname}/src/pages/design-intro`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data-visualization`,
        path: `${__dirname}/src/pages/data-visualization`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/react-magma-icon.svg',
      },
    },
  ],
};
