import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { convertStyleValueToString, useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';
import { VisuallyHidden } from '../VisuallyHidden';

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
  pop = 'pop',
  pop02 = 'pop02',
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
        return props.theme.colors.dangerInverse;
      case 'success':
        return props.theme.colors.successInverse;
      default:
        return props.theme.colors.primaryInverse;
    }
  }
  switch (props.color) {
    case 'danger':
      return props.theme.colors.danger;
    case 'pop':
      return props.theme.colors.pop;
    case 'pop02':
      return props.theme.colors.pop02;
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
    props.isInverse ? 'rgba(0,0,0,0.25)' : props.theme.colors.neutral08};
  box-shadow: inset 0 0 0 1px
    ${props =>
      props.isInverse
        ? `${props.theme.colors.neutral08}80`
        : props.theme.colors.neutral04};
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
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-left: ${props => props.theme.spaceScale.spacing03};
`;

const TopPercentage = styled.div`
  font-size: ${props => props.theme.typeScale.size05.fontSize};
  line-height: ${props => props.theme.typeScale.size05.lineHeight};
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
  text-align: center;
`;

export const ProgressBarMarker = styled.div<{
  percentage: number;
}>`
  position: absolute;
  left: ${props => props.percentage}%;
  font-size: 14px;
  color: #3f3f3f;
  top: 10px;
  &:before {
    content: '';
    position: absolute;
    height: 4px;
    width: 4px;
    background: gray;
    border-radius: 4px;
    top: -8px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &:last-child {
    left: calc(${props => props.percentage}% - 10px);
  }
`;

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const {
      children,
      color,
      direction,
      height,
      id: defaultId,
      isAnimated,
      isLabelVisible,
      isLoadingIndicator,
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
            isAnimated={isAnimated}
            isInverse={isInverse}
            offset={offset}
            percentage={percentageValue}
            role="progressbar"
            theme={theme}
            transitionDuration={transitionDuration}
          />
          {children && (
            <ProgressBarMarker percentage={percentage} theme={theme}>
              {children}
            </ProgressBarMarker>
          )}
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
