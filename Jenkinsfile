pcfNpmPipeline() {
  nexus = [
    group: "com.cengage.frontend"
  ]
  npm = [
    buildDir: "packages/react-magma-docs/.docz/dist"
  ]
  sonar = [
    language: "js",
    sources: "packages"
  ]
  deployments = [
    dev: [[
      id: 'react-magma',
      pcf_org: 'ux'
    ]]
  ]
}