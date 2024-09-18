import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { AlertProps } from '../Alert';
import {
  AdditionalContentWrapper,
  AlertVariant,
  buildAlertBackground,
  buildAlertBorder,
  buildAlertColor,
  buildLinkColor,
  buildLinkHoverColor,
  VARIANT_ICON,
} from '../AlertBase';
import { CloseIcon } from 'react-magma-icons';
import { Button, ButtonSize, ButtonVariant, ButtonColor } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface BannerProps extends AlertProps {
  /**
   * The text displayed inside of the action button
   */
  actionButtonText?: string;
  /**
   * Action that fires when the action button is clicked. Must be present for button to appear
   */
  actionButtonOnClick?: () => void;
  /**
   * Enables additional right aligned children within the Banner.
   */
  additionalContent?: React.ReactNode;
  /**
   * If true, the component will be able to be dismissed and will include a close button
   * @default false
   */
  isDismissible?: boolean;
  isInverse?: boolean;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledBanner = typedStyled.div<AlertProps>`
  align-items: stretch;
  background: ${props => buildAlertBackground(props)};
  color: ${props => buildAlertColor(props)};
  display: flex;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  font-family: ${props => props.theme.bodyFont};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  position: relative;
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    text-align: left;
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
    line-height: ${props => props.theme.typeScale.size02.lineHeight};
  }
`;

const BannerContents = styled.div<{
  additionalContent?: React.ReactNode;
  variant?: AlertVariant;
  isDismissible?: boolean;

  isInverse?: boolean;
}>`
  align-items: center;
  border-bottom: 1px solid ${props => buildAlertBorder(props)};
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  padding: ${props =>
    props.additionalContent && props.isDismissible
      ? `${props.theme.spaceScale.spacing04} 0 ${props.theme.spaceScale.spacing04} ${props.theme.spaceScale.spacing04}`
      : props.theme.spaceScale.spacing04};

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    justify-content: flex-start;
  }

  a {
    color: ${props => buildLinkColor(props)};
    font-weight: 400;
    font-family: ${props => props.theme.bodyFont};
    text-decoration: underline;
    &:not([disabled]) {
      &:focus,
      &:hover {
        color: ${props => buildLinkHoverColor(props)};
      }
    }
  }
`;

const ButtonWrapper = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const allowedProps = ['icon', 'isInverse', 'theme', 'variant'];

const shouldForwardProp = prop => {
  return isPropValid(prop) || allowedProps.includes(prop);
};

function buildDismissButtonColor(props) {
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  switch (props.alertVariant) {
    case 'success':
      return props.theme.colors.success500;
    case 'warning':
      return props.theme.colors.warning500;
    case 'danger':
      return props.theme.colors.danger500;
    default:
      return props.theme.colors.info500;
  }
}

const DismissButton = typedStyled(IconButton, { shouldForwardProp })<{
  alertVariant?: AlertVariant;
  isInverse?: boolean;
}>`
  align-self: stretch;
  border-radius: 0;
  color: ${props => buildDismissButtonColor(props)};
  height: auto;
  padding: 0 ${props => props.theme.spaceScale.spacing05};
  width: auto;
  border-bottom: 1px solid
    ${props =>
      buildAlertBorder({
        variant: props.alertVariant,
        theme: props.theme,
        isInverse: props.isInverse,
      })};

  &:not(:disabled) {
    &:hover {
      background: none;
      color: ${props => buildDismissButtonColor(props)};
    }
    &:focus {
      background: none;
      color: ${props => buildDismissButtonColor(props)};
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus};
      outline-offset: 0 !important;
    }
    &:active {
      background: none;
      color: ${props => buildDismissButtonColor(props)};
    }
  }
`;

const IconWrapper = typedStyled.span`
  display: inline-flex;
  padding-right: ${props => props.theme.spaceScale.spacing03};

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    svg {
      width: 20px;
    }
  }
`;

function renderIcon(variant = 'info', theme: any) {
  const Icon = VARIANT_ICON[variant];

  return (
    <IconWrapper theme={theme}>
      <Icon size={theme.iconSizes.medium} />
    </IconWrapper>
  );
}

function getButtonColor(variant: AlertVariant) {
  switch (variant) {
    case 'danger':
      return ButtonColor.danger;
    default:
      return ButtonColor.primary;
  }
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (props, ref) => {
    const {
      actionButtonText,
      actionButtonOnClick,
      additionalContent,
      children,
      closeAriaLabel,
      isDismissible,
      onDismiss,
      testId,
      variant = AlertVariant.info,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const isInverse = useIsInverse(props.isInverse);

    return (
      <StyledBanner
        {...other}
        data-testid={testId}
        ref={ref}
        theme={theme}
        variant={variant}
      >
        <BannerContents
          additionalContent={additionalContent}
          isDismissible={isDismissible}
          theme={theme}
          variant={variant}
          isInverse={isInverse}
        >
          {renderIcon(variant, theme)}
          <span>{children}</span>
          {actionButtonText && actionButtonOnClick && (
            <Button
              color={getButtonColor(variant)}
              isInverse={isInverse}
              onClick={actionButtonOnClick}
              style={{ margin: `0 0 0 ${theme.spaceScale.spacing08}` }}
              size={ButtonSize.small}
            >
              {actionButtonText}
            </Button>
          )}
          {additionalContent && (
            <AdditionalContentWrapper theme={theme}>
              {additionalContent}
            </AdditionalContentWrapper>
          )}
        </BannerContents>

        {isDismissible && (
          <ButtonWrapper color={variant}>
            <DismissButton
              alertVariant={variant}
              aria-label={
                closeAriaLabel ? closeAriaLabel : i18n.alert.dismissAriaLabel
              }
              icon={<CloseIcon size={theme.iconSizes.small} />}
              isInverse={isInverse}
              onClick={onDismiss}
              theme={theme}
              variant={ButtonVariant.link}
            />
          </ButtonWrapper>
        )}
      </StyledBanner>
    );
  }
);
