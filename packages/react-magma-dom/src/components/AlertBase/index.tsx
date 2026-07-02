import * as React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import {
  InfoIcon,
  CheckCircleIcon,
  WarningIcon,
  ErrorIcon,
  IconProps,
  CloseIcon,
} from 'react-magma-icons';

import { I18nContext, I18nInterface } from '../..';
import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { token, TokenPath } from '../../theme/tokens';
import { useGenerateId } from '../../utils';
import { ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ProgressRing } from '../ProgressRing';

export const VARIANT_ICON: {
  [name: string]: React.FunctionComponent<IconProps>;
} = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
};

export enum AlertVariant {
  info = 'info', //default,
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

interface AlertVariantTokenPaths {
  background: TokenPath;
  border: TokenPath;
  icon: TokenPath;
  inverseBackground: TokenPath;
  inverseBorder: TokenPath;
  inverseIcon: TokenPath;
  inverseLink: TokenPath;
  inverseLinkHover: TokenPath;
  link: TokenPath;
  linkHover: TokenPath;
}

const ALERT_TOKEN_PATHS: Record<AlertVariant, AlertVariantTokenPaths> = {
  [AlertVariant.danger]: {
    background: 'components.alert.danger.background',
    border: 'components.alert.danger.border',
    icon: 'components.alert.danger.icon',
    inverseBackground: 'components.alert.danger.inverse.background',
    inverseBorder: 'components.alert.danger.inverse.border',
    inverseIcon: 'components.alert.danger.inverse.icon',
    inverseLink: 'components.alert.danger.inverse.link',
    inverseLinkHover: 'components.alert.danger.inverse.linkHover',
    link: 'components.alert.danger.link',
    linkHover: 'components.alert.danger.linkHover',
  },
  [AlertVariant.info]: {
    background: 'components.alert.info.background',
    border: 'components.alert.info.border',
    icon: 'components.alert.info.icon',
    inverseBackground: 'components.alert.info.inverse.background',
    inverseBorder: 'components.alert.info.inverse.border',
    inverseIcon: 'components.alert.info.inverse.icon',
    inverseLink: 'components.alert.info.inverse.link',
    inverseLinkHover: 'components.alert.info.inverse.linkHover',
    link: 'components.alert.info.link',
    linkHover: 'components.alert.info.linkHover',
  },
  [AlertVariant.success]: {
    background: 'components.alert.success.background',
    border: 'components.alert.success.border',
    icon: 'components.alert.success.icon',
    inverseBackground: 'components.alert.success.inverse.background',
    inverseBorder: 'components.alert.success.inverse.border',
    inverseIcon: 'components.alert.success.inverse.icon',
    inverseLink: 'components.alert.success.inverse.link',
    inverseLinkHover: 'components.alert.success.inverse.linkHover',
    link: 'components.alert.success.link',
    linkHover: 'components.alert.success.linkHover',
  },
  [AlertVariant.warning]: {
    background: 'components.alert.warning.background',
    border: 'components.alert.warning.border',
    icon: 'components.alert.warning.icon',
    inverseBackground: 'components.alert.warning.inverse.background',
    inverseBorder: 'components.alert.warning.inverse.border',
    inverseIcon: 'components.alert.warning.inverse.icon',
    inverseLink: 'components.alert.warning.inverse.link',
    inverseLinkHover: 'components.alert.warning.inverse.linkHover',
    link: 'components.alert.warning.link',
    linkHover: 'components.alert.warning.linkHover',
  },
};

function getAlertVariantTokenPaths(variant?: AlertVariant) {
  return ALERT_TOKEN_PATHS[variant || AlertVariant.info];
}

function cssToken(props: { theme?: unknown }, path: TokenPath): string {
  return token.var(path, { theme: props.theme });
}

export interface AlertBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  additionalContent?: React.ReactNode;
  closeAriaLabel?: string;
  forceDismiss?: () => void;
  hasTimerRing?: boolean;
  id?: string;
  isExiting?: boolean;
  isDismissed?: boolean;
  isDismissible?: boolean;
  dismissibleButtonRef?: React.Ref<HTMLButtonElement>;
  isInverse?: boolean;
  isPaused?: boolean;
  isToast?: boolean;
  onDismiss?: () => void;
  /**
   * @internal
   */
  testId?: string;
  toastDuration?: number;
  variant?: AlertVariant;
}

export const transitionDuration = 500;

export function buildAlertBackground(props) {
  const paths = getAlertVariantTokenPaths(props.variant);

  return cssToken(
    props,
    props.isInverse ? paths.inverseBackground : paths.background
  );
}

export function buildAlertBorder(props) {
  const paths = getAlertVariantTokenPaths(props.variant);

  return cssToken(props, props.isInverse ? paths.inverseBorder : paths.border);
}

export function buildAlertColor(props) {
  const paths = getAlertVariantTokenPaths(props.variant);

  return cssToken(props, props.isInverse ? paths.inverseIcon : paths.icon);
}

export function buildLinkColor(props) {
  const paths = getAlertVariantTokenPaths(props.variant);

  return cssToken(props, props.isInverse ? paths.inverseLink : paths.link);
}

export function buildLinkHoverColor(props) {
  const paths = getAlertVariantTokenPaths(props.variant);

  return cssToken(
    props,
    props.isInverse ? paths.inverseLinkHover : paths.linkHover
  );
}

const StyledAlert = styled.div<AlertBaseProps>`
  align-items: stretch;
  animation: ${props =>
    props.isExiting
      ? `fadeout ${transitionDuration}ms`
      : `fadein ${transitionDuration}ms`};
  display: flex;
  flex-direction: column;
  font-size: ${props => cssToken(props, 'typeScale.size03.fontSize')};
  font-family: ${props => cssToken(props, 'bodyFont')};
  line-height: ${props => cssToken(props, 'typeScale.size03.lineHeight')};
  margin-bottom: ${props => cssToken(props, 'spaceScale.spacing06')};
  max-width: 100%;
  padding: 0;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props => cssToken(props, 'typeScale.size02.fontSize')};
    letter-spacing: ${props =>
      cssToken(props, 'typeScale.size02.letterSpacing')};
    line-height: ${props => cssToken(props, 'typeScale.size02.lineHeight')};
  }

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? cssToken(props, 'semanticColors.focus.inverse')
          : cssToken(props, 'semanticColors.focus.default')};
  }

  ${props =>
    props.isToast &&
    css`
      animation: ${props.isExiting
        ? `slideout ${transitionDuration}ms`
        : `slidein ${transitionDuration}ms`};
      min-width: 375px;
      margin: 0 auto;

      @media (max-width: ${props.theme.breakpoints.small}px) {
        min-width: 0;
        width: 100%;
      }
    `}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slidein {
    from {
      left: -500px;
    }
    to {
      left: 0;
    }
  }

  @keyframes slideout {
    from {
      left: 0;
    }
    to {
      left: -500px;
    }
  }

  a {
    color: ${props => buildLinkColor(props)};
    font-weight: 400;
    text-decoration: underline;
    &:not([disabled]) {
      &:focus,
      &:hover {
        color: ${props => buildLinkHoverColor(props)};
      }
    }
  }
`;

const StyledAlertInner = styled.div<AlertBaseProps>`
  background: ${buildAlertBackground};
  border: 1px solid ${buildAlertBorder};
  border-radius: ${props => cssToken(props, 'borderRadius')};
  color: ${buildAlertColor};
  display: flex;
  position: relative;

  ${props =>
    props.isToast &&
    css`
      box-shadow: ${props.isInverse
        ? `0 2px 8px 0 ${transparentize(0.3, props.theme.colors.neutral900)}`
        : `0 2px 8px 0 ${transparentize(0.6, props.theme.colors.neutral900)}`};
      padding-right: 0;
      height: ${cssToken(props, 'spaceScale.spacing11')};
    `}
`;

const AlertContents = styled.div<{
  additionalContent?: React.ReactNode;
  isDismissible?: boolean;
}>`
  align-items: ${props => (props.additionalContent ? 'center' : '')};
  align-self: center;
  flex-grow: 1;
  font-family: ${props => cssToken(props, 'bodyFont')};
  padding: ${props => cssToken(props, 'spaceScale.spacing04')} 0;
  display: ${props => (props.additionalContent ? 'flex' : '')};
  margin-right: ${props =>
    !props.isDismissible ? cssToken(props, 'spaceScale.spacing03') : ''};
  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding-left: 0;
  }
`;

export const AdditionalContentWrapper = styled.div`
  flex: 1 0 auto;
  justify-content: flex-end;
  display: flex;
  margin-left: ${props => cssToken(props, 'spaceScale.spacing05')};
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  margin-right: 1px;
`;

const IconWrapper = styled.span<{ isToast?: boolean; theme: ThemeInterface }>`
  ${IconWrapperStyles}
  padding: 0 ${props => cssToken(props, 'spaceScale.spacing03')} 0 ${props =>
    cssToken(props, 'spaceScale.spacing04')};

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding: 0 ${props => cssToken(props, 'spaceScale.spacing03')};
    svg {
      width: 20px;
    }
  }
`;

const ProgressRingWrapper = styled.div`
  margin-top: 6px;
  position: absolute;
  top: auto;
  right: ${props => cssToken(props, 'spaceScale.spacing02')};
`;

const DismissibleIconWrapper = styled.span<AlertBaseProps>`
  ${IconWrapperStyles}
  margin-left: ${props =>
    props.additionalContent ? cssToken(props, 'spaceScale.spacing03') : ''};
`;

const whitelistProps = ['icon', 'isInverse', 'theme', 'variant'];

const shouldForwardProp = prop => {
  return isPropValid(prop) || whitelistProps.includes(prop);
};

const DismissButton = styled(IconButton, { shouldForwardProp })<{
  alertVariant?: AlertVariant;
  isInverse?: boolean;
  isToast?: boolean;
}>`
  align-self: stretch;
  border-radius: 0 ${props => cssToken(props, 'borderRadius')}
    ${props => cssToken(props, 'borderRadius')} 0;
  color: inherit;
  height: auto;
  margin: ${props => (props.isToast ? '4px' : '0 -1px 0 0')};
  padding: ${props =>
    props.isToast
      ? `0 ${cssToken(props, 'spaceScale.spacing04')}`
      : `0 ${cssToken(props, 'spaceScale.spacing03')}`};
  width: auto;
  &:not(:disabled):hover {
    background: none;
    color: inherit;
  }
  &:focus:not(:disabled) {
    background: none;
    color: inherit;
    outline: 2px solid
      ${props =>
        props.isInverse
          ? cssToken(props, 'semanticColors.focus.inverse')
          : cssToken(props, 'semanticColors.focus.default')};
    outline-offset: 0 !important;
  }
  &:not(:disabled):active {
    background: none;
    color: inherit;
  }
`;

const AlertSpan = styled.span`
  white-space: pre-line;
`;

export function getAriaLabelIcon(variant: string, i18n: I18nInterface): string {
  switch (variant) {
    case 'success':
      return i18n.alertVariants.success;
    case 'warning':
      return i18n.alertVariants.warning;
    case 'danger':
      return i18n.alertVariants.danger;
    default:
      return i18n.alertVariants.info;
  }
}

function renderIcon(
  variant = 'info',
  isToast?: boolean,
  theme?: ThemeInterface,
  i18n?: I18nInterface
) {
  const Icon = VARIANT_ICON[variant];

  return (
    <IconWrapper
      aria-label={getAriaLabelIcon(variant, i18n)}
      role="img"
      isToast={isToast}
      theme={theme}
    >
      <Icon size={theme.iconSizes.medium} />
    </IconWrapper>
  );
}

export const AlertBase = React.forwardRef<HTMLDivElement, AlertBaseProps>(
  (props, ref) => {
    const {
      additionalContent,
      children,
      closeAriaLabel,
      forceDismiss,
      hasTimerRing,
      id: defaultId,
      isDismissed,
      isDismissible,
      dismissibleButtonRef,
      isExiting: externalIsExiting,
      isPaused,
      isToast,
      onDismiss,
      testId,
      toastDuration,
      variant,
      ...other
    } = props;

    const id = useGenerateId(defaultId);
    const [isExiting, setIsExiting] = React.useState(false);

    const isInverse = useIsInverse(props.isInverse);

    React.useEffect(() => {
      if (isExiting) {
        setTimeout(() => {
          setIsExiting(false);
          onDismiss && typeof onDismiss === 'function' && onDismiss();
        }, transitionDuration - 300);
      }
    }, [isExiting]);

    React.useEffect(() => {
      if (isDismissed) {
        handleDismiss();
      }
    }, [isDismissed]);

    function handleDismiss() {
      setIsExiting(true);
    }

    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);

    function progressRingColor() {
      if (isInverse) {
        return theme.colors.neutral100;
      }
      switch (props.variant) {
        case 'success':
          return theme.colors.success500;
        case 'warning':
          return theme.colors.warning500;
        case 'danger':
          return theme.colors.danger500;
        default:
          return theme.colors.info500;
      }
    }

    return (
      <StyledAlert
        {...other}
        data-testid={testId}
        id={id}
        tabIndex={-1}
        isInverse={isInverse}
        isExiting={isExiting}
        isToast={isToast}
        ref={ref}
        theme={theme}
        variant={variant}
      >
        <InverseContext.Provider value={{ isInverse }}>
          <StyledAlertInner
            isInverse={isInverse}
            isToast={isToast}
            theme={theme}
            variant={variant}
          >
            {renderIcon(variant, isToast, theme, i18n)}
            <AlertContents
              additionalContent={additionalContent}
              isDismissible={isDismissible}
              theme={theme}
            >
              <AlertSpan>{children}</AlertSpan>
              {additionalContent && (
                <AdditionalContentWrapper theme={theme}>
                  {additionalContent}
                </AdditionalContentWrapper>
              )}
            </AlertContents>
            {isDismissible && (
              <DismissibleIconWrapper
                isInverse={isInverse}
                variant={variant}
                theme={theme}
              >
                {hasTimerRing && isToast && (
                  <ProgressRingWrapper theme={theme}>
                    <ProgressRing
                      color={progressRingColor()}
                      isActive={!isPaused}
                      duration={toastDuration}
                    />
                  </ProgressRingWrapper>
                )}
                {/* @ts-ignore */}
                <DismissButton
                  ref={dismissibleButtonRef}
                  alertVariant={variant}
                  {...(isToast
                    ? { title: closeAriaLabel || i18n.alert.dismissAriaLabel }
                    : {
                        'aria-label':
                          closeAriaLabel || i18n.alert.dismissAriaLabel,
                      })}
                  icon={
                    <CloseIcon
                      size={
                        hasTimerRing
                          ? theme.iconSizes.xSmall
                          : theme.iconSizes.small
                      }
                    />
                  }
                  isInverse={isInverse}
                  isToast={isToast}
                  onClick={forceDismiss || handleDismiss}
                  theme={theme}
                  variant={ButtonVariant.link}
                />
              </DismissibleIconWrapper>
            )}
          </StyledAlertInner>
        </InverseContext.Provider>
      </StyledAlert>
    );
  }
);
