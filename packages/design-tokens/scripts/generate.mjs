import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(packageRoot, 'src', 'magma.tokens.json');
const outDir = path.join(packageRoot, 'dist');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const referencePattern = /^\{([^}]+)\}$/;

function isToken(value) {
  return !!value && typeof value === 'object' && '$value' in value;
}

function flattenTokens(value, pathSegments = [], out = []) {
  if (isToken(value)) {
    out.push({
      description: value.$description || '',
      magmaPath: value.$extensions?.magma?.path || pathSegments.join('.'),
      path: pathSegments.join('.'),
      type: value.$type || '',
      value: value.$value,
    });

    return out;
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of Object.keys(value)) {
      if (key.startsWith('$')) continue;
      flattenTokens(value[key], [...pathSegments, key], out);
    }
  }

  return out;
}

const tokens = flattenTokens(source);
const tokensByPath = new Map(tokens.map(token => [token.path, token]));

function resolveTokenValue(token, seen = new Set()) {
  const reference =
    typeof token.value === 'string' && token.value.match(referencePattern);

  if (!reference) return token.value;

  const referencePath = reference[1];

  if (seen.has(referencePath)) {
    throw new Error(
      `Circular token reference detected: ${[...seen, referencePath].join(' -> ')}`
    );
  }

  const referencedToken = tokensByPath.get(referencePath);

  if (!referencedToken) {
    throw new Error(`Unknown token reference: ${referencePath}`);
  }

  return resolveTokenValue(referencedToken, new Set([...seen, referencePath]));
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

function pathToCssVarName(tokenPath, prefix = 'magma') {
  const normalizedPrefix = prefix.replace(/^--/, '').replace(/-+$/, '');
  const cssPrefix = normalizedPrefix ? `--${normalizedPrefix}-` : '--';

  return `${cssPrefix}${tokenPath.split('.').map(normalizeSegment).join('-')}`;
}

const resolvedTokens = tokens.map(token => ({
  ...token,
  resolvedValue: resolveTokenValue(token),
}));

const magmaTokens = {};

resolvedTokens.forEach(token => {
  setPath(magmaTokens, token.magmaPath, token.resolvedValue);
});

const tokenPaths = resolvedTokens
  .map(token => token.magmaPath)
  .filter((tokenPath, index, allPaths) => allPaths.indexOf(tokenPath) === index)
  .sort();

const cssVariableRows = resolvedTokens
  .map(token => `${pathToCssVarName(token.magmaPath)}: ${token.resolvedValue};`)
  .sort();

const referenceRows = resolvedTokens
  .map(token => {
    const cssVarName = pathToCssVarName(token.magmaPath);

    return `| \`${token.magmaPath}\` | \`${cssVarName}\` | \`${token.resolvedValue}\` |`;
  })
  .sort();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'magma.json'),
  `${JSON.stringify(magmaTokens, null, 2)}\n`
);
fs.writeFileSync(
  path.join(outDir, 'css-vars.css'),
  `:where(:root, :host) {\n  ${cssVariableRows.join('\n  ')}\n}\n`
);
fs.writeFileSync(
  path.join(outDir, 'token-paths.d.ts'),
  `export type TokenPath =\n${tokenPaths
    .map(tokenPath => `  | '${tokenPath}'`)
    .join('\n')};\n`
);
fs.writeFileSync(
  path.join(outDir, 'index.d.ts'),
  "export type { TokenPath } from './token-paths';\nexport declare const magmaTokens: Record<string, unknown>;\n"
);
fs.writeFileSync(
  path.join(outDir, 'index.js'),
  `export const magmaTokens = ${JSON.stringify(magmaTokens, null, 2)};\n`
);
fs.writeFileSync(
  path.join(outDir, 'token-reference.md'),
  `# React Magma Token Reference\n\n| Token path | CSS variable | Default value |\n| --- | --- | --- |\n${referenceRows.join(
    '\n'
  )}\n`
);

console.log(
  `Generated ${resolvedTokens.length} tokens in ${path.relative(process.cwd(), outDir)}`
);
