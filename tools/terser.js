const fs = require('fs-extra');
const glob = require('glob');
const Terser = require('terser');

function build() {
  return new Promise((resolve, reject) => {
    glob('dist/**/*.js', {}, (error, files) => {
      if (error) {
        reject(error);
      }

      files.forEach(file => {
        const contents = fs.readFileSync(file).toString();

        const result = Terser.minify(contents);
        fs.writeFileSync(file, result.code);
      });

      resolve();
    });
  });
}

build().then(
  () => {
    console.info('minifying code'); // eslint-disable-line no-console
  },
  err => console.log(err.message, err.stack) // eslint-disable-line no-console
);
