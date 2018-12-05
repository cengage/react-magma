const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const distPath = path.join(__dirname, 'dist');

function build() {
  const typesFile = path.join(distPath, `index.d.ts`);
  return new Promise((resolve, reject) => {
    glob('dist/**/*.d.ts', {}, (error, files) => {
      if (error) {
        reject(error);
      }

      let combinedContents = [];

      files.forEach(file => {
        const contents = fs.readFileSync(file);
        const cleanedContents = removeLocalImportsExports(contents.toString());

        combinedContents.push(cleanedContents);
      });

      const filesFileContents = combinedContents.join('\n\n');

      fs.writeFileSync(typesFile, filesFileContents);
      resolve();
    });
  });
}

function removeLocalImportsExports(code) {
  let localImportExport = /^\s*(import|export) .* from "\.\/.*"\s*;?\s*$/;
  return code
    .split('\n')
    .filter(line => {
      return !localImportExport.test(line);
    })
    .join('\n')
    .trim();
}

build().then(
  () => {
    console.log('done');
  },
  err => console.log(err.message, err.stack)
);
