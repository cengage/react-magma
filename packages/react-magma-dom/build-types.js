const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const distPath = path.join(__dirname, 'dist');

function build() {
  const typesFile = path.join(distPath, `index.d.ts`);
  if (fs.existsSync(typesFile)) {
    fs.removeSync(typesFile);
  }
  return new Promise((resolve, reject) => {
    glob('dist/**/*.d.ts', {}, (error, files) => {
      if (error) {
        reject(error);
      }

      let combinedContents = ["import * as React from 'react'"];

      files.forEach(file => {
        const contents = fs.readFileSync(file).toString();
        const cleanedContents = removeLocalImportsExports(contents);

        combinedContents.push(cleanedContents);
      });

      const filesFileContents = combinedContents.join('\n\n');

      fs.writeFileSync(typesFile, filesFileContents);
      resolve();
    });
  });
}

function removeLocalImportsExports(code) {
  const localImportExport = /(^\s*(import|export) .* from ("|')\.\.?\/.*("|')\s*;?\s*$|^\s*import \* as React from ("|')react("|')|^\s*import ("|')\.\.?\/.*("|')\s*;?\s*$)/;
  return code
    .split('\n')
    .filter(line => !localImportExport.test(line))
    .join('\n')
    .trim();
}

build().then(
  () => {
    console.info('concatenated type definitions'); // eslint-disable-line no-console
  },
  err => console.log(err.message, err.stack) // eslint-disable-line no-console
);
