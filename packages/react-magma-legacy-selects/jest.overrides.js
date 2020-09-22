// Global helper file (axe-helper.js)
const { configureAxe } = require('jest-axe')

console.log('doot doot')

const axe = configureAxe({
  rules: {
    // disabled landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

module.exports = axe
