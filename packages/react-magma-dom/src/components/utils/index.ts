import React from 'react';
const uuidv4 = require('uuid/v4');

export function generateId(id?: string) {
  return id ? id : uuidv4();
}

export function useGenerateId(newId?: string) {
  const [id, updateId] = React.useState(generateId(newId));

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

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
