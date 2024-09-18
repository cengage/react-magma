const path = require('path');

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/',
  siteMetadata: {
    title: 'React Magma Docs',
  },
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: false, //recommended for react >= 17.0.0
  },
  plugins: [
{
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'api',
        path: path.join(__dirname, 'src', 'pages', 'api'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'api-intro',
        path: path.join(__dirname, 'src', 'pages', 'api-intro'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'design',
        path: path.join(__dirname, 'src', 'pages', 'design'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'design-intro',
        path: path.join(__dirname, 'src', 'pages', 'design-intro'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'patterns',
        path: path.join(__dirname, 'src', 'pages', 'patterns'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'patterns-intro',
        path: path.join(__dirname, 'src', 'pages', 'patterns-intro'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/react-magma-icon.svg', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
};
