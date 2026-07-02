import * as React from 'react';

import { Global, SerializedStyles, css } from '@emotion/react';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../ThemeContext';
import { createCssVarDeclarations, token, TokenPath } from '../tokens';

function getGlobalImports() {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
  `;
}

const DEFAULT_CSS_VARS_ROOT = ':where(:root, :host)';

const cssVarDefinitionsCache = new WeakMap<
  object,
  Map<string, SerializedStyles>
>();

function getCssVarDefinitions({
  cssVarsPrefix,
  cssVarsRoot,
  theme,
}: {
  cssVarsPrefix?: string;
  cssVarsRoot: string;
  theme: object;
}): SerializedStyles {
  let themeCache = cssVarDefinitionsCache.get(theme);

  if (!themeCache) {
    themeCache = new Map();
    cssVarDefinitionsCache.set(theme, themeCache);
  }

  const cacheKey = `${cssVarsRoot}|${cssVarsPrefix || ''}`;
  const cached = themeCache.get(cacheKey);

  if (cached) return cached;

  const declarations = createCssVarDeclarations(theme, { cssVarsPrefix });

  const result = css`
    ${cssVarsRoot} {
      ${declarations.join('\n      ')}
    }
  `;

  themeCache.set(cacheKey, result);

  return result;
}

function themeToken(
  theme: unknown,
  path: TokenPath,
  cssVarsPrefix?: string
): string {
  return token.var(path, { cssVarsPrefix, theme });
}

function getStyles(theme, isInverse: boolean, cssVarsPrefix?: string) {
  const t = (path: TokenPath) => themeToken(theme, path, cssVarsPrefix);

  return css`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    *:focus {
      outline: 2px solid
        ${isInverse
          ? t('semanticColors.focus.inverse')
          : t('semanticColors.focus.default')};
      outline-offset: -1px;
    }

    html {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-size: ${t('typeScale.size03.fontSize')};
      line-height: ${t('typeScale.size03.lineHeight')};
      scroll-behavior: smooth;
    }

    html,
    body {
      background: ${isInverse
        ? t('semanticColors.surface.inverse')
        : t('semanticColors.surface.default')};
      color: ${isInverse
        ? t('semanticColors.text.inverse')
        : t('semanticColors.text.default')};
      margin: 0;
      padding: 0;
    }

    body {
      font-family: ${t('bodyFont')};
      font-style: normal;
      font-weight: 400;
      font-size: ${t('typeScale.size03.fontSize')};
      line-height: ${t('typeScale.size03.lineHeight')};
    }

    a {
      color: ${isInverse
        ? t('semanticColors.text.inverseLink')
        : t('semanticColors.text.link')};
      cursor: pointer;
      text-decoration: underline;

      &:hover,
      &:focus {
        color: ${isInverse
          ? t('semanticColors.text.inverseLinkHover')
          : t('semanticColors.text.linkHover')};
      }
      &:focus {
        outline: 2px solid
          ${isInverse
            ? t('semanticColors.focus.inverse')
            : t('semanticColors.focus.default')};
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
   * Emit CSS custom properties for the active theme. Set to `false` if you manage these variables yourself
   * (e.g., via a static stylesheet or another design-token pipeline).
   * @default true
   */
  emitCssVariables?: boolean;
  /**
   * Prefix used for generated CSS custom properties.
   * @default "magma"
   */
  cssVarsPrefix?: string;
  /**
   * Selector where generated CSS custom properties are scoped.
   * @default ":where(:root, :host)"
   */
  cssVarsRoot?: string;
}

export const GlobalStyles: React.FunctionComponent<GlobalStylesProps> = ({
  cssVarsPrefix,
  cssVarsRoot = DEFAULT_CSS_VARS_ROOT,
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
              styles={getCssVarDefinitions({
                cssVarsPrefix,
                cssVarsRoot,
                theme,
              })}
            />
          )}
          <Global styles={getStyles(theme, isInverse, cssVarsPrefix)} />
        </>
      )}
    </ThemeContext.Consumer>
  );
};
