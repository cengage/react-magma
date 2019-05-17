const uuidv4 = require('uuid/v4');

export function generateId(id?: string) {
  return id ? id : uuidv4();
}

export function omitFromOtherProps(propsToOmit, otherProps) {
  return propsToOmit.reduce(
    (newOtherProps, propToRemove) =>
      (({ [propToRemove]: dropped, ...rest }) => rest)(newOtherProps),
    otherProps
  );
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
