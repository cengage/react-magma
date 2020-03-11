import React from 'react';
const uuidv4 = require('uuid/v4');

export function generateId(id?: string) {
  return id ? id : uuidv4();
}

export function useGenerateId(newId?: string) {
  const [id, updateId] = React.useState<string>(generateId(newId));

  React.useEffect(() => {
    updateId(generateId(newId));
  }, [newId]);

  return id;
}

export function omit(props, obj) {
  return props.reduce(
    (newObj, val) => (({ [val]: dropped, ...rest }) => rest)(newObj),
    obj
  );
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
