import { useState, useEffect, useRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function generateId(id?: string) {
  return id ? id : uuidv4();
}

export function useGenerateId(newId?: string) {
  const [id, updateId] = useState<string>(newId);

  useEffect(() => {
    updateId(generateId(newId));
  }, []);

  useEffect(() => {
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
  const ref = useRef();
  useEffect(() => {
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

export function animate(property, element, to, options: any = {}) {
  const { ease = easeInOutSin, duration = 300 } = options;

  let start = null;
  const from = Number(element[property]);
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = timestamp => {
    if (cancelled) {
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    element[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(() => {});
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
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
  return useMemo(() => {
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

export function stringIncludesUnit(x) {
  return x.includes('px') || x.includes('em') || x.includes('%');
}

export function convertStyleValueToString(
  value: string | number,
  defaultValue?: string
): string {
  return value
    ? typeof value === 'number' ||
      (typeof value === 'string' && !stringIncludesUnit(value))
      ? `${value}px`
      : value
    : defaultValue || 'initial';
}

export function getNodeText(node) {
  if (['string', 'number'].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
}

const candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

export function getTrapElements(container): Array<HTMLElement> {
  return Array.from(container.current.querySelectorAll(candidateSelectors));
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z 0-9]/gi, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, index) =>
      index === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
    )
    .replace(/\s+/g, '');
}

type ResolvedProps = {
  [key: string]: any;
};

/**
 * Add keys & values of `defaultProps` that do not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {Person} resolved props
 */
export function resolveProps(
  defaultProps: object,
  props: object
): ResolvedProps {
  const output = { ...props };

  Object.keys(defaultProps).forEach(propName => {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });

  return output;
};
