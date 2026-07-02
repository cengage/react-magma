import { magma, ThemeInterface, TypeScaleSize } from './magma';

type PrimitiveTokenValue = string | number;
type TokenObject = Record<string, unknown>;

type JoinPath<Prefix extends string, Path extends string> = `${Prefix}.${Path}`;

type PrimitiveLeafPath<T> = {
  [Key in Extract<keyof T, string>]: NonNullable<
    T[Key]
  > extends PrimitiveTokenValue
    ? Key
    : NonNullable<T[Key]> extends readonly unknown[]
      ? never
      : NonNullable<T[Key]> extends (...args: unknown[]) => unknown
        ? never
        : NonNullable<T[Key]> extends object
          ? JoinPath<Key, PrimitiveLeafPath<NonNullable<T[Key]>>>
          : never;
}[Extract<keyof T, string>];

export interface SemanticStatusColorTokens {
  border: string;
  icon: string;
  inverseBorder: string;
  inverseIcon: string;
  inverseLink: string;
  inverseSurface: string;
  link: string;
  linkHover: string;
  surface: string;
  text: string;
}

export interface SemanticColorTokens {
  border: {
    default: string;
    inverse: string;
  };
  focus: {
    default: string;
    inverse: string;
  };
  status: {
    danger: SemanticStatusColorTokens;
    info: SemanticStatusColorTokens;
    success: SemanticStatusColorTokens;
    warning: SemanticStatusColorTokens;
  };
  surface: {
    default: string;
    inverse: string;
    subtle: string;
  };
  text: {
    default: string;
    inverse: string;
    inverseLink: string;
    inverseLinkHover: string;
    link: string;
    linkHover: string;
    muted: string;
  };
}

export interface ComponentAlertVariantTokens {
  background: string;
  border: string;
  icon: string;
  inverse: {
    background: string;
    border: string;
    icon: string;
    link: string;
    linkHover: string;
  };
  link: string;
  linkHover: string;
}

export interface ComponentButtonSizeTokens {
  fontSize: string;
  height: string;
  letterSpacing: string;
  lineHeight: string;
  minWidth: string;
  padding: string;
}

export interface ComponentButtonTokens {
  borderRadius: string;
  focus: {
    outlineColor: string;
    inverseOutlineColor: string;
  };
  fontFamily: string;
  size: {
    large: ComponentButtonSizeTokens;
    medium: ComponentButtonSizeTokens;
    small: ComponentButtonSizeTokens;
  };
}

export interface ComponentTokens {
  alert: {
    danger: ComponentAlertVariantTokens;
    info: ComponentAlertVariantTokens;
    success: ComponentAlertVariantTokens;
    warning: ComponentAlertVariantTokens;
  };
  button: ComponentButtonTokens;
}

interface TooltipTokenContract {
  arrowSize: string;
  arrowSizeDoubled: string;
  backgroundColor: string;
  fontWeight: number | string;
  inverse: {
    backgroundColor: string;
    textColor: string;
  };
  maxWidth: string;
  textColor: string;
  typeScale: TypeScaleSize;
  zIndex: number;
}

interface ThemeCssTokenContract {
  appBar: ThemeInterface['appBar'];
  bodyExpressiveFont: string;
  bodyFont: string;
  bodyNarrativeFont: string;
  borderRadius: string;
  borderRadiusSmall: string;
  colors: ThemeInterface['colors'];
  combobox: ThemeInterface['combobox'];
  components: ComponentTokens;
  drawer: ThemeInterface['drawer'];
  dropdown: ThemeInterface['dropdown'];
  headingExpressiveFont: string;
  headingFont: string;
  headingNarrativeFont: string;
  iconSizes: ThemeInterface['iconSizes'];
  modal: ThemeInterface['modal'];
  select: ThemeInterface['select'];
  semanticColors: SemanticColorTokens;
  spaceScale: ThemeInterface['spaceScale'];
  tabs: ThemeInterface['tabs'];
  tooltip: TooltipTokenContract;
  typeScale: ThemeInterface['typeScale'];
  typographyExpressiveVisualStyles: ThemeInterface['typographyExpressiveVisualStyles'];
  typographyNarrativeVisualStyles: ThemeInterface['typographyNarrativeVisualStyles'];
  typographyVisualStyles: ThemeInterface['typographyVisualStyles'];
}

export type TokenPath = PrimitiveLeafPath<ThemeCssTokenContract>;

export interface TokenVarOptions {
  cssVarsPrefix?: string;
  fallback?: PrimitiveTokenValue | false;
  theme?: unknown;
}

export interface CssVarDeclarationOptions {
  cssVarsPrefix?: string;
}

const DEFAULT_CSS_VARS_PREFIX = 'magma';

const CSS_VARIABLE_ROOT_KEYS = [
  'appBar',
  'bodyExpressiveFont',
  'bodyFont',
  'bodyNarrativeFont',
  'borderRadius',
  'borderRadiusSmall',
  'colors',
  'combobox',
  'components',
  'drawer',
  'dropdown',
  'headingExpressiveFont',
  'headingFont',
  'headingNarrativeFont',
  'iconSizes',
  'modal',
  'select',
  'semanticColors',
  'spaceScale',
  'tabs',
  'tooltip',
  'typeScale',
  'typographyExpressiveVisualStyles',
  'typographyNarrativeVisualStyles',
  'typographyVisualStyles',
] as const;

const pathSegmentsCache = new Map<string, string[]>();
const varNameCache = new Map<string, string>();

function getPathSegments(path: string): string[] {
  let cached = pathSegmentsCache.get(path);

  if (!cached) {
    cached = path.split('.');
    pathSegmentsCache.set(path, cached);
  }

  return cached;
}

function normalizeSegment(segment: string): string {
  const aliased = segment === 'colors' ? 'color' : segment;

  return aliased
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();
}

function normalizeCssVarsPrefix(cssVarsPrefix = DEFAULT_CSS_VARS_PREFIX) {
  return cssVarsPrefix.replace(/^--/, '').replace(/-+$/, '');
}

function getCssVarPrefix(cssVarsPrefix?: string) {
  const normalized = normalizeCssVarsPrefix(cssVarsPrefix);

  return normalized ? `--${normalized}` : '--';
}

export function pathToCssVarName(
  path: string,
  options: CssVarDeclarationOptions | string = {}
): string {
  const cssVarsPrefix =
    typeof options === 'string' ? options : options.cssVarsPrefix;
  const cacheKey = `${cssVarsPrefix || DEFAULT_CSS_VARS_PREFIX}:${path}`;
  let cached = varNameCache.get(cacheKey);

  if (!cached) {
    const prefix = getCssVarPrefix(cssVarsPrefix);
    const separator = prefix === '--' ? '' : '-';

    cached = `${prefix}${separator}${getPathSegments(path)
      .map(normalizeSegment)
      .join('-')}`;
    varNameCache.set(cacheKey, cached);
  }

  return cached;
}

function isTokenObject(value: unknown): value is TokenObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function getPathValue(source: unknown, path: string): unknown {
  let current: unknown = source;

  for (const key of getPathSegments(path)) {
    if (!isTokenObject(current)) return undefined;
    current = current[key];
  }

  return current;
}

function getPrimitiveValue(
  source: unknown,
  path: string,
  fallbackSource: unknown = magma
): string {
  const value = getPathValue(source, path);

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  const fallback = getPathValue(fallbackSource, path);

  if (typeof fallback === 'string' || typeof fallback === 'number') {
    return String(fallback);
  }

  return '';
}

function mergeTokenObjects<T extends TokenObject>(
  base: T,
  override: unknown
): T {
  if (!isTokenObject(override)) return base;

  const result: TokenObject = { ...base };

  for (const key of Object.keys(override)) {
    const baseValue = base[key];
    const overrideValue = override[key];

    result[key] =
      isTokenObject(baseValue) && isTokenObject(overrideValue)
        ? mergeTokenObjects(baseValue, overrideValue)
        : overrideValue;
  }

  return result as T;
}

function createStatusTokens(
  theme: unknown,
  status: keyof SemanticColorTokens['status']
) {
  const colorPath = `colors.${status}`;

  return {
    border: getPrimitiveValue(theme, `${colorPath}500`),
    icon: getPrimitiveValue(theme, `${colorPath}500`),
    inverseBorder: getPrimitiveValue(
      theme,
      status === 'danger' ? 'colors.danger200' : `${colorPath}300`
    ),
    inverseIcon: getPrimitiveValue(theme, 'colors.neutral100'),
    inverseLink: getPrimitiveValue(
      theme,
      status === 'danger' ? 'colors.danger200' : `${colorPath}200`
    ),
    inverseSurface: getPrimitiveValue(theme, `${colorPath}700`),
    link: getPrimitiveValue(theme, `${colorPath}700`),
    linkHover: getPrimitiveValue(theme, colorPath),
    surface: getPrimitiveValue(theme, `${colorPath}100`),
    text: getPrimitiveValue(theme, `${colorPath}500`),
  };
}

function createDefaultTokenExtensions(theme: unknown) {
  const semanticColors: SemanticColorTokens = {
    border: {
      default: getPrimitiveValue(theme, 'colors.border'),
      inverse: getPrimitiveValue(theme, 'colors.borderInverse'),
    },
    focus: {
      default: getPrimitiveValue(theme, 'colors.focus'),
      inverse: getPrimitiveValue(theme, 'colors.focusInverse'),
    },
    status: {
      danger: createStatusTokens(theme, 'danger'),
      info: createStatusTokens(theme, 'info'),
      success: createStatusTokens(theme, 'success'),
      warning: createStatusTokens(theme, 'warning'),
    },
    surface: {
      default: getPrimitiveValue(theme, 'colors.neutral100'),
      inverse: getPrimitiveValue(theme, 'colors.primary600'),
      subtle: getPrimitiveValue(theme, 'colors.neutral200'),
    },
    text: {
      default: getPrimitiveValue(theme, 'colors.neutral'),
      inverse: getPrimitiveValue(theme, 'colors.neutral100'),
      inverseLink: getPrimitiveValue(theme, 'colors.tertiary'),
      inverseLinkHover: getPrimitiveValue(theme, 'colors.neutral100'),
      link: getPrimitiveValue(theme, 'colors.primary'),
      linkHover: getPrimitiveValue(theme, 'colors.primary700'),
      muted: getPrimitiveValue(theme, 'colors.neutral500'),
    },
  };

  const alert = {
    danger: {
      background: semanticColors.status.danger.surface,
      border: semanticColors.status.danger.border,
      icon: semanticColors.status.danger.icon,
      inverse: {
        background: semanticColors.status.danger.inverseSurface,
        border: semanticColors.status.danger.inverseBorder,
        icon: semanticColors.status.danger.inverseIcon,
        link: semanticColors.status.danger.inverseLink,
        linkHover: semanticColors.text.inverse,
      },
      link: semanticColors.status.danger.link,
      linkHover: semanticColors.status.danger.linkHover,
    },
    info: {
      background: semanticColors.status.info.surface,
      border: semanticColors.status.info.border,
      icon: semanticColors.status.info.icon,
      inverse: {
        background: semanticColors.status.info.inverseSurface,
        border: semanticColors.status.info.inverseBorder,
        icon: semanticColors.status.info.inverseIcon,
        link: semanticColors.status.info.inverseLink,
        linkHover: semanticColors.text.inverse,
      },
      link: semanticColors.status.info.link,
      linkHover: semanticColors.status.info.linkHover,
    },
    success: {
      background: semanticColors.status.success.surface,
      border: semanticColors.status.success.border,
      icon: semanticColors.status.success.icon,
      inverse: {
        background: semanticColors.status.success.inverseSurface,
        border: semanticColors.status.success.inverseBorder,
        icon: semanticColors.status.success.inverseIcon,
        link: semanticColors.status.success.inverseLink,
        linkHover: semanticColors.text.inverse,
      },
      link: semanticColors.status.success.link,
      linkHover: semanticColors.status.success.linkHover,
    },
    warning: {
      background: semanticColors.status.warning.surface,
      border: semanticColors.status.warning.border,
      icon: semanticColors.status.warning.icon,
      inverse: {
        background: semanticColors.status.warning.inverseSurface,
        border: semanticColors.status.warning.inverseBorder,
        icon: semanticColors.status.warning.inverseIcon,
        link: semanticColors.status.warning.inverseLink,
        linkHover: semanticColors.text.inverse,
      },
      link: semanticColors.status.warning.link,
      linkHover: semanticColors.status.warning.linkHover,
    },
  };

  const smallLetterSpacing = getPrimitiveValue(
    theme,
    'typeScale.size01.letterSpacing'
  );

  const components: ComponentTokens = {
    alert,
    button: {
      borderRadius: getPrimitiveValue(theme, 'borderRadius'),
      focus: {
        inverseOutlineColor: semanticColors.focus.inverse,
        outlineColor: semanticColors.focus.default,
      },
      fontFamily: getPrimitiveValue(theme, 'bodyFont'),
      size: {
        large: {
          fontSize: getPrimitiveValue(theme, 'typeScale.size04.fontSize'),
          height: getPrimitiveValue(theme, 'spaceScale.spacing11'),
          letterSpacing: 'inherit',
          lineHeight: getPrimitiveValue(theme, 'typeScale.size04.lineHeight'),
          minWidth: getPrimitiveValue(theme, 'spaceScale.spacing13'),
          padding: `${getPrimitiveValue(
            theme,
            'spaceScale.spacing04'
          )} ${getPrimitiveValue(theme, 'spaceScale.spacing06')}`,
        },
        medium: {
          fontSize: getPrimitiveValue(theme, 'typeScale.size03.fontSize'),
          height: getPrimitiveValue(theme, 'spaceScale.spacing09'),
          letterSpacing: 'inherit',
          lineHeight: getPrimitiveValue(theme, 'typeScale.size03.lineHeight'),
          minWidth: getPrimitiveValue(theme, 'spaceScale.spacing13'),
          padding: `${getPrimitiveValue(
            theme,
            'spaceScale.spacing04'
          )} ${getPrimitiveValue(theme, 'spaceScale.spacing05')}`,
        },
        small: {
          fontSize: getPrimitiveValue(theme, 'typeScale.size01.fontSize'),
          height: getPrimitiveValue(theme, 'spaceScale.spacing07'),
          letterSpacing:
            smallLetterSpacing === '' ? 'inherit' : smallLetterSpacing,
          lineHeight: getPrimitiveValue(theme, 'typeScale.size01.lineHeight'),
          minWidth: '0',
          padding: `${getPrimitiveValue(
            theme,
            'spaceScale.spacing02'
          )} ${getPrimitiveValue(theme, 'spaceScale.spacing03')}`,
        },
      },
    },
  };

  return {
    components,
    semanticColors,
  };
}

function createThemeTokenContract(theme: unknown): TokenObject {
  const baseTheme: TokenObject = isTokenObject(theme)
    ? theme
    : (magma as unknown as TokenObject);
  const extensions = createDefaultTokenExtensions(baseTheme);

  return {
    ...baseTheme,
    components: mergeTokenObjects(
      extensions.components as unknown as TokenObject,
      baseTheme.components
    ),
    semanticColors: mergeTokenObjects(
      extensions.semanticColors as unknown as TokenObject,
      baseTheme.semanticColors
    ),
  };
}

function resolveTokenValue(theme: unknown, path: string): unknown {
  return getPathValue(createThemeTokenContract(theme), path);
}

function isPrimitiveTokenValue(value: unknown): value is PrimitiveTokenValue {
  return typeof value === 'string' || typeof value === 'number';
}

function collectCssVarDeclarations(
  value: unknown,
  path: string[],
  out: string[],
  options: CssVarDeclarationOptions
): void {
  if (path.length === 0) {
    for (const key of CSS_VARIABLE_ROOT_KEYS) {
      collectCssVarDeclarations(
        (value as TokenObject)[key],
        [key],
        out,
        options
      );
    }

    return;
  }

  if (value === null || value === undefined) return;

  if (isPrimitiveTokenValue(value)) {
    out.push(`${pathToCssVarName(path.join('.'), options)}: ${String(value)};`);

    return;
  }

  if (isTokenObject(value)) {
    for (const key of Object.keys(value)) {
      collectCssVarDeclarations(value[key], [...path, key], out, options);
    }
  }
}

export function createCssVarDeclarations(
  theme: unknown,
  options: CssVarDeclarationOptions = {}
): string[] {
  const tokenTheme = createThemeTokenContract(theme);
  const declarations: string[] = [];

  collectCssVarDeclarations(tokenTheme, [], declarations, options);

  return declarations;
}

function tokenVar(path: TokenPath, options: TokenVarOptions = {}): string {
  const varName = pathToCssVarName(path, {
    cssVarsPrefix: options.cssVarsPrefix,
  });

  if (options.fallback === false) {
    return `var(${varName})`;
  }

  const fallback =
    options.fallback !== undefined
      ? options.fallback
      : resolveTokenValue(options.theme || magma, path);

  if (isPrimitiveTokenValue(fallback)) {
    return `var(${varName}, ${String(fallback)})`;
  }

  return `var(${varName})`;
}

function tokenRaw(path: TokenPath, theme: unknown = magma) {
  const value = resolveTokenValue(theme, path);

  return isPrimitiveTokenValue(value) ? value : undefined;
}

function tokenFunction(path: TokenPath, options: TokenVarOptions = {}): string {
  return tokenVar(path, options);
}

export const token = Object.assign(tokenFunction, {
  cssVarName: pathToCssVarName,
  raw: tokenRaw,
  var: tokenVar,
});
