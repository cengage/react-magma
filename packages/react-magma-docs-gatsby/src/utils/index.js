export const convertTextToId = text => {
  return typeof text === 'string' ? text.toLowerCase().replace(' ', '_') : null
}
