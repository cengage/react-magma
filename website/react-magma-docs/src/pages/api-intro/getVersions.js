const axios = require('axios');
const semver = require('semver');
const english = new Intl.DateTimeFormat('en');

const cleanVersions = ({ versions, time, tags }) => {
  return semver
    .sort(Object.keys(versions))
    .filter(a => a.match(/^\d+\.\d+\.\d+$/))
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

export const getAllVersions = () => {
  return axios
    .get('https://registry.npmjs.org/react-magma-dom')
    .then(({ data }) => filterNPM(data));
};


export async function getVersions() {
  const allVersionsPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(getAllVersions());
    }, 300);
  });

  try {
    const versions = await allVersionsPromise;
    return versions;
  } catch(err) {
    console.error(err);
    return err;
  }
};

// export function getData() {
//   const p1 = new Promise((res) => setTimeout(() => res(something()), 1000));
//   return p1.then(function(val) {
//     console.log('returning ', val);
//     return val;
//   });
// }


// result.map((item, j) => {return <TableCell>{item.version}</TableCell>
// {result.length === 0 ? return (<span>emptyyy</span>) : return (<span>'something'</span>)}

// {result && result.versions.length > 0 ? result.versions[0].time : 'empty'}