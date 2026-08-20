import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(packageRoot, '..', '..');
const sourcePath = path.join(packageRoot, 'src', 'magma.tokens.json');
const mappingPath = path.join(packageRoot, 'config', 'magma-paths.json');
const outDir = path.join(packageRoot, 'dist');
const domThemeDir = path.join(
  repoRoot,
  'packages',
  'react-magma-dom',
  'src',
  'theme'
);
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const magmaPaths = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
const checkMode = process.argv.includes('--check');
const staleCommittedFiles = [];

const referencePattern = /^\{([^}]+)\}$/;
const supportedCssTypes = new Set([
  'color',
  'cubicBezier',
  'dimension',
  'duration',
  'fontFamily',
  'fontWeight',
  'number',
  'strokeStyle',
]);

function isObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isToken(value) {
  return isObject(value) && '$value' in value;
}

function assertValidName(name, tokenPath) {
  if (
    name.startsWith('$') ||
    name.includes('.') ||
    name.includes('{') ||
    name.includes('}')
  ) {
    throw new Error(`Invalid DTCG name "${name}" at ${tokenPath || '<root>'}`);
  }
}

function flattenTokens(value, pathSegments = [], inheritedType, out = []) {
  if (isToken(value)) {
    const tokenPath = pathSegments.join('.');
    const type = value.$type || inheritedType;

    if (!type) {
      throw new Error(`Token ${tokenPath} does not declare or inherit $type`);
    }

    if (!supportedCssTypes.has(type)) {
      throw new Error(
        `Token ${tokenPath} uses unsupported CSS token type "${type}"`
      );
    }

    const publicPath = magmaPaths[tokenPath];

    if (!publicPath) {
      throw new Error(`Token ${tokenPath} has no Magma compatibility mapping`);
    }

    out.push({
      description: value.$description || '',
      path: tokenPath,
      publicPath,
      type,
      value: value.$value,
    });

    return out;
  }

  if (!isObject(value)) {
    throw new Error(
      `Expected a DTCG group at ${pathSegments.join('.') || '<root>'}`
    );
  }

  const groupType = value.$type || inheritedType;

  for (const [key, child] of Object.entries(value)) {
    if (key === '$root') {
      if (!isToken(child)) {
        throw new Error(
          `DTCG $root at ${pathSegments.join('.') || '<root>'} must be a token`
        );
      }

      flattenTokens(child, [...pathSegments, key], groupType, out);
      continue;
    }
    if (key === '$extends') {
      throw new Error(
        `DTCG $extends is not supported by this POC export profile at ${
          pathSegments.join('.') || '<root>'
        }`
      );
    }
    if (key.startsWith('$')) continue;
    assertValidName(key, pathSegments.join('.'));
    flattenTokens(child, [...pathSegments, key], groupType, out);
  }

  return out;
}

function getReference(value) {
  if (typeof value !== 'string') return undefined;
  const match = value.match(referencePattern);

  return match ? match[1] : undefined;
}

function formatNumber(value, tokenPath) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Token ${tokenPath} must contain a finite number`);
  }

  return String(value);
}

function formatColor(value, tokenPath) {
  if (
    !isObject(value) ||
    typeof value.colorSpace !== 'string' ||
    !Array.isArray(value.components)
  ) {
    throw new Error(
      `Color token ${tokenPath} must contain colorSpace and components`
    );
  }

  if (value.colorSpace !== 'srgb') {
    throw new Error(
      `Color token ${tokenPath} uses unsupported POC color space "${value.colorSpace}"`
    );
  }

  if (
    value.components.length !== 3 ||
    value.components.some(
      component =>
        typeof component !== 'number' ||
        !Number.isFinite(component) ||
        component < 0 ||
        component > 1
    )
  ) {
    throw new Error(
      `Color token ${tokenPath} must contain three sRGB components from 0 to 1`
    );
  }

  const alpha = value.alpha === undefined ? 1 : value.alpha;

  if (
    typeof alpha !== 'number' ||
    !Number.isFinite(alpha) ||
    alpha < 0 ||
    alpha > 1
  ) {
    throw new Error(`Color token ${tokenPath} has an invalid alpha value`);
  }

  if (alpha === 1 && /^#[\dA-F]{6}$/i.test(value.hex || '')) {
    return value.hex;
  }

  const channels = value.components.map(component =>
    Math.round(component * 255)
  );

  return alpha === 1
    ? `rgb(${channels.join(', ')})`
    : `rgba(${channels.join(', ')}, ${alpha})`;
}

function formatDimension(value, tokenPath) {
  if (
    !isObject(value) ||
    typeof value.value !== 'number' ||
    !Number.isFinite(value.value) ||
    !['px', 'rem'].includes(value.unit)
  ) {
    throw new Error(
      `Dimension token ${tokenPath} must contain a finite value and px/rem unit`
    );
  }

  return `${value.value}${value.unit}`;
}

function formatFontFamily(value, tokenPath) {
  const families = Array.isArray(value) ? value : [value];

  if (
    families.length === 0 ||
    families.some(family => typeof family !== 'string' || family.length === 0)
  ) {
    throw new Error(`Font family token ${tokenPath} is invalid`);
  }

  const genericFamilies = new Set([
    'cursive',
    'fantasy',
    'monospace',
    'sans-serif',
    'serif',
    'system-ui',
  ]);

  return families
    .map(family =>
      genericFamilies.has(family) || !/\s/.test(family)
        ? family
        : `"${family.replace(/"/g, '\\"')}"`
    )
    .join(', ');
}

function formatTokenValue(token) {
  const reference = getReference(token.value);

  if (reference) return undefined;

  switch (token.type) {
    case 'color':
      return formatColor(token.value, token.path);
    case 'cubicBezier':
      if (
        !Array.isArray(token.value) ||
        token.value.length !== 4 ||
        token.value.some(value => typeof value !== 'number')
      ) {
        throw new Error(`Cubic Bézier token ${token.path} is invalid`);
      }

      return `cubic-bezier(${token.value.join(', ')})`;
    case 'dimension':
      return formatDimension(token.value, token.path);
    case 'duration':
      if (
        !isObject(token.value) ||
        typeof token.value.value !== 'number' ||
        !['ms', 's'].includes(token.value.unit)
      ) {
        throw new Error(`Duration token ${token.path} is invalid`);
      }

      return `${token.value.value}${token.value.unit}`;
    case 'fontFamily':
      return formatFontFamily(token.value, token.path);
    case 'fontWeight':
    case 'number':
      return formatNumber(token.value, token.path);
    case 'strokeStyle':
      if (typeof token.value !== 'string') {
        throw new Error(`Stroke style token ${token.path} is invalid`);
      }

      return token.value;
    default:
      throw new Error(`No CSS formatter exists for ${token.type}`);
  }
}

const tokens = flattenTokens(source);
const tokensByPath = new Map(tokens.map(token => [token.path, token]));
const publicPaths = new Set();

for (const token of tokens) {
  if (publicPaths.has(token.publicPath)) {
    throw new Error(`Duplicate public token path: ${token.publicPath}`);
  }

  publicPaths.add(token.publicPath);

  const reference = getReference(token.value);

  if (!reference) continue;
  const referencedToken = tokensByPath.get(reference);

  if (!referencedToken) {
    throw new Error(
      `Token ${token.path} references unknown token ${reference}`
    );
  }

  if (token.type !== referencedToken.type) {
    throw new Error(
      `Token ${token.path} (${token.type}) references ${reference} (${referencedToken.type})`
    );
  }
}

for (const mappedPath of Object.keys(magmaPaths)) {
  if (!tokensByPath.has(mappedPath)) {
    throw new Error(`Magma mapping points to unknown token ${mappedPath}`);
  }
}

function resolveCssValue(token, seen = new Set()) {
  const reference = getReference(token.value);

  if (!reference) return formatTokenValue(token);

  if (seen.has(reference)) {
    throw new Error(
      `Circular token reference: ${[...seen, reference].join(' -> ')}`
    );
  }

  return resolveCssValue(
    tokensByPath.get(reference),
    new Set([...seen, reference])
  );
}

function setPath(target, tokenPath, value) {
  const segments = tokenPath.split('.');
  let current = target;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }

    current[segment] = current[segment] || {};
    current = current[segment];
  });
}

function normalizeSegment(segment) {
  const aliased = segment === 'colors' ? 'color' : segment;

  return aliased
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();
}

function pathToCssVarName(tokenPath) {
  return `--magma-${tokenPath.split('.').map(normalizeSegment).join('-')}`;
}

const tokenDefinitions = {};
const magmaTokens = {};

for (const token of tokens) {
  const reference = getReference(token.value);
  const alias = reference ? tokensByPath.get(reference).publicPath : undefined;
  const cssValue = formatTokenValue(token);

  tokenDefinitions[token.publicPath] = {
    ...(alias ? { alias } : {}),
    ...(cssValue ? { cssValue } : {}),
    legacyPath: token.publicPath,
    sourcePath: token.path,
    type: token.type,
  };
  setPath(magmaTokens, token.publicPath, resolveCssValue(token));
}

const tokenPaths = Object.keys(tokenDefinitions).sort();
const cssVariableRows = tokenPaths.map(tokenPath => {
  const definition = tokenDefinitions[tokenPath];
  const value = definition.alias
    ? `var(${pathToCssVarName(definition.alias)}, ${resolveCssValue(
        tokensByPath.get(definition.sourcePath)
      )})`
    : definition.cssValue;

  return `${pathToCssVarName(tokenPath)}: ${value};`;
});
const referenceRows = tokenPaths.map(tokenPath => {
  const definition = tokenDefinitions[tokenPath];
  const sourceToken = tokensByPath.get(definition.sourcePath);
  const defaultValue = definition.alias
    ? `{${definition.alias}}`
    : definition.cssValue;

  return `| \`${sourceToken.path}\` | \`${tokenPath}\` | \`${pathToCssVarName(
    tokenPath
  )}\` | \`${defaultValue}\` |`;
});

function writeFileIfChanged(filePath, contents, committed = false) {
  if (
    fs.existsSync(filePath) &&
    fs.readFileSync(filePath, 'utf8') === contents
  ) {
    return;
  }

  if (checkMode) {
    if (committed) staleCommittedFiles.push(filePath);
    return;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

writeFileIfChanged(
  path.join(outDir, 'magma.json'),
  `${JSON.stringify(magmaTokens, null, 2)}\n`
);
writeFileIfChanged(
  path.join(outDir, 'css-vars.css'),
  `:where(:root, :host) {\n  ${cssVariableRows.join('\n  ')}\n}\n`
);
writeFileIfChanged(
  path.join(outDir, 'token-paths.d.ts'),
  `export type TokenPath =\n${tokenPaths
    .map(tokenPath => `  | '${tokenPath}'`)
    .join('\n')};\n`
);
writeFileIfChanged(
  path.join(outDir, 'index.d.ts'),
  "export type { TokenPath } from './token-paths';\nexport declare const magmaTokens: Record<string, unknown>;\nexport declare const tokenDefinitions: Record<string, { alias?: string; cssValue?: string; legacyPath: string; sourcePath: string; type: string }>;\n"
);
writeFileIfChanged(
  path.join(outDir, 'index.js'),
  `export const magmaTokens = ${JSON.stringify(
    magmaTokens,
    null,
    2
  )};\n\nexport const tokenDefinitions = ${JSON.stringify(
    tokenDefinitions,
    null,
    2
  )};\n`
);
writeFileIfChanged(
  path.join(outDir, 'token-reference.md'),
  `# React Magma Token Reference\n\n| DTCG source path | Public token path | CSS variable | Default/reference |\n| --- | --- | --- | --- |\n${referenceRows.join(
    '\n'
  )}\n`
);
writeFileIfChanged(
  path.join(domThemeDir, 'tokenPaths.ts'),
  `// Generated from packages/design-tokens. Do not edit by hand.\nexport type TokenPath =\n${tokenPaths
    .map(tokenPath => `  | '${tokenPath}'`)
    .join('\n')};\n`,
  true
);
writeFileIfChanged(
  path.join(domThemeDir, 'tokenContract.ts'),
  `// Generated from packages/design-tokens. Do not edit by hand.\nexport interface TokenDefinition {\n  alias?: string;\n  cssValue?: string;\n  legacyPath: string;\n  sourcePath: string;\n  type: string;\n}\n\nexport const TOKEN_DEFINITIONS: {\n  [path: string]: TokenDefinition;\n} = ${JSON.stringify(tokenDefinitions, null, 2)};\n`,
  true
);

if (staleCommittedFiles.length > 0) {
  throw new Error(
    `Generated token artifacts are stale:\n${staleCommittedFiles
      .map(filePath => `- ${path.relative(repoRoot, filePath)}`)
      .join('\n')}\nRun npm run generate:tokens.`
  );
}

console.log(
  `${checkMode ? 'Validated' : 'Validated and generated'} ${
    tokens.length
  } DTCG tokens from ${path.relative(process.cwd(), sourcePath)}`
);
