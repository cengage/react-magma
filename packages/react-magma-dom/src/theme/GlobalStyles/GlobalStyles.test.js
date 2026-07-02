import React from 'react';

import { render } from '@testing-library/react';

import { GlobalStyles } from '.';
import { magma } from '../magma';
import { ThemeContext } from '../ThemeContext';

function getEmotionStyles() {
  return Array.from(document.head.querySelectorAll('style'))
    .map(element => {
      const rules = element.sheet && element.sheet.cssRules;

      if (rules) {
        return Array.from(rules)
          .map(rule => rule.cssText)
          .join('\n');
      }

      return element.textContent;
    })
    .join('\n');
}

describe('GlobalStyles', () => {
  afterEach(() => {
    document.head
      .querySelectorAll('style')
      .forEach(element => element.parentElement.removeChild(element));
  });

  it('should render the global styles', () => {
    const { container } = render(<GlobalStyles />);

    expect(container).toBeInTheDocument();
  });

  it('emits CSS variables under root and host by default', () => {
    render(<GlobalStyles />);

    const styles = getEmotionStyles();

    expect(styles).toContain(':where(:root, :host)');
    expect(styles).toContain(`--magma-color-primary: ${magma.colors.primary};`);
    expect(styles).toContain(
      `--magma-semantic-colors-status-info-surface: ${magma.colors.info100};`
    );
  });

  it('can disable CSS variable emission', () => {
    render(<GlobalStyles emitCssVariables={false} />);

    expect(getEmotionStyles()).not.toContain('--magma-color-primary');
  });

  it('scopes CSS variables and global consumers to a custom prefix', () => {
    render(
      <GlobalStyles cssVarsPrefix="acme" cssVarsRoot='[data-site="acme"]' />
    );

    const styles = getEmotionStyles();

    expect(styles).toContain('[data-site="acme"]');
    expect(styles).toContain(`--acme-color-primary: ${magma.colors.primary};`);
    expect(styles).toContain(
      `outline: 2px solid var(--acme-semantic-colors-focus-default, ${magma.colors.focus})`
    );
  });

  it('derives emitted component variables from the active theme', () => {
    const theme = {
      ...magma,
      colors: {
        ...magma.colors,
        info100: '#eefaff',
      },
    };

    render(
      <ThemeContext.Provider value={theme}>
        <GlobalStyles />
      </ThemeContext.Provider>
    );

    expect(getEmotionStyles()).toContain(
      '--magma-components-alert-info-background: #eefaff;'
    );
  });
});
