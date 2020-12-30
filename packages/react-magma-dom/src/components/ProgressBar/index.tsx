import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { convertStyleValueToString } from '../../utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The color variant of the progress bar
   * @default ProgressBarColor.primary
   */
  color?: ProgressBarColor;
  /**
   * The height of the progress bar. Can be a string or number; if number is provided height is in px
   * @default 16
   */
  height?: number | string;
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
   * The percentage of which the bar is filled
   * @default 0
   */
  percentage?: number;
  testId?: string;
}

export enum ProgressBarColor {
  danger = 'danger',
  primary = 'primary', // default
  pop = 'pop',
  pop02 = 'pop02',
  success = 'success',
}

function buildProgressBarBackground(props) {
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
      return props.isInverse
        ? props.theme.colors.foundation03
        : props.theme.colors.primary;
  }
}

const Container = styled.div<{ isLoadingIndicator?: boolean }>`
  align-items: center;
  display: ${props => (props.isLoadingIndicator ? 'block' : 'flex')};
`;

const Track = styled.div<ProgressBarProps>`
  background: ${props =>
    props.isInverse ? 'rgba(0,0,0,0.25)' : props.theme.colors.neutral08};
  border: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral04};
  display: flex;
  height: ${props => props.height};
  padding: 1px;
  width: 100%;
`;

const Bar = styled.div<ProgressBarProps>`
  background: ${props => buildProgressBarBackground(props)};
  display: flex;
  transition: width 0.3s;
  width: ${props => props.percentage}%;

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

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const {
      color,
      height,
      isAnimated,
      isInverse,
      isLabelVisible,
      isLoadingIndicator,
      percentage,
      testId,
      ...other
    } = props;

    const percentageValue = percentage ? percentage : 0;

    const theme = React.useContext(ThemeContext);

    const heightString = convertStyleValueToString(
      height,
      theme.spaceScale.spacing05
    );

    return (
      <Container {...other} isLoadingIndicator={isLoadingIndicator}>
        {isLoadingIndicator && (
          <TopPercentage theme={theme}>{percentageValue}%</TopPercentage>
        )}
        <Track
          data-testid={testId}
          height={heightString}
          isInverse={isInverse}
          ref={ref}
          theme={theme}
        >
          <Bar
            aria-valuenow={percentageValue}
            aria-valuemin={0}
            aria-valuemax={100}
            color={color}
            isAnimated={isAnimated}
            isInverse={isInverse}
            percentage={percentageValue}
            role="progressbar"
            theme={theme}
          />
        </Track>
        {isLabelVisible && (
          <Percentage theme={theme}>{percentageValue}%</Percentage>
        )}
      </Container>
    );
  }
);
