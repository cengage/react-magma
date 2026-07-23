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

  it('does not emit CSS variables by default', () => {
    render(<GlobalStyles />);

    expect(getEmotionStyles()).not.toContain('--magma-color-primary:');
  });

  it('can emit CSS variables under root and host', () => {
    render(<GlobalStyles emitCssVariables />);

    const styles = getEmotionStyles();

    expect(styles).toContain(':where(:root, :host)');
    expect(styles).toContain(
      `--magma-color-primary: var(--magma-color-primary-500, ${magma.colors.primary});`
    );
    expect(styles).toContain(
      `--magma-semantic-colors-status-info-surface: var(--magma-color-info-100, ${magma.colors.info100});`
    );
  });

  it('scopes emitted CSS variables to a selector', () => {
    render(<GlobalStyles emitCssVariables cssVarsRoot='[data-site="acme"]' />);

    const styles = getEmotionStyles();

    expect(styles).toContain('[data-site="acme"]');
    expect(styles).toContain(
      `--magma-color-primary: var(--magma-color-primary-500, ${magma.colors.primary});`
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
        <GlobalStyles emitCssVariables />
      </ThemeContext.Provider>
    );

    expect(getEmotionStyles()).toContain(
      '--magma-components-alert-info-background: var(--magma-semantic-colors-status-info-surface, #eefaff);'
    );
  });
});
