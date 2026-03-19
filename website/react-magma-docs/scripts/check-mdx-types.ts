/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// DOCS_ROOT is the directory from which the npm script is run
const DOCS_ROOT = process.cwd();
const PAGES_DIR = path.join(DOCS_ROOT, 'src', 'pages');
const TMP_DIR = path.join(DOCS_ROOT, '.mdx-typecheck-tmp');
const TSCONFIG = path.join(DOCS_ROOT, 'tsconfig.mdx-check.json');

interface ExtractedBlock {
  mdxFile: string; // relative path from DOCS_ROOT e.g. "src/pages/api/tabs.mdx"
  startLine: number; // 1-based line number of the opening ```tsx
  code: string;
  tmpFile: string; // absolute path to the temp .tsx file
}

/**
 * Recursively find all .mdx files under a directory.
 */
function findMdxFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(full));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract all ```tsx code blocks from an MDX file.
 * Skips blocks with noRender or noCode meta flags (they aren't rendered live).
 */
function extractTsxBlocks(filePath: string): ExtractedBlock[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const blocks: ExtractedBlock[] = [];

  let inBlock = false;
  let blockLines: string[] = [];
  let blockStartLine = 0;
  let blockIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inBlock) {
      // Match opening fence: ```tsx with optional meta flags
      const match = line.match(/^```tsx(.*)$/);
      if (match) {
        const meta = match[1].trim();
        // Skip blocks that won't be rendered live
        if (meta.includes('noRender') || meta.includes('noCode')) {
          // Still need to skip past the closing fence
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].trimEnd() === '```') {
              i = j;
              break;
            }
          }
          continue;
        }
        inBlock = true;
        blockStartLine = i + 1; // 1-based
        blockLines = [];
      }
    } else {
      if (line.trimEnd() === '```') {
        // End of block
        const relPath = path.relative(DOCS_ROOT, filePath);
        const safeName = relPath.replace(/[/\\]/g, '__').replace(/\.mdx$/, '');
        const tmpFile = path.join(
          TMP_DIR,
          `${safeName}__block${blockIndex}.tsx`
        );

        blocks.push({
          mdxFile: relPath,
          startLine: blockStartLine,
          code: blockLines.join('\n'),
          tmpFile,
        });

        inBlock = false;
        blockIndex++;
      } else {
        blockLines.push(line);
      }
    }
  }

  return blocks;
}

/**
 * Parse tsc output and map errors back to MDX source locations.
 * Only includes errors from the extracted code blocks (filters out node_modules).
 */
function mapErrors(
  tscOutput: string,
  blocks: ExtractedBlock[]
): { mapped: string; count: number } {
  // Build lookup: tmpFile -> block
  const lookup = new Map<string, ExtractedBlock>();
  for (const block of blocks) {
    lookup.set(block.tmpFile, block);
  }

  const lines = tscOutput.split('\n');
  const mappedLines: string[] = [];
  let errorCount = 0;

  for (const line of lines) {
    // Match tsc error format: /path/to/file.tsx(line,col): error TS...
    const match = line.match(/^(.+?)\((\d+),(\d+)\):\s+(error .+)$/);
    if (match) {
      const [, tmpFile, lineStr, col, message] = match;
      const absPath = path.resolve(tmpFile);
      const block = lookup.get(absPath);
      if (block) {
        const mdxLine = block.startLine + parseInt(lineStr, 10);
        mappedLines.push(`${block.mdxFile}:${mdxLine}:${col} - ${message}`);
        errorCount++;
      }
      // Silently skip errors from node_modules / other files
    }
  }

  return { mapped: mappedLines.join('\n'), count: errorCount };
}

/**
 * Resolve the path to a TypeScript 5.x tsc binary.
 * Prefers the docs package's own installation, falls back to npx.
 */
function resolveTscPath(): string {
  // Check for a local typescript installation in the docs package
  const localTsc = path.join(DOCS_ROOT, 'node_modules', '.bin', 'tsc');
  if (fs.existsSync(localTsc)) {
    try {
      const version = execSync(`"${localTsc}" --version`, {
        encoding: 'utf-8',
      }).trim();
      console.log(`Using local TypeScript: ${version}`);
      return localTsc;
    } catch {
      // fall through
    }
  }

  // Check the root node_modules tsc version
  const rootTsc = path.resolve(
    DOCS_ROOT,
    '..',
    '..',
    'node_modules',
    '.bin',
    'tsc'
  );
  if (fs.existsSync(rootTsc)) {
    try {
      const version = execSync(`"${rootTsc}" --version`, {
        encoding: 'utf-8',
      }).trim();
      const major = parseInt(
        version.replace(/^Version\s+/, '').split('.')[0],
        10
      );
      if (major >= 5) {
        console.log(`Using root TypeScript: ${version}`);
        return rootTsc;
      }
      console.warn(
        `Root TypeScript is ${version} (too old). ` +
          `This script requires TypeScript >= 5.0 for proper type checking.`
      );
    } catch {
      // fall through
    }
  }

  // npx fallback — will use whatever version is available
  console.warn(
    'Could not find TypeScript >= 5.0. Falling back to npx tsc. ' +
      'Install typescript@^5.0.0 in the docs package for reliable results.'
  );
  return 'npx tsc';
}

function main() {
  console.log('Extracting tsx blocks from MDX files...');

  // Clean and create temp directory
  if (fs.existsSync(TMP_DIR)) {
    execSync(`rm -rf "${TMP_DIR}"`);
  }
  fs.mkdirSync(TMP_DIR, { recursive: true });

  // Find all MDX files and extract blocks
  const mdxFiles = findMdxFiles(PAGES_DIR);
  const allBlocks: ExtractedBlock[] = [];

  for (const file of mdxFiles) {
    allBlocks.push(...extractTsxBlocks(file));
  }

  console.log(
    `Found ${allBlocks.length} tsx blocks in ${mdxFiles.length} MDX files.`
  );

  if (allBlocks.length === 0) {
    console.log('No tsx blocks found. Nothing to check.');
    cleanup();
    return;
  }

  // Write temp files
  for (const block of allBlocks) {
    fs.writeFileSync(block.tmpFile, block.code, 'utf-8');
  }

  console.log(
    `Written ${allBlocks.length} temp files to ${path.relative(DOCS_ROOT, TMP_DIR)}/`
  );

  // Resolve tsc binary
  const tscPath = resolveTscPath();
  const tscCommand = tscPath.includes(' ')
    ? `${tscPath} --noEmit --project "${TSCONFIG}"`
    : `"${tscPath}" --noEmit --project "${TSCONFIG}"`;

  console.log('Running tsc --noEmit...\n');

  // Run tsc
  let tscOutput = '';
  let tscExitCode = 0;
  try {
    execSync(tscCommand, {
      cwd: DOCS_ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (err) {
    const e = err as any;
    tscOutput = (e.stdout || '') + (e.stderr || '');
    tscExitCode = e.status || 1;
  }

  if (tscExitCode === 0) {
    console.log('All tsx blocks passed type checking!');
    cleanup();
    return;
  }

  const { mapped, count } = mapErrors(tscOutput, allBlocks);
  if (count === 0) {
    // All errors were from node_modules — treat as success
    console.log('All tsx blocks passed type checking!');
    cleanup();
    return;
  }

  if (mapped.trim()) {
    console.error(mapped);
  }
  console.error(`\nFound ${count} type error(s) in MDX code blocks.`);
  cleanup();
  process.exit(1);
}

function cleanup() {
  if (fs.existsSync(TMP_DIR)) {
    execSync(`rm -rf "${TMP_DIR}"`);
  }
}

main();
