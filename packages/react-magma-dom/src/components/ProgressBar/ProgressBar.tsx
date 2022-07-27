import * as React from 'react';
import { css } from '@emotion/core';
import { Marker, MarkerProps } from './Marker';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { convertStyleValueToString, useGenerateId } from '../../utils';
import { useDimensions } from '../../hooks/useDimensions';
import { useForkedRef } from '../../utils';
import { useIsInverse } from '../../inverse';
import { VisuallyHidden } from '../VisuallyHidden';
import { transparentize } from 'polished';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The color variant of the progress bar
   * @default ProgressBarColor.primary
   */
  color?: ProgressBarColor;
  /**
   * The height of the progress bar. Can be a string or number; if number is provided height is in px
   * @default 8
   */
  height?: number | string;
  /**
   * The axis direction of the progress bar.
   * @default horizontal
   */
  direction?: ProgressBarDirection;
  /**
   * If true, the progress bar will have a disabled state and styling to match
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the progress bar with have a shimmer animation
   * @default false
   */
  isAnimated?: boolean;
  isInverse?: boolean;
  /**
   * @internal
   */
  isLoadingIndicator?: boolean;
  /**
   * If true, the label with the percentage value will display to the right of the progress bar
   * @default false
   */
  isLabelVisible?: boolean;
  /**
   * TODO
   */
  marks?: Array<Omit<MarkerProps, 'trackLength'>>;
  /**
   * The offset percentage before which the bar is filled
   * @default 0
   */
  offset?: number;
  /**
   * The percentage of which the bar is filled
   * @default 0
   */
  percentage?: number;
  testId?: string;
  theme?: any;
  transitionDuration?: number;
  /**
   * The width of the progress bar. Can be a string or number; if number is provided width is in px
   * @default 100%
   */
  width?: number | string;
}

export enum ProgressBarColor {
  danger = 'danger',
  primary = 'primary', // default
  success = 'success',
}

export enum ProgressBarDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

function buildProgressBarBackground(props) {
  if (props.isInverse) {
    switch (props.color) {
      case 'danger':
        return props.theme.colors.danger200;
      case 'success':
        return props.theme.colors.success200;
      default:
        return props.theme.colors.tertiary;
    }
  }
  switch (props.color) {
    case 'danger':
      return props.theme.colors.danger;
    case 'success':
      return props.theme.colors.success;
    default:
      return props.theme.colors.primary;
  }
}

const Container = styled.div<{ isLoadingIndicator?: boolean }>`
  align-items: center;
  display: ${props => (props.isLoadingIndicator ? 'block' : 'flex')};
`;

const Track = styled.div<ProgressBarProps>`
  background: ${props =>
    props.isInverse
      ? transparentize(0.75, props.theme.colors.neutral900)
      : props.theme.colors.neutral100};
  box-shadow: inset 0 0 0 1px
    ${props =>
      props.isInverse
        ? transparentize(0.5, props.theme.colors.neutral100)
        : props.theme.colors.neutral};
  border-radius: 50em;
  overflow: hidden;
  display: flex;
  height: ${props => props.height};
  min-height: ${props =>
    props.direction === ProgressBarDirection.vertical ? '50px' : 'inherit'};
  /* padding: 1px; */
  width: ${props =>
    props.direction === ProgressBarDirection.vertical ? '8px' : props.width};
`;

const Bar = styled.div<ProgressBarProps>`
  background: ${props => buildProgressBarBackground(props)};
  border-radius: 50em;
  display: flex;
  transition: width 0.3s;
  left: ${props =>
    props.direction === ProgressBarDirection.vertical ? '0' : props.offset}%;
  position: relative;
  transition: width ${props => props.transitionDuration}s;
  width: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? '100'
      : props.percentage}%;
  top: ${props =>
    props.direction === ProgressBarDirection.vertical
      ? props => props.percentage
      : 'inherit'}%;

  ${props =>
    props.isAnimated &&
    css`
      background-image: linear-gradient(
        to right,
        ${buildProgressBarBackground(props)} 0%,
        rgba(255, 255, 255, 0.5) 20%,
        ${buildProgressBarBackground(props)} 40%,
        ${buildProgressBarBackground(props)} 100%
      );
      background-repeat: no-repeat;
      background-size: 1800px 104px;
      display: inline-block;
      position: relative;

      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeholderShimmer;
      animation-timing-function: linear;

      @keyframes placeholderShimmer {
        0% {
          background-position: -600px 0;
        }

        100% {
          background-position: 600px 0;
        }
      }
    `}
`;

const Percentage = styled.span`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-left: ${props => props.theme.spaceScale.spacing03};
`;

const TopPercentage = styled.div`
  font-size: ${props => props.theme.typeScale.size05.fontSize};
  line-height: ${props => props.theme.typeScale.size05.lineHeight};
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
  text-align: center;
`;

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, forwardedRef) => {
    const {
      children,
      color,
      direction,
      disabled,
      height,
      id: defaultId,
      isAnimated,
      isLabelVisible,
      isLoadingIndicator,
      marks = [],
      offset = 0,
      percentage,
      testId,
      transitionDuration = 0.3,
      width,
      ...other
    } = props;

    const id = useGenerateId(defaultId);
    const labelId = `${id}__label`;

    const percentageValue = percentage ? percentage : 0;

    const theme = React.useContext(ThemeContext);

    const heightString = convertStyleValueToString(
      height,
      theme.spaceScale.spacing03
    );

    const widthString = convertStyleValueToString(width, `100%`);

    const isInverse = useIsInverse(props.isInverse);

    const [progressBarRef, progressBarDimensions] = useDimensions();
    const ref = useForkedRef(forwardedRef, progressBarRef);

    return (
      <Container
        {...other}
        id={defaultId}
        isLoadingIndicator={isLoadingIndicator}
      >
        {isLoadingIndicator && (
          <TopPercentage theme={theme}>{percentageValue}%</TopPercentage>
        )}
        <Track
          data-testid={testId}
          direction={direction}
          disabled={disabled}
          height={heightString}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
          width={widthString}
        >
          <Bar
            aria-labelledby={labelId}
            aria-valuenow={percentageValue}
            aria-valuemin={0}
            aria-valuemax={100}
            color={color}
            direction={direction}
            disabled={disabled}
            isAnimated={isAnimated}
            isInverse={isInverse}
            offset={offset}
            percentage={percentageValue}
            role="progressbar"
            theme={theme}
            transitionDuration={transitionDuration}
          />
          {marks.map(props => (
            <Marker
              direction={direction}
              trackLength={progressBarDimensions.width}
              isInverse={isInverse}
              theme={theme}
              {...props}
            />
          ))}
        </Track>
        {isLabelVisible ? (
          <Percentage id={labelId} theme={theme}>
            {percentageValue}%
          </Percentage>
        ) : (
          <VisuallyHidden id={labelId}>{percentageValue}%</VisuallyHidden>
        )}
      </Container>
    );
  }
);
