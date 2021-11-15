module.exports = {
  createPages: require('./createPages'),
  createSchemaCustomization: require('./createSchemaCustomization'),
  getAlgoliaQueries: require('./getAlgoliaQueries'),
  getGithubQueries: require('./getGithubQueries'),
  iteratePages: require('./iteratePages'),
  onCreateNode: require('./onCreateNode'),
  onCreateWebpackConfig: require('./onCreateWebpackConfig'),
  onPreBootstrap: require('./onPreBootstrap'),
};