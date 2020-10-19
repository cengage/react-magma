import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ProgressBarColor;
  height?: number;
  isAnimated?: boolean;
  isInverse?: boolean;
  isLabelVisible?: boolean;
  percentage?: number;
  testId?: string;
}

export enum ProgressBarColor {
  danger = 'danger',
  primary = 'primary', // default
  pop01 = 'pop01',
  pop02 = 'pop02',
  success = 'success',
}

function buildProgressBarBackground(props) {
  switch (props.color) {
    case 'danger':
      return props.theme.colors.danger;
    case 'pop01':
      return props.theme.colors.pop01;
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

const Container = styled.div`
  align-items: center;
  display: flex;
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
  height: ${props => props.height}px;
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
      background-size: 800px 104px;
      display: inline-block;
      position: relative;

      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeholderShimmer;
      animation-timing-function: linear;

      @keyframes placeholderShimmer {
        0% {
          background-position: -468px 0;
        }

        100% {
          background-position: 468px 0;
        }
      }
    `}
`;

const Percentage = styled.span`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin-left: 10px;
`;

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = React.forwardRef(
  (
    {
      color,
      height,
      isAnimated,
      isInverse,
      isLabelVisible,
      percentage,
      testId,
      ...other
    }: ProgressBarProps,
    ref: any
  ) => {
    const percentageValue = percentage ? percentage : 0;

    const theme = React.useContext(ThemeContext);

    return (
      <Container {...other}>
        <Track
          data-testid={testId}
          height={height ? height : 15}
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
