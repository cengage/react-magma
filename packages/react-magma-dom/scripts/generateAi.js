/**
 * Builds the AI agent skill shipped as `react-magma-dom/ai/`.
 *
 * Inputs:
 *   - public exports of src/index.ts (resolved with the TypeScript compiler)
 *   - hand-written ai-src/catalog.js, ai-src/SKILL.template.md, ai-src/*.md
 *
 * Usage:
 *   node scripts/generateAi.js          write ai/ (warns about catalog gaps)
 *   node scripts/generateAi.js --check  verify generated files without writing
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const PKG_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PKG_ROOT, 'src');
const SRC_INDEX = path.join(SRC_DIR, 'index.ts');
const AI_SRC_DIR = path.join(PKG_ROOT, 'ai-src');
const OUT_DIR = path.join(PKG_ROOT, 'ai');

const isValue = symbol => Boolean(symbol.flags & ts.SymbolFlags.Value);

// Keep helper exports out of the additional component export list.
const isComponentLike = name =>
  /^[A-Z]/.test(name) &&
  !/(Context|Styles|Types|Component)$/.test(name) &&
  !/^(Styled|Enum)/.test(name);

/**
 * Returns every value export of src/index.ts, grouped by component folder.
 * Type-only exports are skipped: agents find them in .d.ts files.
 */
function collectPublicApi() {
  const configPath = path.join(PKG_ROOT, 'tsconfig.json');
  const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, PKG_ROOT);
  const program = ts.createProgram([SRC_INDEX], { ...options, noEmit: true });
  const checker = program.getTypeChecker();
  const moduleSymbol = checker.getSymbolAtLocation(
    program.getSourceFile(SRC_INDEX)
  );

  const components = {};
  const core = [];

  checker.getExportsOfModule(moduleSymbol).forEach(exported => {
    const symbol =
      exported.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exported)
        : exported;

    if (!isValue(symbol)) {
      return;
    }

    const name = exported.getName();
    const declaration = (symbol.declarations || [])[0];
    const fileName = declaration
      ? path.relative(SRC_DIR, declaration.getSourceFile().fileName)
      : '';
    const folder = fileName.match(/^components\/([^/]+)\//);

    if (folder) {
      (components[folder[1]] = components[folder[1]] || []).push(name);
    } else if (!name.startsWith('use')) {
      core.push(name);
    }
  });

  Object.values(components).forEach(names => names.sort());

  return { components, core: core.sort() };
}

function loadCatalog() {
  const catalogPath = path.join(AI_SRC_DIR, 'catalog.js');

  delete require.cache[require.resolve(catalogPath)];

  return require(catalogPath);
}

/**
 * Flattens the categorized catalog and validates it against the public API.
 */
function resolveCatalog(catalog, api) {
  const problems = [];
  const covered = new Set();
  const catalogFolders = new Map();
  const categories = [];

  Object.entries(catalog).forEach(([category, entries]) => {
    const items = Object.entries(entries).map(([folder, entry]) => {
      const folders = [folder, ...(entry.includes || [])];
      const exports = folders.flatMap(name => {
        if (catalogFolders.has(name)) {
          problems.push(
            `catalog.js: "${name}" is listed more than once (in "${category}" and "${catalogFolders.get(name)}")`
          );
        } else {
          catalogFolders.set(name, category);
        }

        if (!api.components[name]) {
          problems.push(
            `catalog.js: "${name}" has no public value exports in src/index.ts`
          );

          return [];
        }
        covered.add(name);

        return api.components[name];
      });

      if (!entry.purpose || !entry.keywords || !entry.keywords.length) {
        problems.push(`catalog.js: "${folder}" needs purpose and keywords`);
      }

      Object.entries(entry.useInstead || {}).forEach(([need, component]) => {
        if (!api.components[component]) {
          problems.push(
            `catalog.js: "${folder}" useInstead for "${need}" references unknown component "${component}"`
          );
        }
      });

      return { folder, entry, exports };
    });

    categories.push({ category, items });
  });

  const missing = Object.keys(api.components)
    .filter(folder => !covered.has(folder))
    .sort();

  missing.forEach(folder => {
    problems.push(
      `catalog.js: missing entry for exported component folder "${folder}"`
    );
  });

  if (missing.length) {
    categories.push({
      category: 'Uncategorized',
      items: missing.map(folder => ({
        folder,
        entry: {},
        exports: api.components[folder],
      })),
    });
  }

  return { categories, problems };
}

function renderCatalogItem({ folder, entry, exports }) {
  const parts = [`- **${folder}**`];

  if (entry.purpose) {
    parts.push(`— ${entry.purpose}`);
  }
  if (entry.keywords && entry.keywords.length) {
    parts.push(`(${entry.keywords.join(', ')})`);
  }

  let line = parts.join(' ');

  if (entry.useInstead) {
    const alternatives = Object.entries(entry.useInstead)
      .map(([need, component]) => `${need} → ${component}`)
      .join('; ');

    line += `. Not for: ${alternatives}`;
  }

  const extraExports = exports.filter(
    name => name !== folder && isComponentLike(name)
  );

  if (extraExports.length) {
    line += `. Also: ${extraExports.join(', ')}`;
  }

  return line;
}

function renderCatalog(categories) {
  return categories
    .map(
      ({ category, items }) =>
        `### ${category}\n${items.map(renderCatalogItem).join('\n')}`
    )
    .join('\n\n');
}

function fillTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!(key in values)) {
      throw new Error(`SKILL.template.md: unknown placeholder ${match}`);
    }

    return values[key];
  });
}

/**
 * Generates every file of the skill. Returns { files, problems } without
 * touching the disk so the result can be asserted in tests.
 */
function build() {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(PKG_ROOT, 'package.json'), 'utf8')
  );
  const api = collectPublicApi();
  const { categories, problems } = resolveCatalog(loadCatalog(), api);
  const template = fs.readFileSync(
    path.join(AI_SRC_DIR, 'SKILL.template.md'),
    'utf8'
  );

  const files = {
    'SKILL.md': fillTemplate(template, {
      version: pkg.version,
      reactVersion: pkg.peerDependencies.react,
      catalog: renderCatalog(categories),
      core: api.core.map(name => `\`${name}\``).join(', '),
    }),
  };

  const sourceFiles = fs.readdirSync(AI_SRC_DIR);

  sourceFiles
    .filter(file => fs.statSync(path.join(AI_SRC_DIR, file)).isDirectory())
    .forEach(file => {
      problems.push(`${file}: ai-src supports flat files only`);
    });

  sourceFiles
    .filter(file => file.endsWith('.md') && file !== 'SKILL.template.md')
    .forEach(file => {
      files[file] = fs.readFileSync(path.join(AI_SRC_DIR, file), 'utf8');
    });

  Object.entries(files).forEach(([file, content]) => {
    // Relative markdown links must point at generated files.
    [...content.matchAll(/\]\(([^)#]+\.md)\)/g)].forEach(([, link]) => {
      if (!/^https?:/.test(link) && !files[link]) {
        problems.push(`${file}: broken link to ${link}`);
      }
    });
  });

  return { files, problems, api };
}

function write(files) {
  const staleFiles = fs.existsSync(OUT_DIR)
    ? fs
        .readdirSync(OUT_DIR)
        .filter(file => file.endsWith('.md') && !(file in files))
    : [];

  fs.mkdirSync(OUT_DIR, { recursive: true });
  staleFiles.forEach(file => fs.unlinkSync(path.join(OUT_DIR, file)));
  Object.entries(files).forEach(([file, content]) => {
    fs.writeFileSync(path.join(OUT_DIR, file), content);
  });
}

function check(files) {
  const existingFiles = fs.existsSync(OUT_DIR)
    ? fs
        .readdirSync(OUT_DIR, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => `${entry.name}/`)
        .concat(
          fs
            .readdirSync(OUT_DIR, { withFileTypes: true })
            .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
            .map(entry => entry.name)
        )
    : [];
  const problems = [];

  Object.entries(files).forEach(([file, content]) => {
    const outputPath = path.join(OUT_DIR, file);

    if (!fs.existsSync(outputPath)) {
      problems.push(`${file}: generated file is missing`);
    } else if (fs.readFileSync(outputPath, 'utf8') !== content) {
      problems.push(`${file}: generated file is out of date`);
    }
  });

  existingFiles
    .filter(file => !(file in files))
    .forEach(file => problems.push(`${file}: stale generated file`));

  return problems;
}

if (require.main === module) {
  const isCheck = process.argv.includes('--check');
  const { files, problems } = build();

  if (!isCheck) {
    write(files);
    process.stdout.write('AI skill written to ai/\n');
  } else {
    problems.push(...check(files));
  }

  if (problems.length) {
    const report = problems.map(problem => `  - ${problem}`).join('\n');

    if (isCheck) {
      console.error(`AI skill check failed:\n${report}`);
      process.exit(1);
    }
    console.warn(`AI skill warnings:\n${report}`);
  }
}

module.exports = {
  build,
  check,
  collectPublicApi,
  resolveCatalog,
};
