const axios = require('axios');
const semver = require('semver');
const fs = require('fs');
const copy = require('copy');
const mkdirp = require('mkdirp');

const cleanVersions = ({ versions, time, tags }) => {
  return semver
    .sort(Object.keys(versions))
    .filter(a => a.match(/^\d+\.\d+\.\d+$/))
    .map(version => {
      return {
        version,
        time: time[version],
        alias: version.replace(/\./g, '-'),
        tags: Object.entries(tags)
          .map(([key, value]) => {
            return value === version ? key : null;
          })
          .filter(a => a),
      };
    });
};

const enhanceTags = ({ tags, time }) => {
  return Object.fromEntries(
    Object.entries(tags).map(([key, value]) => {
      return [
        key,
        {
          version: value,
          alias: key.replace(/\./g, '-'),
          time: time[value],
        },
      ];
    })
  );
};

const filterNPM = ({ versions, 'dist-tags': tags, time }) => {
  return {
    tags: enhanceTags({ tags, time }),
    versions: cleanVersions({ versions, time, tags }),
  };
};

const getAllVersions = () => {
  return axios
    .get('https://registry.npmjs.org/react-magma-dom')
    .then(({ data }) => filterNPM(data));
};

mkdirp('dist');
getAllVersions().then(versions => {
  return Promise.all([
    copy('static/**', 'dist', function (err, files) {
      if (err) throw err;
      Promise.resolve(files);
    }),
    fs.writeFile('dist/versions', JSON.stringify(versions, null, 2), err => {
      if (err) throw err;
      console.log('The file has been saved!');
    }),
  ]);
});
