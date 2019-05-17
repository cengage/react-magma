const uuidv4 = require('uuid/v4');

export function generateId(id?: string) {
  return id ? id : uuidv4();
}

export function omit(props, obj) {
  return props.reduce(
    (newObj, val) => (({ [val]: dropped, ...rest }) => rest)(newObj),
    obj
  );
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
