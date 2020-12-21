const axios = require('axios');

const cleanVersions = (versions) => {
  return Object.keys(versions)
}

const filterNPM = ({versions, 'dist-tags': tags}) => {
  return {
    tags,
    versions: cleanVersions(versions)
  }
}

const getAllVersions = () => {
  return axios.get('https://registry.npmjs.org/react-magma-dom')
    .then(({data}) => filterNPM(data))
}

getAllVersions().then(console.log)
