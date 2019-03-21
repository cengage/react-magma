@Library('banzai@feature/npm-snapshots') _
pcfNpmPipeline() {
  nexus = [
    group: "com.cengage.frontend"
  ]
  npm = [
    buildDir: "packages/react-magma-docs-gatsby/public"
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