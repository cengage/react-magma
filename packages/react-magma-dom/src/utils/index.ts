import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export function generateId(id?: string) {
  return id ? id : uuidv4();
}

export function useGenerateId(newId?: string) {
  const [id, updateId] = React.useState<string>(newId);

  React.useEffect(() => {
    updateId(generateId(newId));
  }, []);

  React.useEffect(() => {
    newId && updateId(generateId(newId));
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

export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function debounce(func, wait) {
  let timeout;
  function debounced(...args) {
    // tslint:disable-next-line
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

// Based on https://stackoverflow.com/a/24394376
let cachedType;

export function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }

  const dummy = document.createElement('div');
  dummy.appendChild(document.createTextNode('ABCD'));
  dummy.dir = 'rtl';
  dummy.style.fontSize = '14px';
  dummy.style.width = '4px';
  dummy.style.height = '1px';
  dummy.style.position = 'absolute';
  dummy.style.top = '-1000px';
  dummy.style.overflow = 'scroll';

  document.body.appendChild(dummy);

  cachedType = 'reverse';

  if (dummy.scrollLeft > 0) {
    cachedType = 'default';
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft === 0) {
      cachedType = 'negative';
    }
  }
}

export function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft;

  // Perform the calculations only when direction is rtl to avoid messing up the ltr bahavior
  if (direction !== 'rtl') {
    return scrollLeft;
  }

  const type = detectScrollType();

  switch (type) {
    case 'negative':
      return (
        Number(element.scrollWidth) -
        Number(element.clientWidth) +
        Number(scrollLeft)
      );
    case 'reverse':
      return (
        Number(element.scrollWidth) -
        Number(element.clientWidth) -
        Number(scrollLeft)
      );
    default:
      return scrollLeft;
  }
}

function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

export function animate(
  property,
  element,
  to,
  options: any = {},
  cb = (error?: Error) => {
    throw error;
  }
) {
  const { ease = easeInOutSin, duration = 300 } = options;

  let start = null;
  const from = Number(element[property]);
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = timestamp => {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    element[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
}

export function assignRef(ref, value) {
  if (ref === null) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function useForkedRef(...refs) {
  return React.useMemo(() => {
    if (refs.every(ref => ref === null)) {
      return null;
    }
    return (node: any) => {
      refs.forEach(ref => {
        assignRef(ref, node);
      });
    };
  }, [...refs]);
}

export function registerDescendant(
  itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
  itemRef: React.MutableRefObject<Element>
) {
  if (
    itemRefArray.current.find(
      ({ current: item }) => item === itemRef.current
    ) == null
  ) {
    const index = itemRefArray.current.findIndex(({ current: item }) => {
      if (!item || !itemRef.current) return false;

      return Boolean(
        item.compareDocumentPosition(itemRef.current) &
          Node.DOCUMENT_POSITION_PRECEDING
      );
    });

    const newItem = itemRef;

    itemRefArray.current =
      index === -1
        ? [...itemRefArray.current, newItem]
        : [
            ...itemRefArray.current.slice(0, index),
            newItem,
            ...itemRefArray.current.slice(index),
          ];
  }
}

export function useDescendants(): [
  React.MutableRefObject<React.MutableRefObject<Element>[]>,
  (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void
] {
  const itemRefArray = React.useRef<React.MutableRefObject<Element>[]>([]);

  return [itemRefArray, registerDescendant];
}

export function useForceUpdate() {
  const [, setTick] = React.useState(0);
  const update = React.useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
}
