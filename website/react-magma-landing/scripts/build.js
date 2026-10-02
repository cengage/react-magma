const axios = require('axios');
const copy = require('copy');
const ejs = require('ejs');
const fs = require('fs');
const { mkdirp } = require('mkdirp');
const path = require('path');
const semver = require('semver');

const english = new Intl.DateTimeFormat('en');

const SUPPORTED_LEGACY_VERSIONS = ['2.6.2', '3.11.0'];
// Major version where the 2026 rebrand icon/style starts applying.
const REBRAND_MAJOR_VERSION = 6;

const cleanVersions = ({ versions, time, tags }) => {
  return semver
    .sort(Object.keys(versions))
    .filter(a => a.match(/^\d+\.\d+\.\d+$/))
    .filter(a => {
      if (semver.major(a) === 4 || semver.major(a) === 5) {
        return true;
      }

      if (semver.major(a) >= REBRAND_MAJOR_VERSION) {
        return true;
      }

      return SUPPORTED_LEGACY_VERSIONS.includes(a);
    })
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

const latestVersionPerMajor = ({ versions, time, tags }) => {
  const allVersions = cleanVersions({ versions, time, tags });

  const latestByMajor = new Map();

  allVersions.forEach(versionObj => {
    const major = semver.major(versionObj.version);

    // v2 is reached through the dedicated v2Redirect, not this banner.
    if (major === 2) {
      return;
    }

    const current = latestByMajor.get(major);

    if (!current || semver.gt(versionObj.version, current.version)) {
      latestByMajor.set(major, versionObj);
    }
  });

  return [...latestByMajor.values()].sort((a, b) =>
    semver.compare(b.version, a.version)
  );
};

const groupVersionsByMajor = versions => {
  const byMajor = new Map();

  versions.forEach(versionObj => {
    const major = semver.major(versionObj.version);

    if (!byMajor.has(major)) {
      byMajor.set(major, []);
    }
    byMajor.get(major).push(versionObj);
  });

  return [...byMajor.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([major, majorVersions]) => ({ major, versions: majorVersions }));
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
  const allVersions = cleanVersions({ versions, time, tags }).reverse();

  return {
    tags: enhanceTags({ tags, time }),
    versions: allVersions,
    versionGroups: groupVersionsByMajor(allVersions),
    reactSupport: latestVersionPerMajor({ versions, time, tags }),
  };
};

const getAllVersions = () => {
  return axios
    .get('https://registry.npmjs.org/react-magma-dom')
    .then(({ data }) => filterNPM(data));
};

const prepareVersionsWithRedirects = versions => {
  versions.v2Redirect = 'https://soft-elf-84cb2b.netlify.app/';

  return versions;
};

mkdirp(path.resolve(__dirname, '../dist'));
getAllVersions().then(versions => {
  const versionsWithRedirects = prepareVersionsWithRedirects(versions);

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
      JSON.stringify(versionsWithRedirects, null, 2),
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
        versionsWithRedirects
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
        versionsWithRedirects
      ),
      err => {
        if (err) throw err;
        console.log('- dist/_redirects has been saved!');
      }
    ),
  ]);
});
