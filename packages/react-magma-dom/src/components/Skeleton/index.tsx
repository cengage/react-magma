import * as React from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { convertStyleValueToString } from '../../utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional content the skeleton will size itself to match. The children are
   * kept in the layout to reserve their space but are hidden from view.
   * @children optional
   */
  children?: React.ReactNode;
  /**
   * The style of animation played while loading.
   * @default SkeletonAnimation.shimmer
   */
  animation?: SkeletonAnimation;
  /**
   * If true, the animation will play. The animation is always disabled
   * for users who have the `prefers-reduced-motion` setting enabled, regardless
   * of this value.
   * @default true
   */
  hasAnimation?: boolean;
  /**
   * The height of the skeleton. Can be a string or number; if a number is
   * provided the height is in px. Ignored for the `text` variant, whose height
   * is derived from the current font size.
   */
  height?: number | string;
  isInverse?: boolean;
  /**
   * The value passed to the `data-testid` attribute of the rendered element, so
   * it can be targeted in tests (including by consumers of the library).
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * The shape of the skeleton.
   * @default SkeletonVariant.text
   */
  variant?: SkeletonVariant;
  /**
   * The width of the skeleton. Can be a string or number; if a number is
   * provided the width is in px. Defaults to `100%` unless inferred from
   * children.
   */
  width?: number | string;
}

export enum SkeletonVariant {
  circle = 'circle',
  rectangle = 'rectangle',
  rounded = 'rounded',
  text = 'text', // default
}

export enum SkeletonAnimation {
  pulse = 'pulse',
  shimmer = 'shimmer', // default
}

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  60% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

function buildBaseColor(props: SkeletonProps) {
  return props.isInverse
    ? transparentize(0.8, props.theme.colors.neutral100)
    : props.theme.colors.neutral300;
}

function buildShimmerColor(props: SkeletonProps) {
  return props.isInverse
    ? transparentize(0.85, props.theme.colors.neutral100)
    : transparentize(0.35, props.theme.colors.neutral100);
}

function buildBorderRadius(props: SkeletonProps) {
  switch (props.variant) {
    case SkeletonVariant.circle:
      return '50%';
    case SkeletonVariant.rectangle:
      return '0';
    case SkeletonVariant.rounded:
      return props.theme.borderRadius;
    case SkeletonVariant.text:
    default:
      return props.theme.borderRadiusSmall;
  }
}

interface StyledSkeletonProps extends SkeletonProps {
  hasChildren?: boolean;
  heightString?: string;
  widthString?: string;
}

const StyledSkeleton = styled.span<StyledSkeletonProps>`
  background-color: ${props => buildBaseColor(props)};
  border-radius: ${props => buildBorderRadius(props)};
  display: ${props => (props.hasChildren ? 'inline-flex' : 'block')};
  height: ${props => props.heightString};
  overflow: hidden;
  position: relative;
  width: ${props => props.widthString};

  ${props =>
    props.variant === SkeletonVariant.text &&
    !props.hasChildren &&
    css`
      margin-bottom: ${props.theme.spaceScale.spacing02};
      transform-origin: 0 55%;
      transform: scale(1, 0.7);

      &:empty::before {
        content: '\\00a0';
      }
    `}

  ${props =>
    props.hasChildren &&
    css`
      /*
       * Keep children in the layout so the skeleton can size to them, but fully
       * neutralize them.
       */
      & > * {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
    `}

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
      props.hasAnimation &&
      props.animation === SkeletonAnimation.pulse &&
      css`
        animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
      `}

    ${props =>
      props.hasAnimation &&
      props.animation === SkeletonAnimation.shimmer &&
      css`
        &::after {
          animation: ${shimmer} 1.6s linear infinite;
          background-image: linear-gradient(
            90deg,
            transparent,
            ${buildShimmerColor(props)},
            transparent
          );
          bottom: 0;
          content: '';
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(-100%);
        }
      `}
  }
`;

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  (props, ref) => {
    const {
      animation = SkeletonAnimation.shimmer,
      'aria-label': ariaLabel,
      children,
      hasAnimation = true,
      height,
      isInverse: isInverseProp,
      testId,
      variant = SkeletonVariant.text,
      width,
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const hasChildren = React.Children.count(children) > 0;

    function getWidthString() {
      if (width) {
        return convertStyleValueToString(width);
      }

      return hasChildren ? 'auto' : '100%';
    }

    function getHeightString() {
      if (variant === SkeletonVariant.text && !hasChildren) {
        return '1.2em';
      }

      if (height) {
        return convertStyleValueToString(height);
      }

      return 'auto';
    }

    const widthString = getWidthString();
    const heightString = getHeightString();

    return (
      <StyledSkeleton
        {...rest}
        animation={animation}
        aria-busy={ariaLabel ? true : undefined}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        data-testid={testId}
        hasAnimation={hasAnimation}
        hasChildren={hasChildren}
        heightString={heightString}
        isInverse={isInverse}
        ref={ref}
        role={ariaLabel ? 'status' : undefined}
        theme={theme}
        variant={variant}
        widthString={widthString}
      >
        {children}
      </StyledSkeleton>
    );
  }
);
