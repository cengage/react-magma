pcfNpmPipeline() {
  nexus = [
    group: "com.cengage.frontend"
  ]
  npm = [
    buildDir: "packages/react-magma-docs/.docz/dist",
    scripts: [
      test: "npm test",
      build: "npm run build"
    ]
  ]
  deployments = [
    dev: [[
      id: 'react-magma',
      pcf_org: 'ux'
    ]]
  ]
}