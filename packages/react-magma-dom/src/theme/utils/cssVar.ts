const PREFIX = '--magma';

const pathSegmentsCache = new Map<string, string[]>();
const varNameCache = new Map<string, string>();

function getPathSegments(path: string): string[] {
  let cached = pathSegmentsCache.get(path);

  if (!cached) {
    cached = path.split('.');
    pathSegmentsCache.set(path, cached);
  }

  return cached;
}

function normalizeSegment(segment: string): string {
  const aliased = segment === 'colors' ? 'color' : segment;

  return aliased
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // XLarge -> X-Large
    .replace(/([a-z])([A-Z])/g, '$1-$2') // bodyFont -> body-Font
    .replace(/([0-9])([A-Z])/g, '$1-$2') // 2X -> 2-X
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2') // primary500 -> primary-500
    .toLowerCase();
}

export function pathToCssVarName(path: string): string {
  let cached = varNameCache.get(path);

  if (!cached) {
    cached = `${PREFIX}-${getPathSegments(path).map(normalizeSegment).join('-')}`;
    varNameCache.set(path, cached);
  }

  return cached;
}

function resolveValue(theme: unknown, path: string): unknown {
  let current: unknown = theme;

  for (const key of getPathSegments(path)) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

/**
 * Returns a `var(--magma-…, fallback)` reference for a theme token path.
 *
 * Path is intentionally untyped (`string`) to support gradual migration
 */
export function tk(theme: unknown, path: string): string {
  const varName = pathToCssVarName(path);
  const value = resolveValue(theme, path);

  if (typeof value === 'string' || typeof value === 'number') {
    return `var(${varName}, ${value})`;
  }

  return `var(${varName})`;
}
