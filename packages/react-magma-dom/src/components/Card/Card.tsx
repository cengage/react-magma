import * as React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

export interface CardProps extends React.LabelHTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * Sets the alignment of the card content
   * @default CardAlignment.left
   */
  align?: CardAlignment;
  /**
   * Color for the background and border-color, set by CSS.
   */
  background?: string;
  /**
   * If a value is passed, the card will be styled as a callout for the specified type.
   * @default none
   */
  calloutType?: CardCalloutType;
  /**
   * Sets the radius size used by the card corners.
   * @default CardBorderRadius.medium
   */
  borderRadius?: CardBorderRadius;
  /**
   * Sets whether all corners are rounded or the top-left corner is square.
   * @default CardCornerTreatment.squareTopLeft
   */
  cornerTreatment?: CardCornerTreatment;
  /**
   * If true, card will render with a box-shadow
   * @default false
   */
  hasDropShadow?: boolean;
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Width of the component, set by CSS.
   */
  width?: string | number;
}

export enum CardAlignment {
  center = 'center',
  left = 'left', // default
  right = 'right',
}

export enum CardCalloutType {
  danger = 'danger',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

export enum CardBorderRadius {
  none = 'none',
  extraSmall = 'extraSmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extraLarge',
}

export enum CardCornerTreatment {
  all = 'all',
  squareTopLeft = 'squareTopLeft',
}

function getCardBorderRadius(props: CardProps & { theme: ThemeInterface }) {
  switch (props.borderRadius) {
    case CardBorderRadius.none:
      return props.theme.borderRadiusNone;
    case CardBorderRadius.extraSmall:
      return props.theme.borderRadiusExtraSmall;
    case CardBorderRadius.medium:
      return props.theme.borderRadiusMedium;
    case CardBorderRadius.large:
      return props.theme.borderRadiusLarge;
    case CardBorderRadius.extraLarge:
      return props.theme.borderRadiusExtraLarge;
    default:
      return props.theme.borderRadiusSmall;
  }
}

function buildCardBorderRadius(props: CardProps & { theme: ThemeInterface }) {
  const radius = getCardBorderRadius(props);

  if (props.calloutType) {
    return `0 ${radius} ${radius} 0`;
  }

  return props.cornerTreatment === CardCornerTreatment.squareTopLeft
    ? `0 ${radius} ${radius} ${radius}`
    : radius;
}

export function buildCalloutBackground(
  props: CardProps & { theme: ThemeInterface }
) {
  if (props.isInverse) {
    switch (props.calloutType) {
      case 'danger':
        return props.theme.colors.red500;
      case 'info':
        return props.theme.colors.blue500;
      case 'success':
        return props.theme.colors.green500;
      case 'warning':
        return props.theme.colors.yellow400;
      default:
        return props.theme.colors.brand.cyan;
    }
  }

  switch (props.calloutType) {
    case 'danger':
      return props.theme.colors.danger;
    case 'info':
      return props.theme.colors.info;
    case 'success':
      return props.theme.colors.success;
    case 'warning':
      return props.theme.colors.yellow400;
    default:
      return props.theme.colors.brand.cyan;
  }
}

function buildCardBoxShadow(props: CardProps & { theme: ThemeInterface }) {
  const shadows = [];

  if (props.calloutType) {
    shadows.push(`inset 4px 0 0 0 ${buildCalloutBackground(props)}`);
  }

  if (props.hasDropShadow) {
    shadows.push('0 2px 6px 0 rgba(0,0,0,0.18)');
  }

  return shadows.length ? shadows.join(', ') : '0 0 0';
}

const StyledCard = styled.div<CardProps>`
  background: ${props =>
    props.background
      ? props.background
      : props.isInverse
        ? props.theme.colors.neutral1100
        : props.theme.colors.neutral0};
  border: 1px solid
    ${props =>
      props.background
        ? props.background
        : props.isInverse
          ? props.theme.colors.neutral800
          : props.theme.colors.neutral200};
  border-left-width: ${props => (props.calloutType ? '0' : '1px')};
  border-radius: ${buildCardBorderRadius};
  box-shadow: ${buildCardBoxShadow};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.neutral700};
  font-family: ${props => props.theme.bodyFont};
  display: flex;
  flex-direction: column;
  overflow: visible;
  padding-left: ${props =>
    props.calloutType ? props.theme.spaceScale.spacing03 : '0'};
  position: relative;
  text-align: ${props => props.align};
  width: ${props => props.width};
`;

interface NavTabsContextInterface {
  isInverse?: boolean;
}

export const CardContext = React.createContext<NavTabsContextInterface>({
  isInverse: false,
});

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      align,
      borderRadius = CardBorderRadius.medium,
      children,
      cornerTreatment = CardCornerTreatment.squareTopLeft,
      testId,
      width,
      ...other
    } = props;

    const isInverse = useIsInverse(props.isInverse);

    const theme = React.useContext(ThemeContext);

    const widthString = width
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : 'auto';

    return (
      <StyledCard
        {...other}
        align={align ? align : CardAlignment.left}
        borderRadius={borderRadius}
        cornerTreatment={cornerTreatment}
        data-testid={testId}
        isInverse={isInverse}
        ref={ref}
        theme={theme}
        width={widthString}
      >
        <CardContext.Provider
          value={{
            isInverse,
          }}
        >
          {children}
        </CardContext.Provider>
      </StyledCard>
    );
  }
);
