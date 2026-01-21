#!/usr/bin/env node
/* eslint-disable complexity */
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
    // Include WCAG 2.2 AA standards (includes 2.0 and 2.1)
    axeBuilder.withTags([
      'wcag2a', // WCAG 2.0 Level A
      'wcag2aa', // WCAG 2.0 Level AA
      'wcag21a', // WCAG 2.1 Level A
      'wcag21aa', // WCAG 2.1 Level AA
      'wcag22aa', // WCAG 2.2 Level AA (latest)
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

  // Calculate severity counts
  let criticalCount = 0;
  let seriousCount = 0;
  let moderateCount = 0;

  results.forEach(result => {
    if (result.tool === 'pa11y' && result.issues) {
      result.issues.forEach(issue => {
        if (issue.type === 'error') criticalCount++;
        else if (issue.type === 'warning') seriousCount++;
        else if (issue.type === 'notice') moderateCount++;
      });
    } else if (result.tool === 'axe-core' && result.violations) {
      result.violations.forEach(violation => {
        const count = violation.nodes || 1;
        if (violation.impact === 'critical') criticalCount += count;
        else if (violation.impact === 'serious') seriousCount += count;
        else if (
          violation.impact === 'moderate' ||
          violation.impact === 'minor'
        )
          moderateCount += count;
      });
    }
  });

  const summary = {
    timestamp,
    totalStories: pa11yResults.length,
    severity: {
      critical: criticalCount,
      serious: seriousCount,
      moderate: moderateCount,
    },
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

  // Generate HTML report
  generateHTMLReport(jsonReport, storiesMap);

  return summary;
}

function generateHTMLReport(report, storiesMap) {
  const { summary } = report;
  const timestamp = new Date(summary.timestamp).toLocaleString();

  const totalIssues =
    summary.pa11y.totalIssues + summary.axeCore.totalViolations;
  const statusColor = totalIssues === 0 ? '#28a745' : '#dc3545';
  const statusText = totalIssues === 0 ? '✓ PASSED' : '✗ FAILED';

  // Get PR info from environment variables
  const prNumber = process.env.GITHUB_PR_NUMBER || process.env.PR_NUMBER || '';
  const repoUrl = process.env.GITHUB_REPOSITORY
    ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
    : '';
  const prUrl = prNumber && repoUrl ? `${repoUrl}/pull/${prNumber}` : '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Test Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { font-size: 28px; margin-bottom: 10px; }
    .header .timestamp { opacity: 0.9; font-size: 14px; }
    .status { display: inline-block; padding: 8px 16px; border-radius: 4px; background: ${statusColor}; color: white; font-weight: bold; margin-top: 15px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 30px; background: #f8f9fa; }
    .summary-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .summary-card h3 { font-size: 14px; color: #666; text-transform: uppercase; margin-bottom: 10px; }
    .summary-card .number { font-size: 36px; font-weight: bold; color: #333; }
    .summary-card .label { font-size: 12px; color: #999; margin-top: 5px; }
    .severity-breakdown { margin-top: 10px; font-size: 13px; display: flex; flex-direction: column; gap: 4px; }
    .severity-item { display: flex; justify-content: space-between; align-items: center; }
    .severity-label { color: #666; }
    .severity-count { font-weight: 600; }
    .severity-count.critical { color: #dc3545; }
    .severity-count.serious { color: #fd7e14; }
    .severity-count.moderate { color: #ffc107; }
    .stories { padding: 20px; }
    .component-group { margin-bottom: 30px; }
    .component-header { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; font-size: 18px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
    .component-stats { font-size: 14px; font-weight: normal; opacity: 0.95; }
    .component-content { border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden; }
    .story-card { background: white; border-bottom: 1px solid #e0e0e0; }
    .story-card:last-child { border-bottom: none; }
    .story-header { padding: 15px 20px; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
    .story-header:hover { background: #e9ecef; }
    .story-title { font-weight: 600; color: #333; }
    .story-variant { font-size: 14px; color: #666; margin-left: 10px; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-left: 10px; }
    .badge.pa11y { background: #fff3cd; color: #856404; }
    .badge.axe { background: #d1ecf1; color: #0c5460; }
    .story-content { padding: 20px; display: none; }
    .story-content.show { display: block; }
    .issue-section { margin-bottom: 25px; }
    .issue-section h4 { font-size: 16px; color: #333; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e0e0e0; }
    .issue { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #dc3545; }
    .issue.warning { border-left-color: #ffc107; }
    .issue.notice { border-left-color: #17a2b8; }
    .issue.moderate { border-left-color: #ffc107; }
    .issue.minor { border-left-color: #17a2b8; }
    .issue-title { font-weight: 600; color: #333; margin-bottom: 8px; }
    .issue-meta { display: flex; gap: 15px; flex-wrap: wrap; margin-top: 8px; font-size: 12px; color: #666; }
    .issue-meta span { display: flex; align-items: center; gap: 5px; }
    .issue-description { margin-top: 10px; color: #555; font-size: 14px; line-height: 1.5; }
    .issue-code { background: #2d2d2d; color: #f8f8f2; padding: 10px; border-radius: 4px; margin-top: 8px; font-family: 'Courier New', monospace; font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
    .impact-critical { color: #dc3545; font-weight: bold; }
    .impact-serious { color: #fd7e14; font-weight: bold; }
    .impact-moderate { color: #ffc107; font-weight: bold; }
    .impact-minor { color: #17a2b8; font-weight: bold; }
    .no-issues { text-align: center; padding: 40px; color: #28a745; font-size: 18px; }
    .no-issues::before { content: "✓"; font-size: 48px; display: block; margin-bottom: 10px; }
    .filter-bar { padding: 20px; background: #fff; border-bottom: 1px solid #e0e0e0; display: flex; gap: 10px; align-items: center; }
    .filter-btn { padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; font-size: 14px; }
    .filter-btn.active { background: #667eea; color: white; border-color: #667eea; }
    .filter-btn:hover { background: #f8f9fa; }
    .filter-btn.active:hover { background: #5568d3; }    .search-box { padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; min-width: 250px; }
    .search-box:focus { outline: none; border-color: #667eea; }
    .pr-link { display: inline-block; margin-left: 15px; padding: 8px 16px; background: #28a745; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; }
    .pr-link:hover { background: #218838; }
    .hidden { display: none !important; }  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔍 Accessibility Test Report</h1>
      <div class="timestamp">Generated: ${timestamp}${prNumber ? ` • PR #${prNumber}` : ''}</div>
      <div class="status">${statusText}</div>
      ${prUrl ? `<a href="${prUrl}" class="pr-link" target="_blank" rel="noopener">View Pull Request #${prNumber}</a>` : ''}
    </div>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total Stories</h3>
        <div class="number">${summary.totalStories}</div>
        <div class="label">Tested</div>
      </div>
      <div class="summary-card">
        <h3>Total Issues</h3>
        <div class="number" style="color: ${totalIssues > 0 ? '#dc3545' : '#28a745'}">${totalIssues}</div>
        <div class="label">Found</div>
        <div class="severity-breakdown">
          <div class="severity-item">
            <span class="severity-label">🔴 Critical/Error:</span>
            <span class="severity-count critical">${summary.severity.critical}</span>
          </div>
          <div class="severity-item">
            <span class="severity-label">🟠 Serious/Warning:</span>
            <span class="severity-count serious">${summary.severity.serious}</span>
          </div>
          <div class="severity-item">
            <span class="severity-label">🟡 Moderate/Notice:</span>
            <span class="severity-count moderate">${summary.severity.moderate}</span>
          </div>
        </div>
      </div>
      <div class="summary-card">
        <h3>Pa11y Issues</h3>
        <div class="number" style="color: ${summary.pa11y.totalIssues > 0 ? '#ffc107' : '#28a745'}">${summary.pa11y.totalIssues}</div>
        <div class="label">${summary.pa11y.storiesWithIssues} stories affected</div>
      </div>
      <div class="summary-card">
        <h3>Axe Violations</h3>
        <div class="number" style="color: ${summary.axeCore.totalViolations > 0 ? '#17a2b8' : '#28a745'}">${summary.axeCore.totalViolations}</div>
        <div class="label">${summary.axeCore.storiesWithViolations} stories affected</div>
      </div>
    </div>

    <div class="filter-bar">
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="font-weight: 600;">Severity:</span>
        <button class="filter-btn active" onclick="filterStories('all')">All Issues</button>
        <button class="filter-btn" onclick="filterStories('critical')">Critical/Error</button>
        <button class="filter-btn" onclick="filterStories('serious')">Serious/Warning</button>
        <button class="filter-btn" onclick="filterStories('moderate')">Moderate/Notice</button>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="font-weight: 600;">Search Component:</span>
        <input type="text" class="search-box" id="componentSearch" placeholder="Type to filter components..." oninput="searchComponents()">
      </div>
    </div>

    <div class="stories" id="stories">`;

  // Group stories by component (title)
  const componentGroups = {};
  Object.values(storiesMap).forEach(story => {
    const pa11yResult = story.results.find(r => r.tool === 'pa11y');
    const axeResult = story.results.find(r => r.tool === 'axe-core');
    const hasIssues =
      pa11yResult?.issueCount > 0 || axeResult?.violationCount > 0;

    if (hasIssues) {
      if (!componentGroups[story.title]) {
        componentGroups[story.title] = [];
      }
      componentGroups[story.title].push(story);
    }
  });

  if (Object.keys(componentGroups).length === 0) {
    html +=
      '<div class="no-issues">All stories passed accessibility tests!</div>';
  } else {
    let storyIndex = 0;
    Object.entries(componentGroups).forEach(([componentTitle, stories]) => {
      // Calculate component-level stats
      const totalStories = stories.length;
      const totalPa11yIssues = stories.reduce((sum, story) => {
        const result = story.results.find(r => r.tool === 'pa11y');
        return sum + (result?.issueCount || 0);
      }, 0);
      const totalAxeViolations = stories.reduce((sum, story) => {
        const result = story.results.find(r => r.tool === 'axe-core');
        return sum + (result?.violationCount || 0);
      }, 0);

      // Determine highest severity level for this component
      let hasCritical = false;
      let hasSerious = false;
      let hasModerate = false;

      stories.forEach(story => {
        const pa11yResult = story.results.find(r => r.tool === 'pa11y');
        const axeResult = story.results.find(r => r.tool === 'axe-core');

        if (pa11yResult?.issues) {
          pa11yResult.issues.forEach(issue => {
            if (issue.type === 'error') hasCritical = true;
            else if (issue.type === 'warning') hasSerious = true;
            else if (issue.type === 'notice') hasModerate = true;
          });
        }

        if (axeResult?.violations) {
          axeResult.violations.forEach(violation => {
            if (violation.impact === 'critical') hasCritical = true;
            else if (violation.impact === 'serious') hasSerious = true;
            else if (
              violation.impact === 'moderate' ||
              violation.impact === 'minor'
            )
              hasModerate = true;
          });
        }
      });

      const severityLevels = [];
      if (hasCritical) severityLevels.push('critical');
      if (hasSerious) severityLevels.push('serious');
      if (hasModerate) severityLevels.push('moderate');

      html += `
      <div class="component-group" data-severity="${severityLevels.join(' ')}" data-component="${escapeHtml(componentTitle.toLowerCase())}">
        <div class="component-header">
          <span>${escapeHtml(componentTitle)}</span>
          <span class="component-stats">${totalStories} ${totalStories === 1 ? 'story' : 'stories'} • ${totalPa11yIssues + totalAxeViolations} total issues</span>
        </div>
        <div class="component-content">`;

      stories.forEach(story => {
        const pa11yResult = story.results.find(r => r.tool === 'pa11y');
        const axeResult = story.results.find(r => r.tool === 'axe-core');

        const pa11yCount = pa11yResult?.issueCount || 0;
        const axeCount = axeResult?.violationCount || 0;

        html += `
        <div class="story-card">
          <div class="story-header" onclick="toggleStory(${storyIndex})">
            <div>
              <span class="story-title">${escapeHtml(story.name)}</span>
              ${pa11yCount > 0 ? `<span class="badge pa11y">Pa11y: ${pa11yCount}</span>` : ''}
              ${axeCount > 0 ? `<span class="badge axe">Axe: ${axeCount}</span>` : ''}
            </div>
            <span id="toggle-${storyIndex}">▼</span>
          </div>
          <div class="story-content" id="content-${storyIndex}">`;

        if (pa11yResult && pa11yCount > 0) {
          html += `
          <div class="issue-section">
            <h4>🔶 Pa11y Issues (${pa11yCount})</h4>`;

          pa11yResult.issues.forEach(issue => {
            html += `
            <div class="issue ${issue.type.toLowerCase()}">
              <div class="issue-title">${escapeHtml(issue.message)}</div>
              <div class="issue-meta">
                <span><strong>Type:</strong> ${issue.type}</span>
                <span><strong>Code:</strong> ${issue.code}</span>
              </div>
              ${issue.selector ? `<div class="issue-meta"><span><strong>Selector:</strong> ${escapeHtml(issue.selector)}</span></div>` : ''}
              ${issue.context ? `<div class="issue-code">${escapeHtml(issue.context)}</div>` : ''}
            </div>`;
          });

          html += '</div>';
        }

        if (axeResult && axeCount > 0) {
          html += `
          <div class="issue-section">
            <h4>🔷 Axe-core Violations (${axeCount})</h4>`;

          axeResult.violations.forEach(violation => {
            const impactClass = `impact-${violation.impact}`;
            html += `
            <div class="issue ${violation.impact}">
              <div class="issue-title">${escapeHtml(violation.help)}</div>
              <div class="issue-meta">
                <span><strong>Impact:</strong> <span class="${impactClass}">${violation.impact.toUpperCase()}</span></span>
                <span><strong>Rule ID:</strong> ${violation.id}</span>
                <span><strong>Affected Nodes:</strong> ${violation.nodes}</span>
              </div>
              <div class="issue-description">${escapeHtml(violation.description)}</div>
              <div class="issue-meta" style="margin-top: 10px;">
                <span>📖 <a href="${violation.helpUrl}" target="_blank" rel="noopener">Learn more</a></span>
              </div>
            </div>`;
          });

          html += '</div>';
        }

        html += `
          </div>
        </div>`;

        storyIndex++;
      });

      html += `
        </div>
      </div>`;
    });
  }

  html += `
    </div>
  </div>
  
  <script>
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function toggleStory(index) {
      const content = document.getElementById('content-' + index);
      const toggle = document.getElementById('toggle-' + index);
      if (content.classList.contains('show')) {
        content.classList.remove('show');
        toggle.textContent = '▼';
      } else {
        content.classList.add('show');
        toggle.textContent = '▲';
      }
    }

    let currentFilter = 'all';
    let currentSearch = '';

    function filterStories(filter) {
      currentFilter = filter;
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      applyFilters();
    }

    function searchComponents() {
      currentSearch = document.getElementById('componentSearch').value.toLowerCase();
      applyFilters();
    }

    function applyFilters() {
      const components = document.querySelectorAll('.component-group');
      
      components.forEach(component => {
        const severityLevels = component.getAttribute('data-severity');
        const componentName = component.getAttribute('data-component');
        
        // Check severity filter
        let matchesSeverityFilter = false;
        if (currentFilter === 'all') {
          matchesSeverityFilter = true;
        } else {
          // Check if component has issues of the selected severity
          matchesSeverityFilter = severityLevels && severityLevels.includes(currentFilter);
        }
        
        // Check search filter
        const matchesSearch = !currentSearch || componentName.includes(currentSearch);
        
        // Show/hide based on both filters
        if (matchesSeverityFilter && matchesSearch) {
          component.classList.remove('hidden');
        } else {
          component.classList.add('hidden');
        }
      });
    }

    // Initialize with "All Issues" filter active
    window.addEventListener('DOMContentLoaded', () => {
      applyFilters();
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'a11y-report.html'), html);
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
