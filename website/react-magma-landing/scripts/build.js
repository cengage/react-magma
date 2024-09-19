const axios = require('axios');
const semver = require('semver');
const fs = require('fs');
const copy = require('copy');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const english = new Intl.DateTimeFormat('en');
const path = require('path');

const cleanVersions = ({ versions, time, tags }) => {
  return semver
    .sort(Object.keys(versions))
    .filter(a => a.match(/^\d+\.\d+\.\d+$/))
    .filter(a => semver.gte(a, '2.3.2'))
    .map(version => {
      return {
        version,
        time: time[version],
        date: english.format(new Date(time[version])),
        alias: version.replace(/\./g, '-'),
        tags: Object.entries(tags)
          .map(([key, value]) => {
            return value === version ? key : null;
          })
          .filter(a => a),
        reactDependency: versions[version]?.peerDependencies?.react,
      };
    });
};

const versionsByReactDependency = ({ versions, time, tags }) => {
  const allVersions = cleanVersions({ versions, time, tags });

  var versionsByReactDep = new Map();
  allVersions.forEach(versionObj => {
    if (!versionsByReactDep.has(versionObj?.reactDependency)) {
      versionsByReactDep.set(versionObj?.reactDependency, []);
    }
    versionsByReactDep.get(versionObj?.reactDependency).push(versionObj);
  });

  const latestVersions = [];
  for (let [, value] of versionsByReactDep) {
    const latest = value.reverse()[0];
    latestVersions.push(latest);
  }

  return latestVersions;
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
          date: english.format(new Date(time[value])),
        },
      ];
    })
  );
};

const filterNPM = ({ versions, 'dist-tags': tags, time }) => {
  return {
    tags: enhanceTags({ tags, time }),
    versions: cleanVersions({ versions, time, tags }).reverse(),
    reactSupport: versionsByReactDependency({ versions, time, tags }),
  };
};

const getAllVersions = () => {
  return axios
    .get('https://registry.npmjs.org/react-magma-dom')
    .then(({ data }) => filterNPM(data));
};

mkdirp(path.resolve(__dirname, '../dist'));
getAllVersions().then(versions => {
  return Promise.all([
    copy(
      path.resolve(__dirname, '../static/**'),
      path.resolve(__dirname, '../dist'),
      function (err, files) {
        if (err) throw err;
        Promise.resolve(files);
      }
    ),
    fs.writeFile(
      path.resolve(__dirname, '../dist/versions'),
      JSON.stringify(versions, null, 2),
      err => {
        if (err) throw err;
        console.log('- dist/versions has been saved!');
      }
    ),
    fs.writeFile(
      path.resolve(__dirname, '../dist/index.html'),
      ejs.render(
        fs
          .readFileSync(path.resolve(__dirname, '../templates/index.html'))
          .toString(),
        versions
      ),
      err => {
        if (err) throw err;
        console.log('- dist/index.html has been saved!');
      }
    ),
    fs.writeFile(
      path.resolve(__dirname, '../dist/_redirects'),
      ejs.render(
        fs
          .readFileSync(path.resolve(__dirname, '../templates/_redirects'))
          .toString(),
        versions
      ),
      err => {
        if (err) throw err;
        console.log('- dist/_redirects has been saved!');
      }
    ),
  ]);
});
