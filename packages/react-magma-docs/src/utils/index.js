export const convertTextToId = text => {
  return typeof text === 'string'
    ? text.toLowerCase().replace(/\s/g, '_')
    : null
}
