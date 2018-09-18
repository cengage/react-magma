pcfNpmPipeline() {
  nexus = [
    group: "com.cengage.frontend"
  ]
  npm = [
    buildDir: "packages/react-magma-docs/.docz/dist"
  ]
  deployments = [
    dev: [[
      id: 'react-magma',
      pcf_org: 'ux'
    ]]
  ]
}