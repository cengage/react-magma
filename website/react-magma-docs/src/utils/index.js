const axios = require('axios');
const semver = require('semver');

const english = new Intl.DateTimeFormat('en');

const REPOS = {
  dom: 'https://registry.npmjs.org/react-magma-dom',
  icons: 'https://registry.npmjs.org/react-magma-icons',
};

const cleanVersions = ({ versions, time, tags }) => {
  return semver
    .sort(Object.keys(versions))
    .filter(a => a.match(/^\d+\.\d+\.\d+$/))
    .map(version => {
      return {
        version,
        deprecated: versions[version].deprecated,
        peerDependencies: versions[version].peerDependencies,
        time: time[version],
        date: english.format(new Date(time[version])),
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
          date: english.format(new Date(time[value])),
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

export const getAllVersions = (repo = 'dom') => {
  return axios.get(REPOS[repo]).then(({ data }) => {
    return filterNPM(data);
  });
};

export async function getVersions(repo = 'dom') {
  const allVersionsPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve(getAllVersions(repo));
    }, 300);
  });

  try {
    const versions = await allVersionsPromise;
    return versions;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const convertTextToId = text => {
  return typeof text === 'string'
    ? text.toLowerCase().replace(/\s/g, '_')
    : null;
};
