import { magma } from './magma';
import { TOKEN_DEFINITIONS, TokenDefinition } from './tokenContract';
import type { TokenPath } from './tokenPaths';

type PrimitiveTokenValue = string | number;
type TokenObject = Record<string, unknown>;

export type { TokenPath };

export interface TokenVarOptions {
  fallback?: PrimitiveTokenValue | false;
  theme?: unknown;
}

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
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();
}

export function pathToCssVarName(path: string): string {
  let cached = varNameCache.get(path);

  if (!cached) {
    cached = `--magma-${getPathSegments(path).map(normalizeSegment).join('-')}`;
    varNameCache.set(path, cached);
  }

  return cached;
}

function isTokenObject(value: unknown): value is TokenObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isPrimitiveTokenValue(value: unknown): value is PrimitiveTokenValue {
  return typeof value === 'string' || typeof value === 'number';
}

function getPathValue(source: unknown, path: string): unknown {
  let current: unknown = source;

  for (const key of getPathSegments(path)) {
    if (!isTokenObject(current)) return undefined;
    current = current[key];
  }

  return current;
}

function getDefinition(path: string): TokenDefinition {
  const definition = TOKEN_DEFINITIONS[path];

  if (!definition) {
    throw new Error(`Unknown React Magma token path: ${path}`);
  }

  return definition;
}

function getThemeValue(
  theme: unknown,
  definition: TokenDefinition
): PrimitiveTokenValue | undefined {
  const value = getPathValue(theme, definition.legacyPath);

  return isPrimitiveTokenValue(value) ? value : undefined;
}

function hasThemeOverride(
  theme: unknown,
  definition: TokenDefinition
): boolean {
  const themeValue = getThemeValue(theme, definition);

  if (themeValue === undefined) return false;

  return themeValue !== getThemeValue(magma, definition);
}

function resolveRawValue(
  path: string,
  theme: unknown,
  seen = new Set<string>()
): PrimitiveTokenValue | undefined {
  if (seen.has(path)) {
    throw new Error(
      `Circular React Magma token reference: ${Array.from(seen)
        .concat(path)
        .join(' -> ')}`
    );
  }

  const definition = getDefinition(path);
  const themeValue = getThemeValue(theme, definition);

  if (definition.alias) {
    if (themeValue !== undefined && hasThemeOverride(theme, definition)) {
      return themeValue;
    }

    return resolveRawValue(
      definition.alias,
      theme,
      new Set(Array.from(seen).concat(path))
    );
  }
  if (themeValue !== undefined) return themeValue;

  return definition.cssValue;
}

function createFallback(
  path: string,
  theme: unknown,
  seen = new Set<string>()
): string | undefined {
  if (seen.has(path)) {
    throw new Error(
      `Circular React Magma token reference: ${Array.from(seen)
        .concat(path)
        .join(' -> ')}`
    );
  }

  const definition = getDefinition(path);

  if (definition.alias) {
    const aliasFallback = hasThemeOverride(theme, definition)
      ? getThemeValue(theme, definition)
      : createFallback(
          definition.alias,
          theme,
          new Set(Array.from(seen).concat(path))
        );

    return aliasFallback === undefined
      ? `var(${pathToCssVarName(definition.alias)})`
      : `var(${pathToCssVarName(definition.alias)}, ${String(aliasFallback)})`;
  }

  const value = getThemeValue(theme, definition) ?? definition.cssValue;

  return value === undefined ? undefined : String(value);
}

export function createCssVarDeclarations(theme: unknown): string[] {
  return Object.keys(TOKEN_DEFINITIONS)
    .sort()
    .map(path => {
      const definition = getDefinition(path);
      let value: PrimitiveTokenValue | string | undefined;

      if (definition.alias && !hasThemeOverride(theme, definition)) {
        const fallback = resolveRawValue(definition.alias, theme);

        value =
          fallback === undefined
            ? `var(${pathToCssVarName(definition.alias)})`
            : `var(${pathToCssVarName(definition.alias)}, ${String(fallback)})`;
      } else {
        value =
          getThemeValue(theme, definition) ??
          definition.cssValue ??
          resolveRawValue(path, theme);
      }

      return `${pathToCssVarName(path)}: ${String(value)};`;
    });
}

function tokenVar(path: TokenPath, options: TokenVarOptions = {}): string {
  const varName = pathToCssVarName(path);

  if (options.fallback === false) {
    return `var(${varName})`;
  }

  const fallback =
    options.fallback !== undefined
      ? String(options.fallback)
      : createFallback(path, options.theme ?? magma);

  return fallback === undefined
    ? `var(${varName})`
    : `var(${varName}, ${fallback})`;
}

function tokenRaw(path: TokenPath, theme: unknown = magma) {
  return resolveRawValue(path, theme);
}

function tokenFunction(path: TokenPath, options: TokenVarOptions = {}): string {
  return tokenVar(path, options);
}

export const token = Object.assign(tokenFunction, {
  cssVarName: pathToCssVarName,
  raw: tokenRaw,
  var: tokenVar,
});
