#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Accessibility testing script for all Storybook stories
 * Tests each story with pa11y and axe-core using Playwright
 */

const AxeBuilder = require('@axe-core/playwright').default;
const { chromium } = require('@playwright/test');
const fs = require('fs');
const pa11y = require('pa11y');
const path = require('path');

const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006';
const OUTPUT_DIR = path.join(process.cwd(), 'a11y-results');

// Axe-core configuration
const axeConfig = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  },
  rules: {
    // Disable rules that are too strict for component library testing
    region: { enabled: false },
    'landmark-one-main': { enabled: false },
    'page-has-heading-one': { enabled: false },
  },
};

async function getStoryUrls(page) {
  try {
    await page.goto(STORYBOOK_URL + '/iframe.html', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  } catch (error) {
    console.error(
      'Failed to load Storybook. Is it running at',
      STORYBOOK_URL,
      '?'
    );
    throw error;
  }

  // Wait for Storybook to load
  await page.waitForTimeout(5000);

  // Get all stories from Storybook's internal API
  const stories = await page.evaluate(() => {
    if (window.__STORYBOOK_PREVIEW__?.storyStore) {
      const storyStore = window.__STORYBOOK_PREVIEW__.storyStore;
      return storyStore.extract();
    } else if (window.__STORYBOOK_STORY_STORE__) {
      return window.__STORYBOOK_STORY_STORE__.extract();
    }
    return {};
  });

  // Convert stories object to URLs
  const storyUrls = Object.keys(stories).map(storyId => ({
    id: storyId,
    title: stories[storyId].title,
    name: stories[storyId].name,
    url: `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`,
  }));

  return storyUrls;
}

async function testStoryWithPa11y(storyUrl, browser) {
  try {
    const results = await pa11y(storyUrl.url, {
      browser,
      standard: 'WCAG2AA',
      timeout: 60000,
      wait: 2000,
      runners: ['htmlcs'],
      includeWarnings: false,
      includeNotices: false,
      ignore: ['region', 'landmark-one-main', 'page-has-heading-one'],
    });

    return {
      id: storyUrl.id,
      title: storyUrl.title,
      name: storyUrl.name,
      url: storyUrl.url,
      tool: 'pa11y',
      issues: results.issues.map(issue => ({
        code: issue.code,
        type: issue.type,
        message: issue.message,
        context: issue.context,
        selector: issue.selector,
      })),
      issueCount: results.issues.length,
    };
  } catch (error) {
    return {
      id: storyUrl.id,
      title: storyUrl.title,
      name: storyUrl.name,
      url: storyUrl.url,
      tool: 'pa11y',
      error: error.message,
    };
  }
}

async function testStoryWithAxe(storyUrl, page) {
  try {
    await page.goto(storyUrl.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await page.waitForTimeout(2000);

    const axeBuilder = new AxeBuilder({ page });
    axeBuilder.withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'best-practice',
    ]);
    axeBuilder.disableRules([
      'region',
      'landmark-one-main',
      'page-has-heading-one',
    ]);

    const results = await axeBuilder.analyze();

    return {
      id: storyUrl.id,
      title: storyUrl.title,
      name: storyUrl.name,
      url: storyUrl.url,
      tool: 'axe-core',
      violations: results.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.length,
        tags: violation.tags,
      })),
      violationCount: results.violations.length,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
    };
  } catch (error) {
    return {
      id: storyUrl.id,
      title: storyUrl.title,
      name: storyUrl.name,
      url: storyUrl.url,
      tool: 'axe-core',
      error: error.message,
    };
  }
}

function generateReport(results) {
  const timestamp = new Date().toISOString();

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Calculate summary statistics
  const pa11yResults = results.filter(r => r.tool === 'pa11y');
  const axeResults = results.filter(r => r.tool === 'axe-core');

  const pa11yTotalIssues = pa11yResults.reduce(
    (sum, r) => sum + (r.issueCount || 0),
    0
  );
  const axeTotalViolations = axeResults.reduce(
    (sum, r) => sum + (r.violationCount || 0),
    0
  );

  const pa11yStoriesWithIssues = pa11yResults.filter(
    r => r.issueCount > 0
  ).length;
  const axeStoriesWithViolations = axeResults.filter(
    r => r.violationCount > 0
  ).length;

  const summary = {
    timestamp,
    totalStories: pa11yResults.length,
    pa11y: {
      totalIssues: pa11yTotalIssues,
      storiesWithIssues: pa11yStoriesWithIssues,
      storiesWithoutIssues: pa11yResults.length - pa11yStoriesWithIssues,
    },
    axeCore: {
      totalViolations: axeTotalViolations,
      storiesWithViolations: axeStoriesWithViolations,
      storiesWithoutViolations: axeResults.length - axeStoriesWithViolations,
    },
  };

  // Write detailed JSON report
  const jsonReport = {
    summary,
    results,
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'a11y-report.json'),
    JSON.stringify(jsonReport, null, 2)
  );

  // Write human-readable report
  let textReport = `Accessibility Test Report (Pa11y + Axe-core with Playwright)\n`;
  textReport += `Generated: ${timestamp}\n`;
  textReport += `\n${'='.repeat(80)}\n`;
  textReport += `\nSUMMARY\n`;
  textReport += `${'='.repeat(80)}\n`;
  textReport += `Total Stories Tested: ${summary.totalStories}\n\n`;
  textReport += `Pa11y Results:\n`;
  textReport += `  - Total Issues: ${summary.pa11y.totalIssues}\n`;
  textReport += `  - Stories with Issues: ${summary.pa11y.storiesWithIssues}\n`;
  textReport += `  - Stories without Issues: ${summary.pa11y.storiesWithoutIssues}\n\n`;
  textReport += `Axe-core Results:\n`;
  textReport += `  - Total Violations: ${summary.axeCore.totalViolations}\n`;
  textReport += `  - Stories with Violations: ${summary.axeCore.storiesWithViolations}\n`;
  textReport += `  - Stories without Violations: ${summary.axeCore.storiesWithoutViolations}\n`;
  textReport += `\n${'='.repeat(80)}\n`;
  textReport += `\nDETAILED RESULTS\n`;
  textReport += `${'='.repeat(80)}\n\n`;

  // Group results by story
  const storiesMap = {};
  results.forEach(result => {
    if (!storiesMap[result.id]) {
      storiesMap[result.id] = {
        title: result.title,
        name: result.name,
        url: result.url,
        results: [],
      };
    }
    storiesMap[result.id].results.push(result);
  });

  Object.keys(storiesMap).forEach(storyId => {
    const story = storiesMap[storyId];
    const pa11yResult = story.results.find(r => r.tool === 'pa11y');
    const axeResult = story.results.find(r => r.tool === 'axe-core');

    const hasIssues =
      pa11yResult?.issueCount > 0 || axeResult?.violationCount > 0;

    if (hasIssues) {
      textReport += `\n${story.title} > ${story.name}\n`;
      textReport += `${'-'.repeat(80)}\n`;
      textReport += `URL: ${story.url}\n\n`;

      if (pa11yResult && pa11yResult.issueCount > 0) {
        textReport += `Pa11y Issues (${pa11yResult.issueCount}):\n`;
        pa11yResult.issues.forEach((issue, idx) => {
          textReport += `  ${idx + 1}. [${issue.type.toUpperCase()}] ${issue.message}\n`;
          textReport += `     Code: ${issue.code}\n`;
          textReport += `     Selector: ${issue.selector}\n`;
          if (issue.context) {
            textReport += `     Context: ${issue.context.substring(0, 100)}...\n`;
          }
          textReport += `\n`;
        });
      }

      if (axeResult && axeResult.violationCount > 0) {
        textReport += `Axe-core Violations (${axeResult.violationCount}):\n`;
        axeResult.violations.forEach((violation, idx) => {
          textReport += `  ${idx + 1}. [${violation.impact?.toUpperCase() || 'UNKNOWN'}] ${violation.help}\n`;
          textReport += `     ID: ${violation.id}\n`;
          textReport += `     Description: ${violation.description}\n`;
          textReport += `     Help: ${violation.helpUrl}\n`;
          textReport += `     Nodes affected: ${violation.nodes}\n`;
          textReport += `\n`;
        });
      }

      textReport += `\n`;
    }
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, 'a11y-report.txt'), textReport);

  return summary;
}

async function main() {
  console.log(
    '🚀 Starting Storybook accessibility tests with Playwright + Pa11y + Axe-core...\n'
  );
  console.log(`Storybook URL: ${STORYBOOK_URL}\n`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('📚 Discovering Storybook stories...');
    const storyUrls = await getStoryUrls(page);
    console.log(`✅ Found ${storyUrls.length} stories\n`);

    if (storyUrls.length === 0) {
      console.error('❌ No stories found. Make sure Storybook is running.');
      process.exit(1);
    }

    const allResults = [];
    let completed = 0;

    console.log('🔍 Running accessibility tests...\n');

    for (const storyUrl of storyUrls) {
      process.stdout.write(
        `Testing [${completed + 1}/${storyUrls.length}]: ${storyUrl.title} > ${storyUrl.name}...`
      );

      const [pa11yResult, axeResult] = await Promise.all([
        testStoryWithPa11y(storyUrl, browser),
        testStoryWithAxe(storyUrl, page),
      ]);

      allResults.push(pa11yResult, axeResult);
      completed++;

      const issues =
        (pa11yResult.issueCount || 0) + (axeResult.violationCount || 0);
      if (issues > 0) {
        process.stdout.write(` ⚠️  ${issues} issues found\n`);
      } else {
        process.stdout.write(` ✅\n`);
      }
    }

    console.log('\n📊 Generating reports...');
    const summary = generateReport(allResults);

    console.log('\n' + '='.repeat(80));
    console.log('ACCESSIBILITY TEST SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Stories Tested: ${summary.totalStories}`);
    console.log(`\nPa11y:`);
    console.log(`  - Total Issues: ${summary.pa11y.totalIssues}`);
    console.log(`  - Stories with Issues: ${summary.pa11y.storiesWithIssues}`);
    console.log(`\nAxe-core:`);
    console.log(`  - Total Violations: ${summary.axeCore.totalViolations}`);
    console.log(
      `  - Stories with Violations: ${summary.axeCore.storiesWithViolations}`
    );
    console.log('\n✅ Reports saved to:', OUTPUT_DIR);
    console.log('  - a11y-report.json (detailed JSON)');
    console.log('  - a11y-report.txt (human-readable)');
    console.log('='.repeat(80) + '\n');

    // Exit with error if there are violations
    const totalIssues =
      summary.pa11y.totalIssues + summary.axeCore.totalViolations;
    if (totalIssues > 0) {
      console.error(
        `❌ Found ${totalIssues} accessibility issues. Please review and fix.`
      );
      process.exit(1);
    } else {
      console.log('✅ All stories passed accessibility tests!');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error running tests:', error);
    process.exit(1);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

main();
