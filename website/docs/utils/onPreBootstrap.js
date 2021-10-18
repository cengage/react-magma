const fs = require('fs');

module.exports = () => {
  const dir = `src/content`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}