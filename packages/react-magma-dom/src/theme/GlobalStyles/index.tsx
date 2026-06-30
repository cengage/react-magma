import * as React from 'react';

import { Global, SerializedStyles, css } from '@emotion/react';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../ThemeContext';
import { pathToCssVarName } from '../utils/cssVar';

function getGlobalImports() {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
  `;
}

const CSS_VAR_KEYS = [
  'colors',
  'spaceScale',
  'iconSizes',
  'typeScale',
  'borderRadius',
  'borderRadiusSmall',
  'bodyFont',
  'bodyExpressiveFont',
  'bodyNarrativeFont',
  'headingFont',
  'headingExpressiveFont',
  'headingNarrativeFont',
] as const;

function collectCssVarDeclarations(
  value: unknown,
  path: string[],
  out: string[]
): void {
  if (value === null || value === undefined) return;
  if (typeof value === 'string' || typeof value === 'number') {
    out.push(`${pathToCssVarName(path.join('.'))}: ${value};`);

    return;
  }
  if (typeof value === 'object') {
    for (const key of Object.keys(value as Record<string, unknown>)) {
      collectCssVarDeclarations(
        (value as Record<string, unknown>)[key],
        [...path, key],
        out
      );
    }
  }
}

const cssVarDefinitionsCache = new WeakMap<object, SerializedStyles>();

function getCssVarDefinitions(
  theme: Record<string, unknown>
): SerializedStyles {
  const cached = cssVarDefinitionsCache.get(theme);

  if (cached) return cached;

  const declarations: string[] = [];

  for (const key of CSS_VAR_KEYS) {
    collectCssVarDeclarations(theme[key], [key], declarations);
  }

  const result = css`
    :where(:root) {
      ${declarations.join('\n      ')}
    }
  `;

  cssVarDefinitionsCache.set(theme, result);

  return result;
}

function getStyles(theme, isInverse: boolean) {
  return css`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    *:focus {
      outline: 2px solid
        ${isInverse ? theme.colors.focusInverse : theme.colors.focus};
      outline-offset: -1px;
    }

    html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-size: ${theme.typeScale.size03.fontSize};
      line-height: ${theme.typeScale.size03.lineHeight};
      scroll-behavior: smooth;
    }

    html,
    body {
      background: ${isInverse
        ? theme.colors.primary600
        : theme.colors.neutral100};
      color: ${isInverse ? theme.colors.neutral100 : theme.colors.neutral};
      margin: 0;
      padding: 0;
    }

    body {
      font-family: ${theme.bodyFont};
      font-style: normal;
      font-weight: 400;
      font-size: ${theme.typeScale.size03.fontSize};
      line-height: ${theme.typeScale.size03.lineHeight};
    }

    a {
      color: ${isInverse ? theme.colors.tertiary : theme.colors.primary};
      cursor: pointer;
      text-decoration: underline;

      &:hover,
      &:focus {
        color: ${isInverse ? theme.colors.neutral100 : theme.colors.primary700};
      }
      &:focus {
        outline: 2px solid
          ${isInverse ? theme.colors.focusInverse : theme.colors.focus};
        outline-offset: 2px;
      }
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      font: inherit;
      margin: 0;
    }

    svg:not(:root) {
      overflow: hidden;
    }
  `;
}

export interface GlobalStylesProps {
  /**
   * Emit `--magma-*` CSS custom properties for the active theme under
   * `:where(:root)`. Set to `false` if you manage these variables yourself
   * (e.g., via a static stylesheet or another design-token pipeline).
   * @default true
   */
  emitCssVariables?: boolean;
}

export const GlobalStyles: React.FunctionComponent<GlobalStylesProps> = ({
  emitCssVariables = true,
}) => {
  const isInverse = useIsInverse();

  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <Global styles={getGlobalImports()} />
          {emitCssVariables && (
            <Global
              styles={getCssVarDefinitions(theme as Record<string, unknown>)}
            />
          )}
          <Global styles={getStyles(theme, isInverse)} />
        </>
      )}
    </ThemeContext.Consumer>
  );
};
